// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from "flatbuffers";

import { TensorType } from "@/utils/tflite/tflite/tensor-type";

export class ShapeOptions {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): ShapeOptions {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsShapeOptions(bb: flatbuffers.ByteBuffer, obj?: ShapeOptions): ShapeOptions {
    return (obj || new ShapeOptions()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  static getSizePrefixedRootAsShapeOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: ShapeOptions,
  ): ShapeOptions {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new ShapeOptions()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  outType(): TensorType {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset ? this.bb!.readInt8(this.bb_pos + offset) : TensorType.FLOAT32;
  }

  static startShapeOptions(builder: flatbuffers.Builder) {
    builder.startObject(1);
  }

  static addOutType(builder: flatbuffers.Builder, outType: TensorType) {
    builder.addFieldInt8(0, outType, TensorType.FLOAT32);
  }

  static endShapeOptions(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createShapeOptions(builder: flatbuffers.Builder, outType: TensorType): flatbuffers.Offset {
    ShapeOptions.startShapeOptions(builder);
    ShapeOptions.addOutType(builder, outType);
    return ShapeOptions.endShapeOptions(builder);
  }
}
