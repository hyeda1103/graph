// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from "flatbuffers";

export class NonMaxSuppressionV5Options {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): NonMaxSuppressionV5Options {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsNonMaxSuppressionV5Options(
    bb: flatbuffers.ByteBuffer,
    obj?: NonMaxSuppressionV5Options,
  ): NonMaxSuppressionV5Options {
    return (obj || new NonMaxSuppressionV5Options()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb,
    );
  }

  static getSizePrefixedRootAsNonMaxSuppressionV5Options(
    bb: flatbuffers.ByteBuffer,
    obj?: NonMaxSuppressionV5Options,
  ): NonMaxSuppressionV5Options {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new NonMaxSuppressionV5Options()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb,
    );
  }

  static startNonMaxSuppressionV5Options(builder: flatbuffers.Builder) {
    builder.startObject(0);
  }

  static endNonMaxSuppressionV5Options(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createNonMaxSuppressionV5Options(builder: flatbuffers.Builder): flatbuffers.Offset {
    NonMaxSuppressionV5Options.startNonMaxSuppressionV5Options(builder);
    return NonMaxSuppressionV5Options.endNonMaxSuppressionV5Options(builder);
  }
}
