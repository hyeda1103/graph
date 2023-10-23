import styled from "@emotion/styled";

import * as I from "@/types";

export const Box = styled("div")`
  display: flex;
  flex-direction: column;
  max-width: 150px;
  font-size: 12px;
  text-align: center;
  border-width: 1px;
  border-radius: 8px;
  border-style: solid;
  border-color: #000;
  background-color: #fff;
  overflow: hidden;
`;

export const Name = styled("div", {
  shouldForwardProp: (props) => props !== "nodeType",
})<{
  nodeType: I.NodeType;
}>`
  width: 100%;
  padding: 6px 15px;
  font-size: 11px;
  text-align: left;
  background-color: ${({ nodeType }) => {
    switch (nodeType) {
      case I.NodeType.INPUT:
      case I.NodeType.OUTPUT:
        return "#eee";
      case I.NodeType.CONV:
        return "rgb(51, 85, 136)";
      case I.NodeType.RELU:
        return "rgb(112, 41, 33)";
      case I.NodeType.CONCAT:
        return "rgb(89, 66, 59)";
      case I.NodeType.MAX_POOL:
        return "rgb(51, 85, 51)";
      case I.NodeType.GEMM:
        return "rgb(51, 85, 136)";
      case I.NodeType.RESHAPE:
        return "rgb(108, 79, 71)";
      default:
        return "#000";
    }
  }};
  color: ${({ nodeType }) => {
    switch (nodeType) {
      case I.NodeType.INPUT:
      case I.NodeType.OUTPUT:
        return "#000";
      default:
        return "#fff";
    }
  }};
`;

export const Body = styled("div")`
  width: 100%;
  padding: 6px;
  font-size: 10px;
  color: #000;
`;
