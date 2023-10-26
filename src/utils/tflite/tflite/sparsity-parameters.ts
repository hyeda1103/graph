// automatically generated by the FlatBuffers compiler, do not modify

import "flatbuffers";

import { DimensionMetadata } from "@/utils/tflite/tflite/dimension-metadata";

export class SparsityParameters {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): SparsityParameters {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsSparsityParameters(
    bb: flatbuffers.ByteBuffer,
    obj?: SparsityParameters,
  ): SparsityParameters {
    return (obj || new SparsityParameters()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb,
    );
  }

  static getSizePrefixedRootAsSparsityParameters(
    bb: flatbuffers.ByteBuffer,
    obj?: SparsityParameters,
  ): SparsityParameters {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new SparsityParameters()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb,
    );
  }

  traversalOrder(index: number): number | null {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset ? this.bb!.readInt32(this.bb!.__vector(this.bb_pos + offset) + index * 4) : 0;
  }

  traversalOrderLength(): number {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
  }

  traversalOrderArray(): Int32Array | null {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset
      ? new Int32Array(
          this.bb!.bytes().buffer,
          this.bb!.bytes().byteOffset + this.bb!.__vector(this.bb_pos + offset),
          this.bb!.__vector_len(this.bb_pos + offset),
        )
      : null;
  }

  blockMap(index: number): number | null {
    const offset = this.bb!.__offset(this.bb_pos, 6);
    return offset ? this.bb!.readInt32(this.bb!.__vector(this.bb_pos + offset) + index * 4) : 0;
  }

  blockMapLength(): number {
    const offset = this.bb!.__offset(this.bb_pos, 6);
    return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
  }

  blockMapArray(): Int32Array | null {
    const offset = this.bb!.__offset(this.bb_pos, 6);
    return offset
      ? new Int32Array(
          this.bb!.bytes().buffer,
          this.bb!.bytes().byteOffset + this.bb!.__vector(this.bb_pos + offset),
          this.bb!.__vector_len(this.bb_pos + offset),
        )
      : null;
  }

  dimMetadata(index: number, obj?: DimensionMetadata): DimensionMetadata | null {
    const offset = this.bb!.__offset(this.bb_pos, 8);
    return offset
      ? (obj || new DimensionMetadata()).__init(
          this.bb!.__indirect(this.bb!.__vector(this.bb_pos + offset) + index * 4),
          this.bb!,
        )
      : null;
  }

  dimMetadataLength(): number {
    const offset = this.bb!.__offset(this.bb_pos, 8);
    return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
  }

  static startSparsityParameters(builder: flatbuffers.Builder) {
    builder.startObject(3);
  }

  static addTraversalOrder(builder: flatbuffers.Builder, traversalOrderOffset: flatbuffers.Offset) {
    builder.addFieldOffset(0, traversalOrderOffset, 0);
  }

  static createTraversalOrderVector(
    builder: flatbuffers.Builder,
    data: number[] | Int32Array,
  ): flatbuffers.Offset;
  /**
   * @deprecated This Uint8Array overload will be removed in the future.
   */
  static createTraversalOrderVector(
    builder: flatbuffers.Builder,
    data: number[] | Uint8Array,
  ): flatbuffers.Offset;
  static createTraversalOrderVector(
    builder: flatbuffers.Builder,
    data: number[] | Int32Array | Uint8Array,
  ): flatbuffers.Offset {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt32(data[i]!);
    }
    return builder.endVector();
  }

  static startTraversalOrderVector(builder: flatbuffers.Builder, numElems: number) {
    builder.startVector(4, numElems, 4);
  }

  static addBlockMap(builder: flatbuffers.Builder, blockMapOffset: flatbuffers.Offset) {
    builder.addFieldOffset(1, blockMapOffset, 0);
  }

  static createBlockMapVector(
    builder: flatbuffers.Builder,
    data: number[] | Int32Array,
  ): flatbuffers.Offset;
  /**
   * @deprecated This Uint8Array overload will be removed in the future.
   */
  static createBlockMapVector(
    builder: flatbuffers.Builder,
    data: number[] | Uint8Array,
  ): flatbuffers.Offset;
  static createBlockMapVector(
    builder: flatbuffers.Builder,
    data: number[] | Int32Array | Uint8Array,
  ): flatbuffers.Offset {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt32(data[i]!);
    }
    return builder.endVector();
  }

  static startBlockMapVector(builder: flatbuffers.Builder, numElems: number) {
    builder.startVector(4, numElems, 4);
  }

  static addDimMetadata(builder: flatbuffers.Builder, dimMetadataOffset: flatbuffers.Offset) {
    builder.addFieldOffset(2, dimMetadataOffset, 0);
  }

  static createDimMetadataVector(
    builder: flatbuffers.Builder,
    data: flatbuffers.Offset[],
  ): flatbuffers.Offset {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addOffset(data[i]!);
    }
    return builder.endVector();
  }

  static startDimMetadataVector(builder: flatbuffers.Builder, numElems: number) {
    builder.startVector(4, numElems, 4);
  }

  static endSparsityParameters(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createSparsityParameters(
    builder: flatbuffers.Builder,
    traversalOrderOffset: flatbuffers.Offset,
    blockMapOffset: flatbuffers.Offset,
    dimMetadataOffset: flatbuffers.Offset,
  ): flatbuffers.Offset {
    SparsityParameters.startSparsityParameters(builder);
    SparsityParameters.addTraversalOrder(builder, traversalOrderOffset);
    SparsityParameters.addBlockMap(builder, blockMapOffset);
    SparsityParameters.addDimMetadata(builder, dimMetadataOffset);
    return SparsityParameters.endSparsityParameters(builder);
  }
}
