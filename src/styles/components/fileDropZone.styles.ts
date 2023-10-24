import styled from "@emotion/styled";

export const Inner = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #000;
  cursor: pointer;
  padding: 0.1em;
`;

export const Dashed = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  border: 1px dashed #000;
  cursor: pointer;
  font-size: 13.5px;
  white-space: pre-wrap;

  :hover {
    background-color: #eee;
  }
`;
