import { useCallback, useLayoutEffect, useRef, useState } from "react";
import ELK from "elkjs/lib/elk.bundled.js";
import { toPng } from "html-to-image";
import ReactFlow, {
  getConnectedEdges,
  getIncomers,
  getOutgoers,
  getRectOfNodes,
  getTransformForBounds,
  Panel,
  useReactFlow,
} from "reactflow";
import { shallow } from "zustand/shallow";

import CustomNode from "@/components/CustomNode";
import { imageHeight, imageWidth, nodeHeight, nodeWidth } from "@/constants";
import initialEdges from "@/edges";
import initialNodes from "@/nodes";
import useBoundStore from "@/stores";
import { FlowWrapper, SelectWrapper } from "@/styles/components/flow.styles";
import { NodeType } from "@/types";
import downloadImage from "@/utils/downloadImage";

import "reactflow/dist/style.css";

const elk = new ELK();

// Elk has a *huge* amount of options to configure. To see everything you can
// tweak check out:
//
// - https://www.eclipse.org/elk/reference/algorithms.html
// - https://www.eclipse.org/elk/reference/options.html
const elkOptions = {
  "elk.algorithm": "layered",
  "elk.layered.spacing.nodeNodeBetweenLayers": "100",
  "elk.spacing.nodeNode": "80",
};

const defaultEdgeOptions = {
  style: { strokeWidth: 2, stroke: "#9ca8b3" },
  markerEnd: {
    type: "arrowclosed",
  },
};

const nodeTypes = {
  [NodeType.CONNECTOR]: CustomNode,
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

function LayoutFlow() {
  const { project, getNodes, getEdges } = useReactFlow();

  const flowWrapperRef = useRef(null);
  const connectingNodeId = useRef(null);

  const [nextNodeType, setNextNodeType] = useState<NodeType>(NodeType.CONNECTOR);
  const [selectedNode, setSelectedNode] = useState<Node>();
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
  const { fitView } = useReactFlow();

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

  const getNodeId = (nodes) => {
    if (nodes.length === 0) return `${nextNodeType} 1`;
    const nodeIds = nodes
      .filter((nd) => nd.type === nextNodeType)
      .map((nd) => Number(nd.id.split(" ")[1]));

    return `${nextNodeType} ${nodeIds.length ? Math.max(...nodeIds) + 1 : 1}`;
  };

  const onAdd = useCallback(() => {
    const id = getNodeId(nodes);
    const newNode = {
      id: `${id}`,
      type: nextNodeType,
      data: { label: `${id}`, type: nextNodeType },
      position: project({
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
      }),
    };
    setNodes(nodes.concat(newNode));
  }, [setNodes, nodes, project, nextNodeType]);

  const onConnectStart = useCallback((_, params) => {
    connectingNodeId.current = params.nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const { top, left } = flowWrapperRef.current.getBoundingClientRect();
        const id = getNodeId(nodes);
        const newNode = {
          id: `${id}`,
          type: "default",
          // we are removing the half of the node width (75) to center the new node
          position: project({ x: event.clientX - left - 75, y: event.clientY - top }),
          data: { label: `${id}` },
        };

        setNodes(nodes.concat(newNode));
        setEdges(
          edges.concat({
            id: `e${connectingNodeId.current}${id}`,
            source: connectingNodeId.current,
            target: `${id}`,
          }),
        );
      }
    },
    [project, nodes, edges],
  );

  const onDownload = () => {
    // we calculate a transform for the nodes so that all nodes are visible
    // we then overwrite the transform of the `.react-flow__viewport` element
    // with the style option of the html-to-image library
    const nodesBounds = getRectOfNodes(getNodes());
    const transform = getTransformForBounds(nodesBounds, imageWidth, imageHeight, 0.5, 2);

    toPng(document.querySelector(".react-flow__viewport"), {
      backgroundColor: "#ffffff",
      width: imageWidth,
      height: imageHeight,
      style: {
        width: imageWidth,
        height: imageHeight,
        transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
      },
    }).then(downloadImage);
  };

  const onNodesDelete = useCallback(
    (deleted) => {
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);

          const remainingEdges = acc.filter((edge) => !connectedEdges.includes(edge));

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({ id: `${source}->${target}`, source, target })),
          );

          return [...remainingEdges, ...createdEdges];
        }, edges),
      );
    },
    [nodes, edges],
  );
  // Calculate the initial layout on mount.
  useLayoutEffect(() => {
    setSelectedNode(undefined);
    onLayout({ direction: "DOWN", useInitialNodes: true });
  }, []);

  const onSelectionChange = useCallback(
    (params) => {
      const selectedNodes = params.nodes;

      if (selectedNodes.length !== 1) return;

      setSelectedNode(selectedNodes[0]);
    },
    [selectedNode?.id],
  );

  const handleInputChange = (e) => {
    if (!selectedNode) return;
    const nodeToUpdate = nodes.find((nd) => nd.id === selectedNode.id);

    if (!nodeToUpdate) return;
    const updatedNode = {
      ...nodeToUpdate,
      data: {
        ...nodeToUpdate.data,
        label: e.target.value,
      },
    };
    setSelectedNode(updatedNode);
    setNodes([...nodes, updatedNode]);
  };

  return (
    <FlowWrapper ref={flowWrapperRef}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        defaultEdgeOptions={defaultEdgeOptions}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        onNodesChange={onNodesChange}
        onNodesDelete={onNodesDelete}
        onSelectionChange={onSelectionChange}
        onEdgesChange={onEdgesChange}
        onDrag={(e) => console.log(e.target)}
        nodeTypes={nodeTypes}
        fitView
      >
        <Panel position="top-right">
          <div>
            <button onClick={() => onLayout({ direction: "DOWN" })}>vertical layout</button>
            <button onClick={() => onLayout({ direction: "RIGHT" })}>horizontal layout</button>
          </div>
          <div>
            <button onClick={onDownload}>Download Image</button>
          </div>
          <div>
            <div className="updatenode__controls">
              <label>label: </label>
              <input value={selectedNode?.data.label ?? ""} onChange={handleInputChange} />
            </div>
          </div>
        </Panel>
        <Panel position="top-left">
          <div>
            <button onClick={onAdd}>add node</button>
            <SelectWrapper>
              <label htmlFor="nodeType">Type</label>
              <select
                name="nodeType"
                id="nodeType"
                defaultValue={NodeType.CONNECTOR}
                onChange={(e) => {
                  setNextNodeType(e.target.value as NodeType);
                }}
              >
                <option value={NodeType.INPUT}>INPUT</option>
                <option value={NodeType.OUTPUT}>OUTPUT</option>
                <option value={NodeType.DEFAULT}>DEFAULT</option>
                <option value={NodeType.CONNECTOR}>CONNECTOR</option>
              </select>
            </SelectWrapper>
          </div>
        </Panel>
      </ReactFlow>
    </FlowWrapper>
  );
}

export default LayoutFlow;
