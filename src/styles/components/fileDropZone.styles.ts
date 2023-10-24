import styled from "@emotion/styled";

export const Inner = styled("div")`
  position: fixed;
  left: 5px;
  top: 5px;
  width: 200px;
  aspect-ratio: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  border-radius: 8px;
  background-color: #eee;
  z-index: 99;
  cursor: pointer;
`;
