// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from "flatbuffers";

export class HashtableSizeOptions {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): HashtableSizeOptions {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsHashtableSizeOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: HashtableSizeOptions,
  ): HashtableSizeOptions {
    return (obj || new HashtableSizeOptions()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb,
    );
  }

  static getSizePrefixedRootAsHashtableSizeOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: HashtableSizeOptions,
  ): HashtableSizeOptions {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new HashtableSizeOptions()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb,
    );
  }

  static startHashtableSizeOptions(builder: flatbuffers.Builder) {
    builder.startObject(0);
  }

  static endHashtableSizeOptions(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createHashtableSizeOptions(builder: flatbuffers.Builder): flatbuffers.Offset {
    HashtableSizeOptions.startHashtableSizeOptions(builder);
    return HashtableSizeOptions.endHashtableSizeOptions(builder);
  }
}
