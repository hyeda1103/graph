import ShapeNode from "@/components/Nodes/Shape";
import InputNode from "@/components/Nodes/Input";
import OutputNode from "@/components/Nodes/Output";
import DefaultNode from "@/components/Nodes/Default";

interface Props {
  nodeType: string;
}

function Node({ nodeType }: Props) {
  const result = (() => {
    switch (nodeType) {
      case "input":
        return InputNode;
      case "output":
        return OutputNode;
      default:
        return DefaultNode;
    }
  })();
  return result;
}

export default Node;
