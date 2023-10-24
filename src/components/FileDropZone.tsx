"use client";

import { useCallback, useLayoutEffect, useState } from "react";
import ELK from "elkjs/lib/elk.bundled";
import { load } from "protobufjs";
import Dropzone from "react-dropzone";
import { useReactFlow } from "reactflow";
import { shallow } from "zustand/shallow";

import { nodeHeight, nodeWidth } from "@/constants";
import useBoundStore from "@/stores";
import { Inner } from "@/styles/components/fileDropZone.styles";
import { ModelProto } from "@/types";
import parseEdges from "@/utils/parseEdges";
import parseNodes from "@/utils/parseNodes";

const elk = new ELK();

const elkOptions = {
  "elk.algorithm": "layered",
  "elk.layered.spacing.nodeNodeBetweenLayers": "80",
  "elk.spacing.nodeNode": "80",
};

const getLayoutedElements = (nodes, edges, options = {}) => {
  const isHorizontal = options?.["elk.direction"] === "RIGHT";
  const graph = {
    id: "root",
    layoutOptions: options,
    children: nodes.map((node) => ({
      ...node,
      // Adjust the target and source handle positions based on the layout
      // direction.
      targetPosition: isHorizontal ? "left" : "top",
      sourcePosition: isHorizontal ? "right" : "bottom",

      // Hardcode a width and height for elk to use when layouting.
      width: nodeWidth,
      height: nodeHeight,
    })),
    edges,
  };

  return elk
    .layout(graph)
    .then((layoutedGraph) => ({
      nodes: layoutedGraph.children.map((node) => ({
        ...node,
        // React Flow expects a position property on the node instead of `x`
        // and `y` fields.
        position: { x: node.x, y: node.y },
      })),

      edges: layoutedGraph.edges,
    }))
    .catch(console.error);
};

function FileDropZone() {
  const [modelData, setModelData] = useState<ModelProto>();
  const { fitView } = useReactFlow();
  const [nodes, setNodes, edges, setEdges] = useBoundStore(
    (state) => [state.nodes, state.setNodes, state.edges, state.setEdges],
    shallow,
  );

  const onDrop = ([file]) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      // Cast the file body to uint8 array
      const uint8Buffer = new Uint8Array(e.target?.result);

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

  const onLayout = useCallback(
    ({ direction, useInitialNodes = false }) => {
      const opts = { "elk.direction": direction, ...elkOptions };

      const initialEdges = modelData ? parseEdges(modelData.graph) : [];
      const initialNodes = modelData ? parseNodes(modelData.graph) : [];

      const ns = useInitialNodes ? initialNodes : nodes;
      const es = useInitialNodes ? initialEdges : edges;

      getLayoutedElements(ns, es, opts).then(({ nodes: layoutedNodes, edges: layoutedEdges }) => {
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);

        window.requestAnimationFrame(() => fitView());
      });
    },
    [nodes, edges, modelData],
  );

  // Calculate the initial layout on mount.
  useLayoutEffect(() => {
    onLayout({ direction: "DOWN", useInitialNodes: true });
  }, [modelData]);

  return (
    <Dropzone onDrop={onDrop}>
      {({ getRootProps, getInputProps }) => (
        <Inner {...getRootProps()}>
          <input {...getInputProps()} />
          Click me to upload a file!
        </Inner>
      )}
    </Dropzone>
  );
}

export default FileDropZone;
