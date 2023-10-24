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

  .react-flow .react-flow__node-input,
  .react-flow .react-flow__node-output {
    padding: 0;
    border-radius: 0;
    border: none;
    width: fit-content;
  }
`;

export const SelectWrapper = styled("div")`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: 1fr;
  grid-row-gap: 0.5em;
  background-color: #eee;
  padding: 0.75em 1em;
  border-radius: 4px;
`;

export const LayoutOptionWrapper = styled("div")`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: 1fr;
  grid-row-gap: 0.5em;
  background-color: #eee;
  padding: 0.75em 1em;
  border-radius: 4px;
`;

export const Inner = styled("div")`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: 1fr;
  grid-row-gap: 1.5em;
`;

export const BasicButton = styled("button")`
  border: 1px solid #000;
  border-radius: 4px;
  color: #000;
  background-color: #eee;
  cursor: pointer;
  padding: 0.125em 0;

  :hover {
    background-color: #fff;
  }
`;
