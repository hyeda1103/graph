// automatically generated by the FlatBuffers compiler, do not modify

import "flatbuffers";

export class ATan2Options {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): ATan2Options {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsATan2Options(bb: flatbuffers.ByteBuffer, obj?: ATan2Options): ATan2Options {
    return (obj || new ATan2Options()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  static getSizePrefixedRootAsATan2Options(
    bb: flatbuffers.ByteBuffer,
    obj?: ATan2Options,
  ): ATan2Options {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new ATan2Options()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  static startATan2Options(builder: flatbuffers.Builder) {
    builder.startObject(0);
  }

  static endATan2Options(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createATan2Options(builder: flatbuffers.Builder): flatbuffers.Offset {
    ATan2Options.startATan2Options(builder);
    return ATan2Options.endATan2Options(builder);
  }
}
