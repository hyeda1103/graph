import * as I from "@/types";
function parseNodes(nodes: I.Node[], input: I.Node, output: I.Node) {
  const defaultNodes = nodes.map((node) => ({
    id: node.name,
    name: node.name,
    type: node.type,
    data: {
      label: node.name,
    },
    position: {
      x: 0,
      y: 0,
    },
  }));
  const inputNode = {
    id: input.name,
    name: input.name,
    type: "input",
    data: {
      label: input.name,
    },
    position: {
      x: 0,
      y: 0,
    },
  };
  const outputNode = {
    id: output.name,
    name: output.name,
    type: "output",
    data: {
      label: output.name,
    },
    position: {
      x: 0,
      y: 0,
    },
  };
  return [...defaultNodes, inputNode, outputNode];
}

export default parseNodes;
