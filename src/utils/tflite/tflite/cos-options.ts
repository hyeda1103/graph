// automatically generated by the FlatBuffers compiler, do not modify

import "flatbuffers";

export class CosOptions {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): CosOptions {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsCosOptions(bb: flatbuffers.ByteBuffer, obj?: CosOptions): CosOptions {
    return (obj || new CosOptions()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  static getSizePrefixedRootAsCosOptions(bb: flatbuffers.ByteBuffer, obj?: CosOptions): CosOptions {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new CosOptions()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  static startCosOptions(builder: flatbuffers.Builder) {
    builder.startObject(0);
  }

  static endCosOptions(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createCosOptions(builder: flatbuffers.Builder): flatbuffers.Offset {
    CosOptions.startCosOptions(builder);
    return CosOptions.endCosOptions(builder);
  }
}
