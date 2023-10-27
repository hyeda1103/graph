// automatically generated by the FlatBuffers compiler, do not modify

import "flatbuffers";

export class SkipGramOptions {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): SkipGramOptions {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsSkipGramOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: SkipGramOptions,
  ): SkipGramOptions {
    return (obj || new SkipGramOptions()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  static getSizePrefixedRootAsSkipGramOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: SkipGramOptions,
  ): SkipGramOptions {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new SkipGramOptions()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  ngramSize(): number {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
  }

  maxSkipSize(): number {
    const offset = this.bb!.__offset(this.bb_pos, 6);
    return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
  }

  includeAllNgrams(): boolean {
    const offset = this.bb!.__offset(this.bb_pos, 8);
    return offset ? !!this.bb!.readInt8(this.bb_pos + offset) : false;
  }

  static startSkipGramOptions(builder: flatbuffers.Builder) {
    builder.startObject(3);
  }

  static addNgramSize(builder: flatbuffers.Builder, ngramSize: number) {
    builder.addFieldInt32(0, ngramSize, 0);
  }

  static addMaxSkipSize(builder: flatbuffers.Builder, maxSkipSize: number) {
    builder.addFieldInt32(1, maxSkipSize, 0);
  }

  static addIncludeAllNgrams(builder: flatbuffers.Builder, includeAllNgrams: boolean) {
    builder.addFieldInt8(2, +includeAllNgrams, +false);
  }

  static endSkipGramOptions(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createSkipGramOptions(
    builder: flatbuffers.Builder,
    ngramSize: number,
    maxSkipSize: number,
    includeAllNgrams: boolean,
  ): flatbuffers.Offset {
    SkipGramOptions.startSkipGramOptions(builder);
    SkipGramOptions.addNgramSize(builder, ngramSize);
    SkipGramOptions.addMaxSkipSize(builder, maxSkipSize);
    SkipGramOptions.addIncludeAllNgrams(builder, includeAllNgrams);
    return SkipGramOptions.endSkipGramOptions(builder);
  }
}