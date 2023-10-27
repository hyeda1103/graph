// automatically generated by the FlatBuffers compiler, do not modify

import "flatbuffers";

export class StablehloScatterOptions {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): StablehloScatterOptions {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsStablehloScatterOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: StablehloScatterOptions,
  ): StablehloScatterOptions {
    return (obj || new StablehloScatterOptions()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb,
    );
  }

  static getSizePrefixedRootAsStablehloScatterOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: StablehloScatterOptions,
  ): StablehloScatterOptions {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new StablehloScatterOptions()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb,
    );
  }

  indicesAreSorted(): boolean {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset ? !!this.bb!.readInt8(this.bb_pos + offset) : false;
  }

  updateWindowDims(index: number): bigint | null {
    const offset = this.bb!.__offset(this.bb_pos, 6);
    return offset
      ? this.bb!.readInt64(this.bb!.__vector(this.bb_pos + offset) + index * 8)
      : BigInt(0);
  }

  updateWindowDimsLength(): number {
    const offset = this.bb!.__offset(this.bb_pos, 6);
    return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
  }

  insertedWindowDims(index: number): bigint | null {
    const offset = this.bb!.__offset(this.bb_pos, 8);
    return offset
      ? this.bb!.readInt64(this.bb!.__vector(this.bb_pos + offset) + index * 8)
      : BigInt(0);
  }

  insertedWindowDimsLength(): number {
    const offset = this.bb!.__offset(this.bb_pos, 8);
    return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
  }

  scatterDimsToOperandDims(index: number): bigint | null {
    const offset = this.bb!.__offset(this.bb_pos, 10);
    return offset
      ? this.bb!.readInt64(this.bb!.__vector(this.bb_pos + offset) + index * 8)
      : BigInt(0);
  }

  scatterDimsToOperandDimsLength(): number {
    const offset = this.bb!.__offset(this.bb_pos, 10);
    return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
  }

  indexVectorDim(): bigint {
    const offset = this.bb!.__offset(this.bb_pos, 12);
    return offset ? this.bb!.readInt64(this.bb_pos + offset) : BigInt("0");
  }

  uniqueIndices(): boolean {
    const offset = this.bb!.__offset(this.bb_pos, 14);
    return offset ? !!this.bb!.readInt8(this.bb_pos + offset) : false;
  }

  updateComputationSubgraphIndex(): number {
    const offset = this.bb!.__offset(this.bb_pos, 16);
    return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
  }

  static startStablehloScatterOptions(builder: flatbuffers.Builder) {
    builder.startObject(7);
  }

  static addIndicesAreSorted(builder: flatbuffers.Builder, indicesAreSorted: boolean) {
    builder.addFieldInt8(0, +indicesAreSorted, +false);
  }

  static addUpdateWindowDims(
    builder: flatbuffers.Builder,
    updateWindowDimsOffset: flatbuffers.Offset,
  ) {
    builder.addFieldOffset(1, updateWindowDimsOffset, 0);
  }

  static createUpdateWindowDimsVector(
    builder: flatbuffers.Builder,
    data: bigint[],
  ): flatbuffers.Offset {
    builder.startVector(8, data.length, 8);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt64(data[i]!);
    }
    return builder.endVector();
  }

  static startUpdateWindowDimsVector(builder: flatbuffers.Builder, numElems: number) {
    builder.startVector(8, numElems, 8);
  }

  static addInsertedWindowDims(
    builder: flatbuffers.Builder,
    insertedWindowDimsOffset: flatbuffers.Offset,
  ) {
    builder.addFieldOffset(2, insertedWindowDimsOffset, 0);
  }

  static createInsertedWindowDimsVector(
    builder: flatbuffers.Builder,
    data: bigint[],
  ): flatbuffers.Offset {
    builder.startVector(8, data.length, 8);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt64(data[i]!);
    }
    return builder.endVector();
  }

  static startInsertedWindowDimsVector(builder: flatbuffers.Builder, numElems: number) {
    builder.startVector(8, numElems, 8);
  }

  static addScatterDimsToOperandDims(
    builder: flatbuffers.Builder,
    scatterDimsToOperandDimsOffset: flatbuffers.Offset,
  ) {
    builder.addFieldOffset(3, scatterDimsToOperandDimsOffset, 0);
  }

  static createScatterDimsToOperandDimsVector(
    builder: flatbuffers.Builder,
    data: bigint[],
  ): flatbuffers.Offset {
    builder.startVector(8, data.length, 8);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt64(data[i]!);
    }
    return builder.endVector();
  }

  static startScatterDimsToOperandDimsVector(builder: flatbuffers.Builder, numElems: number) {
    builder.startVector(8, numElems, 8);
  }

  static addIndexVectorDim(builder: flatbuffers.Builder, indexVectorDim: bigint) {
    builder.addFieldInt64(4, indexVectorDim, BigInt("0"));
  }

  static addUniqueIndices(builder: flatbuffers.Builder, uniqueIndices: boolean) {
    builder.addFieldInt8(5, +uniqueIndices, +false);
  }

  static addUpdateComputationSubgraphIndex(
    builder: flatbuffers.Builder,
    updateComputationSubgraphIndex: number,
  ) {
    builder.addFieldInt32(6, updateComputationSubgraphIndex, 0);
  }

  static endStablehloScatterOptions(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createStablehloScatterOptions(
    builder: flatbuffers.Builder,
    indicesAreSorted: boolean,
    updateWindowDimsOffset: flatbuffers.Offset,
    insertedWindowDimsOffset: flatbuffers.Offset,
    scatterDimsToOperandDimsOffset: flatbuffers.Offset,
    indexVectorDim: bigint,
    uniqueIndices: boolean,
    updateComputationSubgraphIndex: number,
  ): flatbuffers.Offset {
    StablehloScatterOptions.startStablehloScatterOptions(builder);
    StablehloScatterOptions.addIndicesAreSorted(builder, indicesAreSorted);
    StablehloScatterOptions.addUpdateWindowDims(builder, updateWindowDimsOffset);
    StablehloScatterOptions.addInsertedWindowDims(builder, insertedWindowDimsOffset);
    StablehloScatterOptions.addScatterDimsToOperandDims(builder, scatterDimsToOperandDimsOffset);
    StablehloScatterOptions.addIndexVectorDim(builder, indexVectorDim);
    StablehloScatterOptions.addUniqueIndices(builder, uniqueIndices);
    StablehloScatterOptions.addUpdateComputationSubgraphIndex(
      builder,
      updateComputationSubgraphIndex,
    );
    return StablehloScatterOptions.endStablehloScatterOptions(builder);
  }
}