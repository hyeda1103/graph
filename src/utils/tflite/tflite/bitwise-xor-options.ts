// automatically generated by the FlatBuffers compiler, do not modify

import "flatbuffers";

export class BitwiseXorOptions {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): BitwiseXorOptions {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsBitwiseXorOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: BitwiseXorOptions,
  ): BitwiseXorOptions {
    return (obj || new BitwiseXorOptions()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  static getSizePrefixedRootAsBitwiseXorOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: BitwiseXorOptions,
  ): BitwiseXorOptions {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new BitwiseXorOptions()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  static startBitwiseXorOptions(builder: flatbuffers.Builder) {
    builder.startObject(0);
  }

  static endBitwiseXorOptions(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createBitwiseXorOptions(builder: flatbuffers.Builder): flatbuffers.Offset {
    BitwiseXorOptions.startBitwiseXorOptions(builder);
    return BitwiseXorOptions.endBitwiseXorOptions(builder);
  }
}
