import { Dispatch, SetStateAction, useState } from "react";
import * as flatbuffers from "flatbuffers";
import { load } from "protobufjs";
import Dropzone, { DropEvent, FileRejection } from "react-dropzone";

import { Dashed, Inner } from "@/styles/components/fileDropZone.styles";
import { AcceptedFileExt } from "@/types";
import parseEdges from "@/utils/parseEdges";
import parseNodes from "@/utils/parseNodes";
import { BuiltinOperator, Model } from "@/utils/tflite/tflite";

interface Props {
  setModelType: Dispatch<SetStateAction<AcceptedFileExt | undefined>>;
  setModelData: any;
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

            const operatorArray: string[] = [];

            for (let i = 0; i < model?.operatorCodesLength(); i++) {
              const opCode = model.operatorCodes(i);
              operatorArray[i] = BuiltinOperator[opCode?.builtinCode().valueOf()];
            }

            const inputNodes = [];
            for (let i = 0; i < subGraph?.inputsLength(); i++) {
              const input = subGraph?.inputs(i);
              const inputTensor = subGraph?.tensors(input);

              inputNodes.push({
                id: `${inputTensor?.name()}_${input}`,
                name: `${inputTensor?.name()}_${input}`,
                type: "input",
                data: {
                  label: `${inputTensor?.name()}_${input}`,
                  index: input,
                },
                position: {
                  x: 0,
                  y: 0,
                },
              });
            }

            const outputTensorMap = new Map<number, number[]>();
            const outputNodes = [];
            for (let i = 0; i < subGraph?.outputsLength(); i++) {
              const output = subGraph?.outputs(i);
              const outputTensor = subGraph?.tensors(output);

              outputNodes.push({
                id: `${outputTensor?.name()}_${output}`,
                name: `${outputTensor?.name()}_${output}`,
                type: "output",
                data: {
                  label: `${outputTensor?.name()}_${output}`,
                  index: output,
                },
                position: {
                  x: 0,
                  y: 0,
                },
              });
              if (outputTensorMap.has(output)) {
                outputTensorMap.set(output, outputTensorMap.get(output).concat(i));
              } else {
                outputTensorMap.set(output, [i]);
              }
            }

            const middleNodes = [];
            for (let i = 0; i < subGraph?.operatorsLength(); i++) {
              const operator = subGraph?.operators(i);
              middleNodes.push({
                id:
                  operator?.opcodeIndex() !== undefined
                    ? `${operatorArray[operator?.opcodeIndex()]}_${i}`
                    : "",
                name:
                  operator?.opcodeIndex() !== undefined
                    ? `${operatorArray[operator?.opcodeIndex()]}_${i}`
                    : "",
                type: operatorArray[operator?.opcodeIndex()],
                data: {
                  label:
                    operator?.opcodeIndex() !== undefined
                      ? `${operatorArray[operator?.opcodeIndex()]}_${i}`
                      : "",
                  index: i,
                },
                position: {
                  x: 0,
                  y: 0,
                },
              });

              for (let j = 0; j < operator?.inputsLength(); j++) {
                const input = operator?.inputs(j);
                if (tensorOperatorInput.has(input)) {
                  tensorOperatorInput.set(input, tensorOperatorInput.get(input)?.concat([i]));
                } else {
                  tensorOperatorInput.set(input, [i]);
                }
              }
            }

            const middleAndOutputEdges = [];
            for (let i = 0; i < subGraph?.operatorsLength(); i++) {
              const operator = subGraph?.operators(i);
              for (let j = 0; j < operator?.outputsLength(); j++) {
                const output = operator?.outputs(j);
                if (tensorOperatorInput.has(output)) {
                  const tensorAsInputList = tensorOperatorInput.get(output);
                  for (let k = 0; k < tensorAsInputList?.length; k++) {
                    middleAndOutputEdges.push({
                      id: `reactflow__edge-${i}-${tensorAsInputList[k]}`,
                      source: i,
                      target: tensorAsInputList[k],
                    });
                  }
                }

                if (outputTensorMap.has(output)) {
                  const outputInputList = outputTensorMap.get(output);
                  for (let k = 0; k < outputInputList?.length; k++) {
                    middleAndOutputEdges.push({
                      id: `reactflow__edge-${i}-${outputNodes[outputInputList[k]].data.index}`,
                      source: i,
                      target: outputNodes[outputInputList[k]].data.index,
                    });
                  }
                }
              }
            }

            // Create edges for inputs
            const inputEdges = [];
            for (let i = 0; i < subGraph?.inputsLength(); i++) {
              const input = subGraph?.inputs(i);
              if (tensorOperatorInput.has(input)) {
                const tensorAsInputList = tensorOperatorInput.get(input);
                for (let k = 0; k < tensorAsInputList?.length; k++) {
                  inputEdges.push({
                    id: `reactflow__edge-${inputNodes[i].data.index}-${tensorAsInputList[k]}`,
                    source: inputNodes[i].data.index,
                    target: tensorAsInputList[k],
                  });
                }
              }
            }

            const parsedInputEdges = inputEdges.map((inputEdge) => {
              const sourceNodeId = inputNodes.find(
                (node) => Number(node.data.index) === inputEdge.source,
              )?.id;
              const targetNodeId = middleNodes.find(
                (node) => Number(node.data.index) === inputEdge.target,
              )?.id;
              return {
                id: `reactflow__edge-${sourceNodeId}-${targetNodeId}`,
                source: sourceNodeId,
                target: targetNodeId,
              };
            });

            const parsedMiddleAndOutputEdges = middleAndOutputEdges.map((edge) => {
              const sourceNodeId = middleNodes.find(
                (node) => Number(node.data.index) === edge.source,
              )?.id;
              const targetNodeId = [...middleNodes, ...outputNodes].find(
                (node) => Number(node.data.index) === edge.target,
              )?.id;

              return {
                id: `reactflow__edge-${sourceNodeId}-${targetNodeId}`,
                source: sourceNodeId,
                target: targetNodeId,
              };
            });

            const parsedNodes = [...inputNodes, ...middleNodes, ...outputNodes];
            const parsedEdges = [...parsedInputEdges, ...parsedMiddleAndOutputEdges];

            setModelType(AcceptedFileExt.TFLITE);
            setModelData({
              graph: {
                node: parsedNodes,
                edge: parsedEdges,
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
