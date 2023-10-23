export enum NodeType {
  INPUT = "input",
  OUTPUT = "output",
  DEFAULT = "default",
  CONNECTOR = "connector",
  QUANTIZE_LINEAR = "QuantizeLinear",
  DEQUANTIZE_LINEAR = "DequantizeLinear",
  CONV = "Conv",
  RELU = "Relu",
  MAX_POOL = "MaxPool",
  SHAPE = "Shape",
  GATHER_ELEMENTS = "GatherElements",
  RESHAPE = "Reshape",
  GEMM = "Gemm",
  CONCAT = "Concat",
}

export interface Edge {
  id: string;
  source: string;
  target: string;
}

export interface Node {
  id: string;
  name: string;
  type?: string;
  attributes?: {
    name: string;
  }[];
  data: {
    label: string;
  };
  input?: Node["name"][];
  output?: Node["name"][];
  position: {
    x: number;
    y: number;
  };
}
