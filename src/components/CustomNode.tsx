import { memo } from "react";
import { Handle, Position } from "reactflow";

import { Box } from "@/styles/components/customNode.styles";

export default memo(({ data, isConnectable }) => {
  return (
    <Box>
      <Handle
        type="target"
        position={Position.Top}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <div>{data.label}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={{ left: 50 }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={{ left: 100 }}
        isConnectable={isConnectable}
      />
    </Box>
  );
});
