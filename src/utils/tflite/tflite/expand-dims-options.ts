// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from "flatbuffers";

export class ExpandDimsOptions {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): ExpandDimsOptions {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsExpandDimsOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: ExpandDimsOptions,
  ): ExpandDimsOptions {
    return (obj || new ExpandDimsOptions()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  static getSizePrefixedRootAsExpandDimsOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: ExpandDimsOptions,
  ): ExpandDimsOptions {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new ExpandDimsOptions()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  static startExpandDimsOptions(builder: flatbuffers.Builder) {
    builder.startObject(0);
  }

  static endExpandDimsOptions(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createExpandDimsOptions(builder: flatbuffers.Builder): flatbuffers.Offset {
    ExpandDimsOptions.startExpandDimsOptions(builder);
    return ExpandDimsOptions.endExpandDimsOptions(builder);
  }
}
