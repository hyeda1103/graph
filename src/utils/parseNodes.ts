import { GraphProto, TensorProto } from "@/types";
function parseNodes(graph: GraphProto) {
  const nodes = graph.node;
  const input = graph.input;
  const output = graph.output;
  const initializers = graph.initializer;

  const initializerMap = new Map<string, TensorProto>();
  initializers.forEach((initializer) => {
    initializerMap.set(initializer.name, initializer);
  });

  const defaultNodes = nodes.map((node) => {
    let label = "";
    node.input.forEach((inputName) => {
      if (initializerMap.has(inputName)) {
        const value = initializerMap.get(inputName);

        // If it's a scalar value (only 1 element), print the value
        if (value.dims.length === 0) {
          const buf = new ArrayBuffer(value.rawData.length);
          const view = new DataView(buf);
          value.rawData.forEach(function (b, i) {
            view.setUint8(i, b);
          });
          const valueString = dataViewToString(view, value.dataType);

          label += `${valueString} \n`;
        } else {
          console.log(inputName);
          // Else, load the dimension data of the initializer and print it
          const dimensionString = value.dims.join("x");
          label += `<${dimensionString}> \n`;
        }
      }
    });

    return {
      id: node.name,
      name: node.name,
      type: node.opType,
      data: {
        label: label,
      },
      position: {
        x: 0,
        y: 0,
      },
    };
  });

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

export function dataViewToString(view: DataView, tensorDataType: number): string {
  switch (tensorDataType) {
    case 1:
      return view.getFloat32(0, true).toString();
    case 2:
      return view.getUint8(0).toString();
    case 3:
      return view.getInt8(0).toString();
    case 4:
      return view.getUint16(0, true).toString();
    case 5:
      return view.getInt16(0, true).toString();
    case 6:
      return view.getInt32(0, true).toString();
    case 7:
      return view.getBigInt64(0, true).toString();
    default:
      return "unhandledtype";
  }
}

export default parseNodes;
