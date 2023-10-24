import { useCallback, useLayoutEffect, useState } from "react";
import ELK from "elkjs/lib/elk.bundled";
import Dropzone from "react-dropzone";
import { useReactFlow } from "reactflow";
import { shallow } from "zustand/shallow";

import { nodeHeight, nodeWidth } from "@/constants";
import useBoundStore from "@/stores";
import { Inner } from "@/styles/components/fileDropZone.styles";
import { JSONdata } from "@/types";
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
  const [jsonData, setJsonData] = useState<JSONdata>();
  const { fitView } = useReactFlow();
  const [nodes, setNodes, edges, setEdges] = useBoundStore(
    (state) => [state.nodes, state.setNodes, state.edges, state.setEdges],
    shallow,
  );

  const onDrop = ([file]) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const contents = e.target?.result;
      if (!contents) return;
      setJsonData(JSON.parse(contents as string));
    };
    reader.readAsText(file);
  };

  const onLayout = useCallback(
    ({ direction, useInitialNodes = false }) => {
      const opts = { "elk.direction": direction, ...elkOptions };

      const initialEdges = jsonData
        ? parseEdges(jsonData.nodes, jsonData.input[0], jsonData.output[0])
        : [];
      const initialNodes = jsonData
        ? parseNodes(jsonData.nodes, jsonData.input[0], jsonData.output[0])
        : [];

      const ns = useInitialNodes ? initialNodes : nodes;
      const es = useInitialNodes ? initialEdges : edges;

      getLayoutedElements(ns, es, opts).then(({ nodes: layoutedNodes, edges: layoutedEdges }) => {
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);

        window.requestAnimationFrame(() => fitView());
      });
    },
    [nodes, edges, jsonData],
  );

  // Calculate the initial layout on mount.
  useLayoutEffect(() => {
    console.log(jsonData);
    onLayout({ direction: "DOWN", useInitialNodes: true });
  }, [jsonData]);

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
