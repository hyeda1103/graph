import { GraphProto } from "@/types";
function parseNodes(graph: GraphProto) {
  const nodes = graph.node;
  const input = graph.input;
  const output = graph.output;

  const defaultNodes = nodes.map((node) => ({
    id: node.name,
    name: node.name,
    type: node.opType,
    data: {
      label: node.name,
    },
    position: {
      x: 0,
      y: 0,
    },
  }));

  const inputNodes = input.map((i) => ({
    id: i.name,
    name: i.name,
    type: "input",
    data: {
      label: i.name,
    },
    position: {
      x: 0,
      y: 0,
    },
  }));

  const outputNodes = output.map((o) => ({
    id: o.name,
    name: o.name,
    type: "output",
    data: {
      label: o.name,
    },
    position: {
      x: 0,
      y: 0,
    },
  }));
  return [...defaultNodes, ...inputNodes, ...outputNodes];
}

export default parseNodes;
