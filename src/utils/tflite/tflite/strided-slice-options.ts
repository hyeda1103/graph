// automatically generated by the FlatBuffers compiler, do not modify

import "flatbuffers";

export class StridedSliceOptions {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): StridedSliceOptions {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsStridedSliceOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: StridedSliceOptions,
  ): StridedSliceOptions {
    return (obj || new StridedSliceOptions()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb,
    );
  }

  static getSizePrefixedRootAsStridedSliceOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: StridedSliceOptions,
  ): StridedSliceOptions {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new StridedSliceOptions()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb,
    );
  }

  beginMask(): number {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
  }

  endMask(): number {
    const offset = this.bb!.__offset(this.bb_pos, 6);
    return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
  }

  ellipsisMask(): number {
    const offset = this.bb!.__offset(this.bb_pos, 8);
    return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
  }

  newAxisMask(): number {
    const offset = this.bb!.__offset(this.bb_pos, 10);
    return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
  }

  shrinkAxisMask(): number {
    const offset = this.bb!.__offset(this.bb_pos, 12);
    return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
  }

  offset(): boolean {
    const offset = this.bb!.__offset(this.bb_pos, 14);
    return offset ? !!this.bb!.readInt8(this.bb_pos + offset) : false;
  }

  static startStridedSliceOptions(builder: flatbuffers.Builder) {
    builder.startObject(6);
  }

  static addBeginMask(builder: flatbuffers.Builder, beginMask: number) {
    builder.addFieldInt32(0, beginMask, 0);
  }

  static addEndMask(builder: flatbuffers.Builder, endMask: number) {
    builder.addFieldInt32(1, endMask, 0);
  }

  static addEllipsisMask(builder: flatbuffers.Builder, ellipsisMask: number) {
    builder.addFieldInt32(2, ellipsisMask, 0);
  }

  static addNewAxisMask(builder: flatbuffers.Builder, newAxisMask: number) {
    builder.addFieldInt32(3, newAxisMask, 0);
  }

  static addShrinkAxisMask(builder: flatbuffers.Builder, shrinkAxisMask: number) {
    builder.addFieldInt32(4, shrinkAxisMask, 0);
  }

  static addOffset(builder: flatbuffers.Builder, offset: boolean) {
    builder.addFieldInt8(5, +offset, +false);
  }

  static endStridedSliceOptions(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createStridedSliceOptions(
    builder: flatbuffers.Builder,
    beginMask: number,
    endMask: number,
    ellipsisMask: number,
    newAxisMask: number,
    shrinkAxisMask: number,
    offset: boolean,
  ): flatbuffers.Offset {
    StridedSliceOptions.startStridedSliceOptions(builder);
    StridedSliceOptions.addBeginMask(builder, beginMask);
    StridedSliceOptions.addEndMask(builder, endMask);
    StridedSliceOptions.addEllipsisMask(builder, ellipsisMask);
    StridedSliceOptions.addNewAxisMask(builder, newAxisMask);
    StridedSliceOptions.addShrinkAxisMask(builder, shrinkAxisMask);
    StridedSliceOptions.addOffset(builder, offset);
    return StridedSliceOptions.endStridedSliceOptions(builder);
  }
}
