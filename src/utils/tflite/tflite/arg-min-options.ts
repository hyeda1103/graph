// automatically generated by the FlatBuffers compiler, do not modify

import "flatbuffers";

import { TensorType } from "@/utils/tflite/tflite/tensor-type";

export class ArgMinOptions {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): ArgMinOptions {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsArgMinOptions(bb: flatbuffers.ByteBuffer, obj?: ArgMinOptions): ArgMinOptions {
    return (obj || new ArgMinOptions()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  static getSizePrefixedRootAsArgMinOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: ArgMinOptions,
  ): ArgMinOptions {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new ArgMinOptions()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  outputType(): TensorType {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset ? this.bb!.readInt8(this.bb_pos + offset) : TensorType.FLOAT32;
  }

  static startArgMinOptions(builder: flatbuffers.Builder) {
    builder.startObject(1);
  }

  static addOutputType(builder: flatbuffers.Builder, outputType: TensorType) {
    builder.addFieldInt8(0, outputType, TensorType.FLOAT32);
  }

  static endArgMinOptions(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createArgMinOptions(
    builder: flatbuffers.Builder,
    outputType: TensorType,
  ): flatbuffers.Offset {
    ArgMinOptions.startArgMinOptions(builder);
    ArgMinOptions.addOutputType(builder, outputType);
    return ArgMinOptions.endArgMinOptions(builder);
  }
}