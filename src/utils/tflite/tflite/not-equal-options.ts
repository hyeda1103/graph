// automatically generated by the FlatBuffers compiler, do not modify

import "flatbuffers";

export class NotEqualOptions {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): NotEqualOptions {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsNotEqualOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: NotEqualOptions,
  ): NotEqualOptions {
    return (obj || new NotEqualOptions()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  static getSizePrefixedRootAsNotEqualOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: NotEqualOptions,
  ): NotEqualOptions {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new NotEqualOptions()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  static startNotEqualOptions(builder: flatbuffers.Builder) {
    builder.startObject(0);
  }

  static endNotEqualOptions(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createNotEqualOptions(builder: flatbuffers.Builder): flatbuffers.Offset {
    NotEqualOptions.startNotEqualOptions(builder);
    return NotEqualOptions.endNotEqualOptions(builder);
  }
}
