import { Edge as ReactFlowEdge, Node as ReactFlowNode } from "reactflow";

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
  label?: string;
}

export interface Node {
  id?: string;
  name?: string;
  type?: string;
  attributes?: {
    name?: string;
  };
  data?: {
    label: string;
  };
  input?: Node["name"][];
  output?: Node["name"][];
  position?: {
    x: number;
    y: number;
  };
}

export interface Dimension {
  dimValue?: number;
  dimParam?: string;
}

export interface TensorShapeProto {
  dim: Dimension[];
}
export interface Tensor {
  elemType: number;
  shape: TensorShapeProto;
}

export interface TypeProto {
  tensorType: Tensor;
}

export interface ValueInfoProto {
  name: string;
  type: TypeProto;
}

export interface AttributeProto {
  floats: any[];
  graphs: any[];
  i: number;
  ints: any[];
  name: string;
  sparseTensors: any[];
  strings: string[];
  tensors: any[];
  type: number;
  typeProtos: any[];
}

export interface NodeProto {
  attribute: AttributeProto[];
  input: string[];
  name: string;
  opType: string;
  output: string[];
}

export interface OperatorSetIdProto {
  domain: string;
  version: number;
}

export interface TensorProto {
  dataType: number;
  name: string;
  rawData: number[];
  dims: number[];
}

export interface GraphProto {
  docString: string;
  initializer: TensorProto[];
  input: ValueInfoProto[];
  node: NodeProto[];
  output: ValueInfoProto[];
  valueInfo: ValueInfoProto[];
}

export interface ModelProto {
  functions?: any[];
  graph: GraphProto;
  irVersion?: number;
  metadataProps?: any[];
  opsetImport?: OperatorSetIdProto[];
  producerName?: string;
  trainingInfo?: any[];
}

export enum Layout {
  VERTICAL = "Vertical",
  HORIZONTAL = "Horizontal",
}

export enum AcceptedFileExt {
  TFLITE = ".tflite",
  ONNX = ".onnx",
}

export interface CustomGraphProto {
  graph: {
    node: ReactFlowNode[];
    edge: ReactFlowEdge[];
  };
}
