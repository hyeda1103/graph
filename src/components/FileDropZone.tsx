import { Dispatch, SetStateAction, useState } from "react";
import { load, Message } from "protobufjs";
import Dropzone, { DropEvent, FileRejection } from "react-dropzone";

import { Dashed, Inner } from "@/styles/components/fileDropZone.styles";
import { AcceptedFileExt, ModelProto } from "@/types";

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
      case AcceptedFileExt.TFLITE: {
        return;
      }
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
