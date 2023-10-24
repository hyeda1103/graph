import { useCallback, useRef, useState } from "react";
import ReactFlow, { MarkerType, Panel, useReactFlow } from "reactflow";
import { shallow } from "zustand/shallow";

import FileDropZone from "@/components/FileDropZone";
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
import useBoundStore from "@/stores";
import { FlowWrapper, SelectWrapper } from "@/styles/components/flow.styles";
import { NodeType } from "@/types";

import "reactflow/dist/style.css";

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

export default function ReadGraph() {
  const [nodes, setNodes, onNodesChange, edges, onEdgesChange, onConnect] = useBoundStore(
    (state) => [
      state.nodes,
      state.setNodes,
      state.onNodesChange,
      state.edges,
      state.onEdgesChange,
      state.onConnect,
    ],
    shallow,
  );
  const { project } = useReactFlow();

  const flowWrapperRef = useRef(null);

  const [nextNodeType, setNextNodeType] = useState<NodeType>(NodeType.QUANTIZE_LINEAR);

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

  return (
    <>
      <FileDropZone />
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
    </>
  );
}
