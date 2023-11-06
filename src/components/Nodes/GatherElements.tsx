import { memo } from "react";
import { Handle, Position } from "reactflow";

import { Body, Box, Name } from "@/styles/components/customNode.styles";
import * as I from "@/types";

interface Props {
  data: {
    label: string;
  };
  isConnectable: boolean;
}

function GatherElementsNode({ data, isConnectable }: Props) {
  return (
    <Box>
      <Name nodeType={I.NodeType.QUANTIZE_LINEAR}>{I.NodeType.QUANTIZE_LINEAR}</Name>
      <Handle
        type="target"
        position={Position.Top}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <Body>{data.label}</Body>
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </Box>
  );
}

export default memo(GatherElementsNode);
