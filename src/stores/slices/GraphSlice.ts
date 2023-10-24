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

import { RootState } from "@/stores";
import * as I from "@/types";

export interface GraphSlice {
  nodes: I.Node[];
  edges: I.Edge[];
  setNodes: (nodes: I.Node[]) => void;
  setEdges: (edges: I.Edge[]) => void;
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
  nodes: [],
  edges: [],
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
