// automatically generated by the FlatBuffers compiler, do not modify

import "flatbuffers";

import { ActivationFunctionType } from "@/utils/tflite/tflite/activation-function-type";

export class MulOptions {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): MulOptions {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsMulOptions(bb: flatbuffers.ByteBuffer, obj?: MulOptions): MulOptions {
    return (obj || new MulOptions()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  static getSizePrefixedRootAsMulOptions(bb: flatbuffers.ByteBuffer, obj?: MulOptions): MulOptions {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new MulOptions()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  fusedActivationFunction(): ActivationFunctionType {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset ? this.bb!.readInt8(this.bb_pos + offset) : ActivationFunctionType.NONE;
  }

  static startMulOptions(builder: flatbuffers.Builder) {
    builder.startObject(1);
  }

  static addFusedActivationFunction(
    builder: flatbuffers.Builder,
    fusedActivationFunction: ActivationFunctionType,
  ) {
    builder.addFieldInt8(0, fusedActivationFunction, ActivationFunctionType.NONE);
  }

  static endMulOptions(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createMulOptions(
    builder: flatbuffers.Builder,
    fusedActivationFunction: ActivationFunctionType,
  ): flatbuffers.Offset {
    MulOptions.startMulOptions(builder);
    MulOptions.addFusedActivationFunction(builder, fusedActivationFunction);
    return MulOptions.endMulOptions(builder);
  }
}
