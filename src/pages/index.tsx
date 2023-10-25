import { useCallback, useLayoutEffect, useRef, useState } from "react";
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
import {
  BasicButton,
  ButtonWrapper,
  FlowWrapper,
  IconBox,
  Inner,
  LayoutOptionWrapper,
  RestoreIcon,
  SaveIcon,
  SelectWrapper,
  Title,
} from "@/styles/components/flow.styles";
import { Layout, ModelProto, NodeType } from "@/types";
import getLayoutedElements from "@/utils/getELKlayoutedElements";
import parseEdges from "@/utils/parseEdges";
import parseNodes from "@/utils/parseNodes";

import "reactflow/dist/style.css";

const elkOptions = {
  "elk.algorithm": "layered",
  "elk.layered.spacing.nodeNodeBetweenLayers": "100",
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

export default function ReadGraph() {
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance>(null);
  const [modelData, setModelData] = useState<ModelProto>();

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
  const { project, fitView, setViewport } = useReactFlow();

  const flowWrapperRef = useRef(null);

  const [nextNodeType, setNextNodeType] = useState<NodeType>(NodeType.QUANTIZE_LINEAR);

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem("flowKey", JSON.stringify(flow));
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem("flowKey"));

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);

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
    <>
      <FlowWrapper ref={flowWrapperRef}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setRfInstance}
          fitView
        >
          <Panel position="top-right">
            <Inner>
              <LayoutOptionWrapper>
                <Title>Save and Restore</Title>
                <ButtonWrapper>
                  <IconBox>
                    <SaveIcon onClick={onSave} />
                  </IconBox>
                  <IconBox>
                    <RestoreIcon onClick={onRestore} />
                  </IconBox>
                </ButtonWrapper>
              </LayoutOptionWrapper>
              <FileDropZone setModelData={setModelData} />
              <LayoutOptionWrapper>
                <Title>Graph Layout</Title>
                <BasicButton type="button" onClick={() => onLayout({ direction: "DOWN" })}>
                  {Layout.VERTICAL}
                </BasicButton>
                <BasicButton type="button" onClick={() => onLayout({ direction: "RIGHT" })}>
                  {Layout.HORIZONTAL}
                </BasicButton>
              </LayoutOptionWrapper>
              <SelectWrapper>
                <label htmlFor="nodeType">
                  <Title>Node Type</Title>
                </label>
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
                <BasicButton onClick={onAdd}>Add node</BasicButton>
              </SelectWrapper>
            </Inner>
          </Panel>
        </ReactFlow>
      </FlowWrapper>
    </>
  );
}
