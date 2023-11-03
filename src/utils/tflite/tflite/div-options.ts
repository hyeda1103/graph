// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from "flatbuffers";

import { ActivationFunctionType } from "@/utils/tflite/tflite/activation-function-type";

export class DivOptions {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): DivOptions {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsDivOptions(bb: flatbuffers.ByteBuffer, obj?: DivOptions): DivOptions {
    return (obj || new DivOptions()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  static getSizePrefixedRootAsDivOptions(bb: flatbuffers.ByteBuffer, obj?: DivOptions): DivOptions {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new DivOptions()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  fusedActivationFunction(): ActivationFunctionType {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset ? this.bb!.readInt8(this.bb_pos + offset) : ActivationFunctionType.NONE;
  }

  static startDivOptions(builder: flatbuffers.Builder) {
    builder.startObject(1);
  }

  static addFusedActivationFunction(
    builder: flatbuffers.Builder,
    fusedActivationFunction: ActivationFunctionType,
  ) {
    builder.addFieldInt8(0, fusedActivationFunction, ActivationFunctionType.NONE);
  }

  static endDivOptions(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createDivOptions(
    builder: flatbuffers.Builder,
    fusedActivationFunction: ActivationFunctionType,
  ): flatbuffers.Offset {
    DivOptions.startDivOptions(builder);
    DivOptions.addFusedActivationFunction(builder, fusedActivationFunction);
    return DivOptions.endDivOptions(builder);
  }
}
