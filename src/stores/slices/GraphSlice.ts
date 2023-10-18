import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
} from "reactflow";
import { StateCreator } from "zustand";

import initialEdges from "@/edges";
import initialNodes from "@/nodes";
import { RootState } from "@/stores";

export interface GraphSlice {
  nodes: Node[];
  edges: Edge[];
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
}

export const createGraphSlice: StateCreator<
  RootState,
  [["zustand/persist", unknown], ["zustand/devtools", never]],
  [],
  GraphSlice
> = (set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  setNodes: (nodes: Node[]) => {
    set({
      nodes,
    });
  },
  setEdges: (edges: Edge[]) => {
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
    console.log(connection);
    set({
      edges: addEdge(connection, get().edges),
    });
  },
});
