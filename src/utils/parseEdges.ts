import * as I from "@/types";

function parseEdges(nodes: I.Node[], input: I.Node, output: I.Node) {
  const edges = nodes.reduce((acc, cur) => {
    if (cur.input) {
      const newEdges = Array.from({
        length: cur.input.length,
      }).map((_, idx) => ({
        id: (cur.input as string[])[idx],
        source: "",
        target: cur.name,
      }));
      acc = acc.concat(newEdges);
    }
    return acc;
  }, [] as I.Edge[]);

  const middleEdges = edges.reduce((acc, cur) => {
    const node = nodes.find((node) => node.output?.includes(cur.id));
    if (node) {
      acc = acc.concat({
        ...cur,
        id: `reactflow__edge-${node.name}-${cur.target}`,
        source: node.name,
      });
    }
    return acc;
  }, [] as I.Edge[]);

  const inputTargetNode = nodes.find((node) => node.input?.includes(input.name));

  const inputEdge = {
    id: input.name,
    source: input.name,
    target: inputTargetNode?.name || "",
  };

  const outputSourceNode = nodes.find((node) => node.output?.includes(output.name));

  const outputEdge = {
    id: output.name,
    source: outputSourceNode?.name || "",
    target: output.name,
  };
  return [inputEdge, ...middleEdges, outputEdge];
}

export default parseEdges;
