// automatically generated by the FlatBuffers compiler, do not modify

import "flatbuffers";

export class AddNOptions {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): AddNOptions {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsAddNOptions(bb: flatbuffers.ByteBuffer, obj?: AddNOptions): AddNOptions {
    return (obj || new AddNOptions()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  static getSizePrefixedRootAsAddNOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: AddNOptions,
  ): AddNOptions {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new AddNOptions()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  static startAddNOptions(builder: flatbuffers.Builder) {
    builder.startObject(0);
  }

  static endAddNOptions(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createAddNOptions(builder: flatbuffers.Builder): flatbuffers.Offset {
    AddNOptions.startAddNOptions(builder);
    return AddNOptions.endAddNOptions(builder);
  }
}
