import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  EdgeChange,
  NodeChange,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
} from "reactflow";
import { StateCreator } from "zustand";

import GraphData from "@/data/basic_mnist.json";
import { RootState } from "@/stores";
import * as I from "@/types";
import parseEdges from "@/utils/parseEdges";
import parseNodes from "@/utils/parseNodes";

export interface GraphSlice {
  nodes: I.Node[];
  edges: I.Edge[];
  setNodes: (nodes: I.Node[]) => void;
  setEdges: (edges: I.Edge[]) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
}

const initialEdges = parseEdges(GraphData.nodes, GraphData.input[0], GraphData.output[0]);
const initialNodes = parseNodes(GraphData.nodes, GraphData.input[0], GraphData.output[0]);

export const createGraphSlice: StateCreator<
  RootState,
  [["zustand/persist", unknown], ["zustand/devtools", never]],
  [],
  GraphSlice
> = (set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  setNodes: (nodes: I.Node[]) => {
    set({
      nodes,
    });
  },
  setEdges: (edges: I.Edge[]) => {
    set({
      edges,
    });
  },
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
});
