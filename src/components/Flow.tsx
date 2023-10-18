import { useCallback, useLayoutEffect, useRef } from "react";
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

import { imageHeight, imageWidth, nodeHeight, nodeWidth } from "@/constants";
import initialEdges from "@/edges";
import initialNodes from "@/nodes";
import useBoundStore from "@/stores";
import { FlowWrapper } from "@/styles/components/flow.styles";

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

function downloadImage(dataUrl) {
  const a = document.createElement("a");

  a.setAttribute("download", "reactflow.png");
  a.setAttribute("href", dataUrl);
  a.click();
}

function LayoutFlow() {
  const { project, getNodes } = useReactFlow();
  const flowWrapperRef = useRef(null);
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
    if (nodes.length === 0) return 1;
    const nodeIds = nodes.map((nd) => Number(nd.id));
    const nextId = Math.max(...nodeIds) + 1;
    return nextId;
  };

  const onAdd = useCallback(() => {
    const id = getNodeId(nodes);
    const newNode = {
      id: `${id}`,
      data: { label: `node ${id}` },
      position: project({
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
      }),
    };
    setNodes(nodes.concat(newNode));
  }, [setNodes, nodes, project]);

  const onDownload = () => {
    // we calculate a transform for the nodes so that all nodes are visible
    // we then overwrite the transform of the `.react-flow__viewport` element
    // with the style option of the html-to-image library
    const nodesBounds = getRectOfNodes(getNodes());
    const transform = getTransformForBounds(nodesBounds, imageWidth, imageHeight, 0.5, 2);

    toPng(document.querySelector(".react-flow__viewport"), {
      backgroundColor: "#1a365d",
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
    onLayout({ direction: "DOWN", useInitialNodes: true });
  }, []);

  return (
    <FlowWrapper ref={flowWrapperRef}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onNodesDelete={onNodesDelete}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Panel position="top-right">
          <button onClick={() => onLayout({ direction: "DOWN" })}>vertical layout</button>
          <button onClick={() => onLayout({ direction: "RIGHT" })}>horizontal layout</button>
          <button onClick={onAdd}>add node</button>
          <button onClick={onDownload}>Download Image</button>
        </Panel>
      </ReactFlow>
    </FlowWrapper>
  );
}

export default LayoutFlow;
