// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from "flatbuffers";

export class StablehloGatherOptions {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): StablehloGatherOptions {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsStablehloGatherOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: StablehloGatherOptions,
  ): StablehloGatherOptions {
    return (obj || new StablehloGatherOptions()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb,
    );
  }

  static getSizePrefixedRootAsStablehloGatherOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: StablehloGatherOptions,
  ): StablehloGatherOptions {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new StablehloGatherOptions()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb,
    );
  }

  offsetDims(index: number): bigint | null {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset
      ? this.bb!.readInt64(this.bb!.__vector(this.bb_pos + offset) + index * 8)
      : BigInt(0);
  }

  offsetDimsLength(): number {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
  }

  collapsedSliceDims(index: number): bigint | null {
    const offset = this.bb!.__offset(this.bb_pos, 6);
    return offset
      ? this.bb!.readInt64(this.bb!.__vector(this.bb_pos + offset) + index * 8)
      : BigInt(0);
  }

  collapsedSliceDimsLength(): number {
    const offset = this.bb!.__offset(this.bb_pos, 6);
    return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
  }

  startIndexMap(index: number): bigint | null {
    const offset = this.bb!.__offset(this.bb_pos, 8);
    return offset
      ? this.bb!.readInt64(this.bb!.__vector(this.bb_pos + offset) + index * 8)
      : BigInt(0);
  }

  startIndexMapLength(): number {
    const offset = this.bb!.__offset(this.bb_pos, 8);
    return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
  }

  indexVectorDim(): bigint {
    const offset = this.bb!.__offset(this.bb_pos, 10);
    return offset ? this.bb!.readInt64(this.bb_pos + offset) : BigInt("0");
  }

  sliceSizes(index: number): bigint | null {
    const offset = this.bb!.__offset(this.bb_pos, 12);
    return offset
      ? this.bb!.readInt64(this.bb!.__vector(this.bb_pos + offset) + index * 8)
      : BigInt(0);
  }

  sliceSizesLength(): number {
    const offset = this.bb!.__offset(this.bb_pos, 12);
    return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
  }

  indicesAreSorted(): boolean {
    const offset = this.bb!.__offset(this.bb_pos, 14);
    return offset ? !!this.bb!.readInt8(this.bb_pos + offset) : false;
  }

  static startStablehloGatherOptions(builder: flatbuffers.Builder) {
    builder.startObject(6);
  }

  static addOffsetDims(builder: flatbuffers.Builder, offsetDimsOffset: flatbuffers.Offset) {
    builder.addFieldOffset(0, offsetDimsOffset, 0);
  }

  static createOffsetDimsVector(builder: flatbuffers.Builder, data: bigint[]): flatbuffers.Offset {
    builder.startVector(8, data.length, 8);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt64(data[i]!);
    }
    return builder.endVector();
  }

  static startOffsetDimsVector(builder: flatbuffers.Builder, numElems: number) {
    builder.startVector(8, numElems, 8);
  }

  static addCollapsedSliceDims(
    builder: flatbuffers.Builder,
    collapsedSliceDimsOffset: flatbuffers.Offset,
  ) {
    builder.addFieldOffset(1, collapsedSliceDimsOffset, 0);
  }

  static createCollapsedSliceDimsVector(
    builder: flatbuffers.Builder,
    data: bigint[],
  ): flatbuffers.Offset {
    builder.startVector(8, data.length, 8);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt64(data[i]!);
    }
    return builder.endVector();
  }

  static startCollapsedSliceDimsVector(builder: flatbuffers.Builder, numElems: number) {
    builder.startVector(8, numElems, 8);
  }

  static addStartIndexMap(builder: flatbuffers.Builder, startIndexMapOffset: flatbuffers.Offset) {
    builder.addFieldOffset(2, startIndexMapOffset, 0);
  }

  static createStartIndexMapVector(
    builder: flatbuffers.Builder,
    data: bigint[],
  ): flatbuffers.Offset {
    builder.startVector(8, data.length, 8);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt64(data[i]!);
    }
    return builder.endVector();
  }

  static startStartIndexMapVector(builder: flatbuffers.Builder, numElems: number) {
    builder.startVector(8, numElems, 8);
  }

  static addIndexVectorDim(builder: flatbuffers.Builder, indexVectorDim: bigint) {
    builder.addFieldInt64(3, indexVectorDim, BigInt("0"));
  }

  static addSliceSizes(builder: flatbuffers.Builder, sliceSizesOffset: flatbuffers.Offset) {
    builder.addFieldOffset(4, sliceSizesOffset, 0);
  }

  static createSliceSizesVector(builder: flatbuffers.Builder, data: bigint[]): flatbuffers.Offset {
    builder.startVector(8, data.length, 8);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt64(data[i]!);
    }
    return builder.endVector();
  }

  static startSliceSizesVector(builder: flatbuffers.Builder, numElems: number) {
    builder.startVector(8, numElems, 8);
  }

  static addIndicesAreSorted(builder: flatbuffers.Builder, indicesAreSorted: boolean) {
    builder.addFieldInt8(5, +indicesAreSorted, +false);
  }

  static endStablehloGatherOptions(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createStablehloGatherOptions(
    builder: flatbuffers.Builder,
    offsetDimsOffset: flatbuffers.Offset,
    collapsedSliceDimsOffset: flatbuffers.Offset,
    startIndexMapOffset: flatbuffers.Offset,
    indexVectorDim: bigint,
    sliceSizesOffset: flatbuffers.Offset,
    indicesAreSorted: boolean,
  ): flatbuffers.Offset {
    StablehloGatherOptions.startStablehloGatherOptions(builder);
    StablehloGatherOptions.addOffsetDims(builder, offsetDimsOffset);
    StablehloGatherOptions.addCollapsedSliceDims(builder, collapsedSliceDimsOffset);
    StablehloGatherOptions.addStartIndexMap(builder, startIndexMapOffset);
    StablehloGatherOptions.addIndexVectorDim(builder, indexVectorDim);
    StablehloGatherOptions.addSliceSizes(builder, sliceSizesOffset);
    StablehloGatherOptions.addIndicesAreSorted(builder, indicesAreSorted);
    return StablehloGatherOptions.endStablehloGatherOptions(builder);
  }
}
