import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import { createGraphSlice, GraphSlice } from "@/stores/slices/GraphSlice";

export type RootState = GraphSlice;

const useBoundStore = create<RootState>()(
  persist(
    devtools((...a) => ({
      ...createGraphSlice(...a),
    })),
    {
      name: "graph-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useBoundStore;
