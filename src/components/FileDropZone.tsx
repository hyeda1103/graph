import { Dispatch, SetStateAction, useState } from "react";
import * as flatbuffers from "flatbuffers";
import { node } from "prop-types";
import { load, Message } from "protobufjs";
import Dropzone, { DropEvent, FileRejection } from "react-dropzone";

import { Dashed, Inner } from "@/styles/components/fileDropZone.styles";
import { AcceptedFileExt, ModelProto } from "@/types";
import { BuiltinOperator, Model } from "@/utils/tflite/tflite";

interface Props {
  setModelData: Dispatch<SetStateAction<ModelProto | Message<object> | undefined>>;
}

function FileDropZone({ setModelData }: Props) {
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
                setModelData(decodedModel);
              })
              .catch((err) => {
                console.log("ERROR:", err);
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
              operatorArray[i] = opCode ? BuiltinOperator[opCode.builtinCode().valueOf()] : "";
            }

            if (subGraph) {
              for (let i = 0; i < subGraph.inputsLength(); i++) {
                const input = subGraph.inputs(i);
                if (input) {
                  const inputTensor = subGraph.tensors(input);
                  console.log(
                    "Input Node of index",
                    i,
                    "with title: ",
                    `${inputTensor?.name()} ${input}`,
                  );
                }
              }

              const outputTensorMap = new Map<number, number[]>();
              for (let i = 0; i < subGraph.outputsLength(); i++) {
                const output = subGraph.outputs(i);
                if (output) {
                  const outputTensor = subGraph.tensors(output);
                  console.log(
                    "Output Node of index",
                    i,
                    "with title: ",
                    `${outputTensor?.name()} ${output}`,
                  );

                  if (outputTensorMap.has(output)) {
                    const nodeOutput = outputTensorMap.get(output);
                    if (nodeOutput) {
                      outputTensorMap.set(output, nodeOutput.concat(i));
                    }
                  } else {
                    outputTensorMap.set(output, [i]);
                  }
                }
              }

              for (let i = 0; i < subGraph?.operatorsLength(); i++) {
                const operator = subGraph?.operators(i);
                if (operator) {
                  console.log(
                    "Node of index ",
                    i,
                    " with title ",
                    operatorArray[operator?.opcodeIndex()],
                  );
                  for (let j = 0; j < operator.inputsLength(); j++) {
                    const input = operator.inputs(j);
                    if (input) {
                      if (tensorOperatorInput.has(input)) {
                        const nodeInput = tensorOperatorInput.get(input);
                        if (nodeInput) {
                          tensorOperatorInput.set(input, nodeInput.concat([i]));
                        }
                      } else {
                        tensorOperatorInput.set(input, [i]);
                      }
                    }
                  }
                }
              }

              for (let i = 0; i < subGraph?.operatorsLength(); i++) {
                const operator = subGraph?.operators(i);
                if (operator) {
                  for (let j = 0; j < operator?.outputsLength(); j++) {
                    const output = operator?.outputs(j);
                    if (output) {
                      if (tensorOperatorInput.has(output)) {
                        const tensorAsInputList = tensorOperatorInput.get(output);
                        if (tensorAsInputList) {
                          for (let k = 0; k < tensorAsInputList.length; k++) {
                            console.log("Edge from node index", i, "to", tensorAsInputList[k]);
                          }
                        }
                      }

                      if (outputTensorMap.has(output)) {
                        const outputInputList = outputTensorMap.get(output);
                        if (outputInputList) {
                          for (let k = 0; k < outputInputList.length; k++) {
                            console.log(
                              "Edge from node index",
                              i,
                              "to output index",
                              outputInputList[k],
                            );
                          }
                        }
                      }
                    }
                  }
                }
              }

              // Create edges for inputs
              for (let i = 0; i < subGraph.inputsLength(); i++) {
                const input = subGraph.inputs(i);
                if (input) {
                  if (tensorOperatorInput.has(input)) {
                    const tensorAsInputList = tensorOperatorInput.get(input);
                    if (tensorAsInputList) {
                      for (let k = 0; k < tensorAsInputList?.length; k++) {
                        console.log("Edge from input node index", i, "to", tensorAsInputList[k]);
                      }
                    }
                  }
                }
              }
            }
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
        "application/wasm": [".onnx", ".tflite"],
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
