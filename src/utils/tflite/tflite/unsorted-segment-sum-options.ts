// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from "flatbuffers";

export class UnsortedSegmentSumOptions {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): UnsortedSegmentSumOptions {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsUnsortedSegmentSumOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: UnsortedSegmentSumOptions,
  ): UnsortedSegmentSumOptions {
    return (obj || new UnsortedSegmentSumOptions()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb,
    );
  }

  static getSizePrefixedRootAsUnsortedSegmentSumOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: UnsortedSegmentSumOptions,
  ): UnsortedSegmentSumOptions {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new UnsortedSegmentSumOptions()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb,
    );
  }

  static startUnsortedSegmentSumOptions(builder: flatbuffers.Builder) {
    builder.startObject(0);
  }

  static endUnsortedSegmentSumOptions(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createUnsortedSegmentSumOptions(builder: flatbuffers.Builder): flatbuffers.Offset {
    UnsortedSegmentSumOptions.startUnsortedSegmentSumOptions(builder);
    return UnsortedSegmentSumOptions.endUnsortedSegmentSumOptions(builder);
  }
}
