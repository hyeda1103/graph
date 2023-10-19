import styled from "@emotion/styled";

export const FlowWrapper = styled("div")`
  width: 100vw;
  height: 100vh;

  .react-flow .react-flow__handle {
    border-radius: 50%;
  }

  .react-flow .react-flow__handle-top {
    width: 6px;
    height: 6px;
    top: -3px;
    background-color: #fff;
    border: 1px solid #000;
  }

  .react-flow .react-flow__handle-bottom {
    width: 8px;
    height: 8px;
    bottom: -4px;
    background-color: #000;
    border: 1px solid #fff;
  }
`;

export const SelectWrapper = styled("div")``;
