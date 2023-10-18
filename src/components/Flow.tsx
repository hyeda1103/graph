import { useCallback, useLayoutEffect, useRef } from "react";
import ELK from "elkjs/lib/elk.bundled.js";
import _ from "lodash";
import ReactFlow, { addEdge, Panel, useEdgesState, useNodesState, useReactFlow } from "reactflow";

import initialEdges from "@/edges";
import initialNodes from "@/nodes";
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
      width: 150,
      height: 50,
    })),
    edges: edges,
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
  const { project } = useReactFlow();
  const flowWrapperRef = useRef(null);
  const connectingNodeId = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
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

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
  const onConnectEnd = useCallback(
    (e) => {
      const targetIsPane = e.target.classList.contains("react-flow__pane");

      if (!targetIsPane) return;
      if (_.isNil(flowWrapperRef.current)) return;

      const { top, left } = flowWrapperRef.current.getBoundingClientRect();
      const nodeIds = nodes.map((nd) => Number(nd.id));
      const nextId = Math.max(...nodeIds) + 1;
      const newNode = {
        id: nextId.toString(),
        data: {
          label: `node ${nextId}`,
        },
        position: project({ x: e.clientX - left - 75, y: e.clientY - top }),
      };

      setNodes((nds) => nds.concat(newNode));
      setEdges((eds) =>
        eds.concat({
          id: `e${connectingNodeId.current}${nextId}`,
          source: `${connectingNodeId.current}`,
          target: `${nextId}`,
          type: "smoothstep",
        }),
      );
    },
    [project, nodes],
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
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Panel position="top-right">
          <button onClick={() => onLayout({ direction: "DOWN" })}>vertical layout</button>
          <button onClick={() => onLayout({ direction: "RIGHT" })}>horizontal layout</button>
        </Panel>
      </ReactFlow>
    </FlowWrapper>
  );
}

export default LayoutFlow;
