import { Dispatch, SetStateAction, useState } from "react";
import * as flatbuffers from "flatbuffers";
import _ from "lodash";
import { load, Message } from "protobufjs";
import Dropzone, { DropEvent, FileRejection } from "react-dropzone";

import { Dashed, Inner } from "@/styles/components/fileDropZone.styles";
import { AcceptedFileExt, ModelProto, NodeProto, ValueInfoProto } from "@/types";
import parseEdges from "@/utils/parseEdges";
import parseNodes from "@/utils/parseNodes";
import { BuiltinOperator, Model } from "@/utils/tflite/tflite";

interface Props {
  setModelType: Dispatch<SetStateAction<AcceptedFileExt | undefined>>;
  setModelData: Dispatch<SetStateAction<ModelProto | Message<object> | undefined>>;
}

function FileDropZone({ setModelType, setModelData }: Props) {
  const [fileName, setFileName] = useState("");
  const onDrop:
    | (<T extends File>(
        acceptedFiles: T[],
        fileRejections: FileRejection[],
        event: DropEvent,
      ) => void)
    | undefined = (accpetedFiles) => {
    if (accpetedFiles.length === 0) return;

    const file = accpetedFiles[0];
    const reader = new FileReader();

    const fileName = file.name;
    const fileExtension = `.${file.name.split(".").pop()}`;

    setFileName(fileName);

    switch (fileExtension) {
      case AcceptedFileExt.ONNX:
        {
          reader.onload = (e) => {
            // Cast the file body to uint8 array
            if (e.target === undefined) return;

            const uint8Buffer = new Uint8Array(e.target?.result as ArrayBufferLike);

            // Load the onnx protobuf3 schema file
            load("./_next/static/chunks/onnx.proto3")
              .then((res) => {
                // Lookup the ModelProto class from the schema
                const model = res.lookupType("onnx.ModelProto");
                // Decode the uint8 array from the file to become an object
                const decodedModel = model.decode(uint8Buffer);

                const parsedNodes = parseNodes(decodedModel.graph);
                const parsedEdges = parseEdges(decodedModel.graph);
                setModelType(AcceptedFileExt.ONNX);
                setModelData({
                  graph: {
                    node: parsedNodes,
                    edge: parsedEdges,
                  },
                });
              })
              .catch((err) => {
                console.error("ERROR:", err);
              });
          };
          reader.readAsArrayBuffer(file);
        }
        break;
      case AcceptedFileExt.TFLITE:
        {
          reader.onload = (e) => {
            if (e.target === undefined) return;

            const uint8Buffer = new Uint8Array(e.target?.result as ArrayBufferLike);

            const tensorOperatorInput = new Map<number, number[]>();

            // Flatbuffers decoding implementation
            const buf = new flatbuffers.ByteBuffer(uint8Buffer);
            const model = Model.getRootAsModel(buf);
            const subGraph = model.subgraphs(0);
            const operatorArray: string[] = Array.from(
              {
                length: model?.operatorCodesLength() || 0,
              },
              (v, i) => {
                const opCode = model.operatorCodes(i);
                return BuiltinOperator[opCode?.builtinCode().valueOf() as BuiltinOperator];
              },
            );

            const inputNodes = Array.prototype.slice
              .call(subGraph?.inputsArray())
              ?.reduce((acc, cur) => {
                const inputTensor = subGraph?.tensors(cur);
                if (_.isNil(inputTensor)) return;

                acc = acc.concat({
                  id: `${inputTensor?.name()}`,
                  name: `${inputTensor?.name()}`,
                  type: "input",
                  data: {
                    label: `${inputTensor?.name()}`,
                    index: `${inputTensor?.type()}`,
                  },
                  position: {
                    x: 0,
                    y: 0,
                  },
                });
                return acc;
              }, [] as ValueInfoProto[]);

            const outputTensorMap = new Map<number, number[]>();

            const outputNodes = Array.prototype.slice
              .call(subGraph?.outputsArray())
              ?.reduce((acc, cur, i) => {
                const outputTensor = subGraph?.tensors(cur);
                if (_.isNil(outputTensor)) return;

                if (outputTensorMap.has(cur)) {
                  outputTensorMap.set(cur, (outputTensorMap.get(cur) as number[]).concat(i));
                } else {
                  outputTensorMap.set(cur, [i]);
                }

                acc = acc.concat({
                  id: `${outputTensor?.name()}`,
                  name: `${outputTensor?.name()}`,
                  type: "output",
                  data: {
                    label: `${outputTensor?.name()}`,
                    index: `${outputTensor?.type()}`,
                  },
                  position: {
                    x: 0,
                    y: 0,
                  },
                });
                return acc;
              }, [] as ValueInfoProto[]);

            Array.from(
              {
                length: subGraph?.operatorsLength() || 0,
              },
              (v, i) => {
                const operator = subGraph?.operators(i);

                if (_.isNil(operator)) return;

                Array.prototype.slice.call(operator?.inputsArray())?.forEach((input) => {
                  if (tensorOperatorInput.has(input)) {
                    tensorOperatorInput.set(
                      input,
                      (tensorOperatorInput.get(input) as number[]).concat([i]),
                    );
                  } else {
                    tensorOperatorInput.set(input, [i]);
                  }
                });
              },
            );

            const middleEdges = Array.from(
              {
                length: subGraph?.operatorsLength() || 0,
              },
              (v, i) => {
                const operator = subGraph?.operators(i);

                return Array.prototype.slice
                  .call(operator?.outputsArray())
                  ?.reduce((acc, output) => {
                    if (tensorOperatorInput.has(output)) {
                      const tensorAsInputList = tensorOperatorInput.get(output);
                      const edge = tensorAsInputList?.map((input) => ({
                        id: `reactflow__edge-${i}-${input}`,
                        source: i,
                        target: input,
                      }));
                      acc = acc.concat(edge);
                    }
                    if (outputTensorMap.has(output)) {
                      const outputInputList = outputTensorMap.get(output);
                      const edge = outputInputList?.map((output) => ({
                        id: `reactflow__edge-${i}-${output}`,
                        source: i,
                        target: output,
                      }));
                      acc = acc.concat(edge);
                    }
                    return acc;
                  }, []);
              },
            )?.flat();

            const inputEdges = Array.prototype.slice
              .call(subGraph?.inputsArray())
              ?.reduce((acc, input, i) => {
                if (tensorOperatorInput.has(input)) {
                  const tensorAsInputList = tensorOperatorInput.get(input);

                  if (tensorAsInputList === undefined) return;

                  const sourceInputNode = inputNodes.find((node) => Number(node.data.index) === i);
                  const edge = tensorAsInputList.map((input) => ({
                    id: `reactflow__edge-${sourceInputNode.id}-${input}`,
                    source: sourceInputNode,
                    target: input,
                  }));
                  acc = acc.concat(edge);
                }
                return acc;
              }, [])
              .flat();

            const outputEdges = outputNodes.map((node) => {
              const edge = middleEdges?.find((edge) => Number(node.data.index) === edge.target);
              return {
                ...edge,
                target: node,
              };
            });

            const middleNodes: NodeProto[] = Array.from(
              { length: subGraph?.operatorsLength() || 0 },
              (v, i) => {
                const operator = subGraph?.operators(i);

                const inputEdges = middleEdges.filter((edge) => edge?.target === i);
                const outputEdges = middleEdges.filter((edge) => edge?.source === i);
                return {
                  attribute: [],
                  input: inputEdges,
                  id: i,
                  name:
                    operator?.opcodeIndex() !== undefined
                      ? `${operatorArray[operator?.opcodeIndex()]}_${i}`
                      : "",
                  opType:
                    operator?.opcodeIndex() !== undefined
                      ? operatorArray[operator?.opcodeIndex()]
                      : "",
                  output: outputEdges,
                  data: {
                    label:
                      operator?.opcodeIndex() !== undefined
                        ? `${operatorArray[operator?.opcodeIndex()]}_${i}`
                        : "",
                  },
                };
              },
            );

            const parsedNodes = middleNodes.map((node) => ({
              id: node.name,
              name: node.name,
              type: node.opType,
              data: {
                label: node.name,
                index: node.id,
              },
              position: {
                x: 0,
                y: 0,
              },
            }));

            const parsedInputEdges = inputEdges.map((edge) => {
              const targetNodeId = parsedNodes.find(
                (node) => Number(node.data.index) === edge.target,
              )?.id;
              return {
                id: `reactflow__edge-${edge.source.id}-${targetNodeId}`,
                source: edge.source.id,
                target: targetNodeId,
              };
            });

            const parsedOutputEdges = outputEdges.map((edge) => {
              const sourceNodeId = parsedNodes.find(
                (node) => Number(node.data.index) === edge.source,
              )?.id;
              return {
                id: `reactflow__edge-${sourceNodeId}-${edge.target.id}`,
                source: sourceNodeId,
                target: edge.target.id,
              };
            });

            const parsedEdges = middleEdges.map((edge) => {
              const sourceNodeId = parsedNodes.find((node) => node.data.index === edge.source)?.id;
              const targetNodeId = parsedNodes.find((node) => node.data.index === edge.target)?.id;
              return {
                id: `reactflow__edge-${sourceNodeId}-${targetNodeId}`,
                source: sourceNodeId,
                target: targetNodeId,
              };
            });

            const uniqueEdges = [
              ...new Set(
                [...parsedInputEdges, ...parsedEdges, ...parsedOutputEdges].map((item) => item),
              ),
            ];

            setModelType(AcceptedFileExt.TFLITE);
            setModelData({
              graph: {
                node: [...inputNodes, ...parsedNodes, ...outputNodes],
                edge: uniqueEdges,
              },
            });
          };
          reader.readAsArrayBuffer(file);
        }
        break;
      default:
        break;
    }
  };

  return (
    <Dropzone
      accept={{
        "application/wasm": [AcceptedFileExt.ONNX, AcceptedFileExt.TFLITE],
      }}
      onDrop={onDrop}
    >
      {({ getRootProps, getInputProps }) => (
        <Inner {...getRootProps()}>
          <Dashed>
            <input {...getInputProps()} />
            {fileName ? `Uploaded: \n${fileName}` : "Click to upload a file"}
          </Dashed>
        </Inner>
      )}
    </Dropzone>
  );
}

export default FileDropZone;
