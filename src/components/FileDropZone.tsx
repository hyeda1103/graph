import { Dispatch, SetStateAction, useState } from "react";
import { load } from "protobufjs";
import Dropzone from "react-dropzone";

import { Dashed, Inner } from "@/styles/components/fileDropZone.styles";
import { ModelProto } from "@/types";

interface Props {
  setModelData: Dispatch<SetStateAction<ModelProto | undefined>>;
}

function FileDropZone({ setModelData }: Props) {
  const [fileName, setFileName] = useState("");
  const onDrop = ([file]) => {
    const reader = new FileReader();
    setFileName(file.name);
    reader.onload = (e) => {
      // Cast the file body to uint8 array
      if (e.target === undefined) return;

      const uint8Buffer = new Uint8Array(e.target.result);

      // Load the onnx protobuf3 schema file
      load("./_next/static/chunks/onnx.proto3")
        .then((res) => {
          // Lookup the ModelProto class from the schema
          const model = res.lookupType("onnx.ModelProto");
          // Decode the uint8 array from the file to become an object
          const decodedModel = model.decode(uint8Buffer);
          setModelData(decodedModel as ModelProto);
        })
        .catch((err) => {
          console.log("ERROR:", err);
        });
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <Dropzone onDrop={onDrop}>
      {({ getRootProps, getInputProps }) => (
        <Inner {...getRootProps()}>
          <Dashed>
            <input {...getInputProps()} />
            {`Uploaded: \n${fileName}` || "Click to upload a file"}
          </Dashed>
        </Inner>
      )}
    </Dropzone>
  );
}

export default FileDropZone;
