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

function InputNode({ data, isConnectable }: Props) {
  return (
    <Box>
      <Name nodeType={I.NodeType.INPUT}>{data.label}</Name>
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </Box>
  );
}

export default memo(InputNode);
