// automatically generated by the FlatBuffers compiler, do not modify

import "flatbuffers";

export class SpaceToBatchNDOptions {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): SpaceToBatchNDOptions {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsSpaceToBatchNDOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: SpaceToBatchNDOptions,
  ): SpaceToBatchNDOptions {
    return (obj || new SpaceToBatchNDOptions()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb,
    );
  }

  static getSizePrefixedRootAsSpaceToBatchNDOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: SpaceToBatchNDOptions,
  ): SpaceToBatchNDOptions {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new SpaceToBatchNDOptions()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb,
    );
  }

  static startSpaceToBatchNDOptions(builder: flatbuffers.Builder) {
    builder.startObject(0);
  }

  static endSpaceToBatchNDOptions(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createSpaceToBatchNDOptions(builder: flatbuffers.Builder): flatbuffers.Offset {
    SpaceToBatchNDOptions.startSpaceToBatchNDOptions(builder);
    return SpaceToBatchNDOptions.endSpaceToBatchNDOptions(builder);
  }
}