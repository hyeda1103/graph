// automatically generated by the FlatBuffers compiler, do not modify

import "flatbuffers";

export class IfOptions {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): IfOptions {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsIfOptions(bb: flatbuffers.ByteBuffer, obj?: IfOptions): IfOptions {
    return (obj || new IfOptions()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  static getSizePrefixedRootAsIfOptions(bb: flatbuffers.ByteBuffer, obj?: IfOptions): IfOptions {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new IfOptions()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  thenSubgraphIndex(): number {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
  }

  elseSubgraphIndex(): number {
    const offset = this.bb!.__offset(this.bb_pos, 6);
    return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
  }

  static startIfOptions(builder: flatbuffers.Builder) {
    builder.startObject(2);
  }

  static addThenSubgraphIndex(builder: flatbuffers.Builder, thenSubgraphIndex: number) {
    builder.addFieldInt32(0, thenSubgraphIndex, 0);
  }

  static addElseSubgraphIndex(builder: flatbuffers.Builder, elseSubgraphIndex: number) {
    builder.addFieldInt32(1, elseSubgraphIndex, 0);
  }

  static endIfOptions(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createIfOptions(
    builder: flatbuffers.Builder,
    thenSubgraphIndex: number,
    elseSubgraphIndex: number,
  ): flatbuffers.Offset {
    IfOptions.startIfOptions(builder);
    IfOptions.addThenSubgraphIndex(builder, thenSubgraphIndex);
    IfOptions.addElseSubgraphIndex(builder, elseSubgraphIndex);
    return IfOptions.endIfOptions(builder);
  }
}
