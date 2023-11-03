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

import { RootState } from "@/stores";

export interface GraphSliceState {
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
  GraphSliceState
> = (set, get) => ({
  nodes: [],
  edges: [],
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
    set({
      edges: addEdge(connection, get().edges),
    });
  },
});
