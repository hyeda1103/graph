// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from "flatbuffers";

import { LSHProjectionType } from "@/utils/tflite/tflite/lshprojection-type";

export class LSHProjectionOptions {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): LSHProjectionOptions {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsLSHProjectionOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: LSHProjectionOptions,
  ): LSHProjectionOptions {
    return (obj || new LSHProjectionOptions()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb,
    );
  }

  static getSizePrefixedRootAsLSHProjectionOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: LSHProjectionOptions,
  ): LSHProjectionOptions {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new LSHProjectionOptions()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb,
    );
  }

  type(): LSHProjectionType {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset ? this.bb!.readInt8(this.bb_pos + offset) : LSHProjectionType.UNKNOWN;
  }

  static startLSHProjectionOptions(builder: flatbuffers.Builder) {
    builder.startObject(1);
  }

  static addType(builder: flatbuffers.Builder, type: LSHProjectionType) {
    builder.addFieldInt8(0, type, LSHProjectionType.UNKNOWN);
  }

  static endLSHProjectionOptions(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createLSHProjectionOptions(
    builder: flatbuffers.Builder,
    type: LSHProjectionType,
  ): flatbuffers.Offset {
    LSHProjectionOptions.startLSHProjectionOptions(builder);
    LSHProjectionOptions.addType(builder, type);
    return LSHProjectionOptions.endLSHProjectionOptions(builder);
  }
}
