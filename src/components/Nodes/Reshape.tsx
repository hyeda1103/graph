import { memo } from "react";
import { Handle, Position } from "reactflow";

import { Box, Name } from "@/styles/components/customNode.styles";
import * as I from "@/types";

interface Props {
  data: {
    label: string;
  };
  isConnectable: boolean;
}

function ReshapeNode({ isConnectable }: Props) {
  return (
    <Box>
      <Name nodeType={I.NodeType.RESHAPE}>{I.NodeType.RESHAPE}</Name>
      <Handle
        type="target"
        position={Position.Top}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </Box>
  );
}

export default memo(ReshapeNode);
