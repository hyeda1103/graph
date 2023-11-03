// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from "flatbuffers";

export class ReverseV2Options {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): ReverseV2Options {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsReverseV2Options(
    bb: flatbuffers.ByteBuffer,
    obj?: ReverseV2Options,
  ): ReverseV2Options {
    return (obj || new ReverseV2Options()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  static getSizePrefixedRootAsReverseV2Options(
    bb: flatbuffers.ByteBuffer,
    obj?: ReverseV2Options,
  ): ReverseV2Options {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new ReverseV2Options()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  static startReverseV2Options(builder: flatbuffers.Builder) {
    builder.startObject(0);
  }

  static endReverseV2Options(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createReverseV2Options(builder: flatbuffers.Builder): flatbuffers.Offset {
    ReverseV2Options.startReverseV2Options(builder);
    return ReverseV2Options.endReverseV2Options(builder);
  }
}
