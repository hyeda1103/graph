// automatically generated by the FlatBuffers compiler, do not modify

import { StablehloPrecisionConfig } from "@/utils/tflite/tflite/stablehlo-precision-config";

import "flatbuffers";

export class StablehloDotGeneralOptions {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): StablehloDotGeneralOptions {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsStablehloDotGeneralOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: StablehloDotGeneralOptions,
  ): StablehloDotGeneralOptions {
    return (obj || new StablehloDotGeneralOptions()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb,
    );
  }

  static getSizePrefixedRootAsStablehloDotGeneralOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: StablehloDotGeneralOptions,
  ): StablehloDotGeneralOptions {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new StablehloDotGeneralOptions()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb,
    );
  }

  lhsBatchingDimensions(index: number): bigint | null {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset
      ? this.bb!.readInt64(this.bb!.__vector(this.bb_pos + offset) + index * 8)
      : BigInt(0);
  }

  lhsBatchingDimensionsLength(): number {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
  }

  rhsBatchingDimensions(index: number): bigint | null {
    const offset = this.bb!.__offset(this.bb_pos, 6);
    return offset
      ? this.bb!.readInt64(this.bb!.__vector(this.bb_pos + offset) + index * 8)
      : BigInt(0);
  }

  rhsBatchingDimensionsLength(): number {
    const offset = this.bb!.__offset(this.bb_pos, 6);
    return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
  }

  lhsContractingDimensions(index: number): bigint | null {
    const offset = this.bb!.__offset(this.bb_pos, 8);
    return offset
      ? this.bb!.readInt64(this.bb!.__vector(this.bb_pos + offset) + index * 8)
      : BigInt(0);
  }

  lhsContractingDimensionsLength(): number {
    const offset = this.bb!.__offset(this.bb_pos, 8);
    return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
  }

  rhsContractingDimensions(index: number): bigint | null {
    const offset = this.bb!.__offset(this.bb_pos, 10);
    return offset
      ? this.bb!.readInt64(this.bb!.__vector(this.bb_pos + offset) + index * 8)
      : BigInt(0);
  }

  rhsContractingDimensionsLength(): number {
    const offset = this.bb!.__offset(this.bb_pos, 10);
    return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
  }

  precisionConfig(index: number): StablehloPrecisionConfig | null {
    const offset = this.bb!.__offset(this.bb_pos, 12);
    return offset ? this.bb!.readUint32(this.bb!.__vector(this.bb_pos + offset) + index * 4) : 0;
  }

  precisionConfigLength(): number {
    const offset = this.bb!.__offset(this.bb_pos, 12);
    return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
  }

  precisionConfigArray(): Uint32Array | null {
    const offset = this.bb!.__offset(this.bb_pos, 12);
    return offset
      ? new Uint32Array(
          this.bb!.bytes().buffer,
          this.bb!.bytes().byteOffset + this.bb!.__vector(this.bb_pos + offset),
          this.bb!.__vector_len(this.bb_pos + offset),
        )
      : null;
  }

  static startStablehloDotGeneralOptions(builder: flatbuffers.Builder) {
    builder.startObject(5);
  }

  static addLhsBatchingDimensions(
    builder: flatbuffers.Builder,
    lhsBatchingDimensionsOffset: flatbuffers.Offset,
  ) {
    builder.addFieldOffset(0, lhsBatchingDimensionsOffset, 0);
  }

  static createLhsBatchingDimensionsVector(
    builder: flatbuffers.Builder,
    data: bigint[],
  ): flatbuffers.Offset {
    builder.startVector(8, data.length, 8);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt64(data[i]!);
    }
    return builder.endVector();
  }

  static startLhsBatchingDimensionsVector(builder: flatbuffers.Builder, numElems: number) {
    builder.startVector(8, numElems, 8);
  }

  static addRhsBatchingDimensions(
    builder: flatbuffers.Builder,
    rhsBatchingDimensionsOffset: flatbuffers.Offset,
  ) {
    builder.addFieldOffset(1, rhsBatchingDimensionsOffset, 0);
  }

  static createRhsBatchingDimensionsVector(
    builder: flatbuffers.Builder,
    data: bigint[],
  ): flatbuffers.Offset {
    builder.startVector(8, data.length, 8);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt64(data[i]!);
    }
    return builder.endVector();
  }

  static startRhsBatchingDimensionsVector(builder: flatbuffers.Builder, numElems: number) {
    builder.startVector(8, numElems, 8);
  }

  static addLhsContractingDimensions(
    builder: flatbuffers.Builder,
    lhsContractingDimensionsOffset: flatbuffers.Offset,
  ) {
    builder.addFieldOffset(2, lhsContractingDimensionsOffset, 0);
  }

  static createLhsContractingDimensionsVector(
    builder: flatbuffers.Builder,
    data: bigint[],
  ): flatbuffers.Offset {
    builder.startVector(8, data.length, 8);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt64(data[i]!);
    }
    return builder.endVector();
  }

  static startLhsContractingDimensionsVector(builder: flatbuffers.Builder, numElems: number) {
    builder.startVector(8, numElems, 8);
  }

  static addRhsContractingDimensions(
    builder: flatbuffers.Builder,
    rhsContractingDimensionsOffset: flatbuffers.Offset,
  ) {
    builder.addFieldOffset(3, rhsContractingDimensionsOffset, 0);
  }

  static createRhsContractingDimensionsVector(
    builder: flatbuffers.Builder,
    data: bigint[],
  ): flatbuffers.Offset {
    builder.startVector(8, data.length, 8);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt64(data[i]!);
    }
    return builder.endVector();
  }

  static startRhsContractingDimensionsVector(builder: flatbuffers.Builder, numElems: number) {
    builder.startVector(8, numElems, 8);
  }

  static addPrecisionConfig(
    builder: flatbuffers.Builder,
    precisionConfigOffset: flatbuffers.Offset,
  ) {
    builder.addFieldOffset(4, precisionConfigOffset, 0);
  }

  static createPrecisionConfigVector(
    builder: flatbuffers.Builder,
    data: StablehloPrecisionConfig[],
  ): flatbuffers.Offset {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt32(data[i]!);
    }
    return builder.endVector();
  }

  static startPrecisionConfigVector(builder: flatbuffers.Builder, numElems: number) {
    builder.startVector(4, numElems, 4);
  }

  static endStablehloDotGeneralOptions(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createStablehloDotGeneralOptions(
    builder: flatbuffers.Builder,
    lhsBatchingDimensionsOffset: flatbuffers.Offset,
    rhsBatchingDimensionsOffset: flatbuffers.Offset,
    lhsContractingDimensionsOffset: flatbuffers.Offset,
    rhsContractingDimensionsOffset: flatbuffers.Offset,
    precisionConfigOffset: flatbuffers.Offset,
  ): flatbuffers.Offset {
    StablehloDotGeneralOptions.startStablehloDotGeneralOptions(builder);
    StablehloDotGeneralOptions.addLhsBatchingDimensions(builder, lhsBatchingDimensionsOffset);
    StablehloDotGeneralOptions.addRhsBatchingDimensions(builder, rhsBatchingDimensionsOffset);
    StablehloDotGeneralOptions.addLhsContractingDimensions(builder, lhsContractingDimensionsOffset);
    StablehloDotGeneralOptions.addRhsContractingDimensions(builder, rhsContractingDimensionsOffset);
    StablehloDotGeneralOptions.addPrecisionConfig(builder, precisionConfigOffset);
    return StablehloDotGeneralOptions.endStablehloDotGeneralOptions(builder);
  }
}
