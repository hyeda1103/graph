import { useCallback, useLayoutEffect, useRef, useState } from "react";
import ELK from "elkjs/lib/elk.bundled";
import ReactFlow, { MarkerType, Panel, useReactFlow } from "reactflow";
import shallow from "zustand/shallow";

import ConcatNode from "@/components/Nodes/Concat";
import ConvNode from "@/components/Nodes/Conv";
import DequantizeLinearNode from "@/components/Nodes/DequantizeLinear";
import GatherElementsNode from "@/components/Nodes/GatherElements";
import GemmNode from "@/components/Nodes/Gemm";
import InputNode from "@/components/Nodes/Input";
import MaxPoolNode from "@/components/Nodes/MaxPool";
import OutputNode from "@/components/Nodes/Output";
import QuantizeLinearNode from "@/components/Nodes/QuantizeLinear";
import ReluNode from "@/components/Nodes/Relu";
import ReshapeNode from "@/components/Nodes/Reshape";
import ShapeNode from "@/components/Nodes/Shape";
import { nodeHeight, nodeWidth } from "@/constants";
import GraphData from "@/data/basic_mnist.json";
import useBoundStore from "@/stores";
import { FlowWrapper, SelectWrapper } from "@/styles/components/flow.styles";
import { NodeType } from "@/types";
import parseEdges from "@/utils/parseEdges";
import parseNodes from "@/utils/parseNodes";

import "reactflow/dist/style.css";

const elk = new ELK();

const elkOptions = {
  "elk.algorithm": "layered",
  "elk.layered.spacing.nodeNodeBetweenLayers": "80",
  "elk.spacing.nodeNode": "80",
};

const defaultEdgeOptions = {
  style: { strokeWidth: 1, stroke: "#000" },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: "#000",
  },
};

const nodeTypes = {
  [NodeType.INPUT]: InputNode,
  [NodeType.OUTPUT]: OutputNode,
  [NodeType.QUANTIZE_LINEAR]: QuantizeLinearNode,
  [NodeType.DEQUANTIZE_LINEAR]: DequantizeLinearNode,
  [NodeType.RESHAPE]: ReshapeNode,
  [NodeType.SHAPE]: ShapeNode,
  [NodeType.GEMM]: GemmNode,
  [NodeType.MAX_POOL]: MaxPoolNode,
  [NodeType.CONCAT]: ConcatNode,
  [NodeType.RELU]: ReluNode,
  [NodeType.CONV]: ConvNode,
  [NodeType.GATHER_ELEMENTS]: GatherElementsNode,
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

export default function ReadGraph() {
  const [nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange, onConnect] = useBoundStore(
    (state) => [
      state.nodes,
      state.setNodes,
      state.onNodesChange,
      state.edges,
      state.setEdges,
      state.onEdgesChange,
      state.onConnect,
    ],
    shallow,
  );
  const { fitView, project } = useReactFlow();

  const flowWrapperRef = useRef(null);

  const [nextNodeType, setNextNodeType] = useState<NodeType>(NodeType.QUANTIZE_LINEAR);

  const initialEdges = parseEdges(GraphData.nodes, GraphData.input[0], GraphData.output[0]);
  const initialNodes = parseNodes(GraphData.nodes, GraphData.input[0], GraphData.output[0]);

  const onLayout = useCallback(
    ({ direction, useInitialNodes = false }) => {
      const opts = { "elk.direction": direction, ...elkOptions };
      const ns = useInitialNodes ? initialNodes : nodes;
      const es = useInitialNodes ? initialEdges : edges;

      getLayoutedElements(ns, es, opts).then(({ nodes: layoutedNodes, edges: layoutedEdges }) => {
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);

        window.requestAnimationFrame(() => fitView());
      });
    },
    [nodes, edges],
  );

  const getId = (nodes) => {
    if (nodes.length === 0) {
      return `${nextNodeType}_0`;
    }
    const nodesOfType = nodes.filter((node) => node.type === nextNodeType);
    if (nodesOfType.length === 0) {
      return `${nextNodeType}_0`;
    } else {
      const nodeIdxOfType = nodesOfType.map((node) =>
        Number(node.data.label.split(`${node.type}_`)[1]),
      );
      const nextIdx = Math.max(...nodeIdxOfType) + 1;
      return `${nextNodeType}_${nextIdx}`;
    }
  };

  const onAdd = useCallback(() => {
    const id = getId(nodes);
    const newNode = {
      id,
      name: id,
      type: nextNodeType,
      data: {
        label: id,
      },
      position: project({
        x: 200,
        y: 200,
      }),
    };
    setNodes(nodes.concat(newNode));
  }, [setNodes, nodes, project, nextNodeType]);

  // Calculate the initial layout on mount.
  useLayoutEffect(() => {
    onLayout({ direction: "DOWN", useInitialNodes: true });
  }, []);

  return (
    <FlowWrapper ref={flowWrapperRef}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Panel position="top-right">
          <div>
            <button onClick={onAdd}>add node</button>
            <SelectWrapper>
              <label htmlFor="nodeType">Node Type</label>
              <select
                name="nodeType"
                id="nodeType"
                defaultValue={NodeType.CONNECTOR}
                onChange={(e) => {
                  setNextNodeType(e.target.value as NodeType);
                }}
              >
                <option value={NodeType.INPUT}>{NodeType.INPUT}</option>
                <option value={NodeType.OUTPUT}>{NodeType.OUTPUT}</option>
                <option value={NodeType.QUANTIZE_LINEAR}>{NodeType.QUANTIZE_LINEAR}</option>
                <option value={NodeType.DEQUANTIZE_LINEAR}>{NodeType.DEQUANTIZE_LINEAR}</option>
                <option value={NodeType.CONV}>{NodeType.CONV}</option>
                <option value={NodeType.RELU}>{NodeType.RELU}</option>
                <option value={NodeType.MAX_POOL}>{NodeType.MAX_POOL}</option>
                <option value={NodeType.SHAPE}>{NodeType.SHAPE}</option>
                <option value={NodeType.GATHER_ELEMENTS}>{NodeType.GATHER_ELEMENTS}</option>
                <option value={NodeType.RESHAPE}>{NodeType.RESHAPE}</option>
                <option value={NodeType.GEMM}>{NodeType.GEMM}</option>
                <option value={NodeType.CONCAT}>{NodeType.CONCAT}</option>
              </select>
            </SelectWrapper>
          </div>
        </Panel>
      </ReactFlow>
    </FlowWrapper>
  );
}
