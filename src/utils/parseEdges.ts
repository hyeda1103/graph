import * as I from "@/types";

function parseEdges(graph: I.ModelProto["graph"]) {
  const nodes = graph.node;
  const input = graph.input;
  const output = graph.output;

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

  const inputEdges = input.map((i) => {
    const inputTargetNode = nodes.find((node) => node.input?.includes(i.name));

    return {
      id: i.name,
      source: i.name,
      target: inputTargetNode?.name || "",
    };
  });

  const outputEdges = output.map((o) => {
    const outputSourceNode = nodes.find((node) => node.output?.includes(o.name));

    return {
      id: o.name,
      source: outputSourceNode?.name || "",
      target: o.name,
    };
  });
  return [...inputEdges, ...middleEdges, ...outputEdges];
}

export default parseEdges;
