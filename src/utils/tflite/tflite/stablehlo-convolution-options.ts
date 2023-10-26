// automatically generated by the FlatBuffers compiler, do not modify

import "flatbuffers";

import { StablehloPrecisionConfig } from "@/utils/tflite/tflite/stablehlo-precision-config";

export class StablehloConvolutionOptions {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): StablehloConvolutionOptions {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsStablehloConvolutionOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: StablehloConvolutionOptions,
  ): StablehloConvolutionOptions {
    return (obj || new StablehloConvolutionOptions()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb,
    );
  }

  static getSizePrefixedRootAsStablehloConvolutionOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: StablehloConvolutionOptions,
  ): StablehloConvolutionOptions {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new StablehloConvolutionOptions()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb,
    );
  }

  windowStrides(index: number): bigint | null {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset
      ? this.bb!.readInt64(this.bb!.__vector(this.bb_pos + offset) + index * 8)
      : BigInt(0);
  }

  windowStridesLength(): number {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
  }

  padding(index: number): bigint | null {
    const offset = this.bb!.__offset(this.bb_pos, 6);
    return offset
      ? this.bb!.readInt64(this.bb!.__vector(this.bb_pos + offset) + index * 8)
      : BigInt(0);
  }

  paddingLength(): number {
    const offset = this.bb!.__offset(this.bb_pos, 6);
    return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
  }

  lhsDilation(index: number): bigint | null {
    const offset = this.bb!.__offset(this.bb_pos, 8);
    return offset
      ? this.bb!.readInt64(this.bb!.__vector(this.bb_pos + offset) + index * 8)
      : BigInt(0);
  }

  lhsDilationLength(): number {
    const offset = this.bb!.__offset(this.bb_pos, 8);
    return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
  }

  rhsDilation(index: number): bigint | null {
    const offset = this.bb!.__offset(this.bb_pos, 10);
    return offset
      ? this.bb!.readInt64(this.bb!.__vector(this.bb_pos + offset) + index * 8)
      : BigInt(0);
  }

  rhsDilationLength(): number {
    const offset = this.bb!.__offset(this.bb_pos, 10);
    return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
  }

  windowReversal(index: number): boolean | null {
    const offset = this.bb!.__offset(this.bb_pos, 12);
    return offset ? !!this.bb!.readInt8(this.bb!.__vector(this.bb_pos + offset) + index) : false;
  }

  windowReversalLength(): number {
    const offset = this.bb!.__offset(this.bb_pos, 12);
    return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
  }

  windowReversalArray(): Int8Array | null {
    const offset = this.bb!.__offset(this.bb_pos, 12);
    return offset
      ? new Int8Array(
          this.bb!.bytes().buffer,
          this.bb!.bytes().byteOffset + this.bb!.__vector(this.bb_pos + offset),
          this.bb!.__vector_len(this.bb_pos + offset),
        )
      : null;
  }

  inputBatchDimension(): bigint {
    const offset = this.bb!.__offset(this.bb_pos, 14);
    return offset ? this.bb!.readInt64(this.bb_pos + offset) : BigInt("0");
  }

  inputFeatureDimension(): bigint {
    const offset = this.bb!.__offset(this.bb_pos, 16);
    return offset ? this.bb!.readInt64(this.bb_pos + offset) : BigInt("0");
  }

  inputSpatialDimensions(index: number): bigint | null {
    const offset = this.bb!.__offset(this.bb_pos, 18);
    return offset
      ? this.bb!.readInt64(this.bb!.__vector(this.bb_pos + offset) + index * 8)
      : BigInt(0);
  }

  inputSpatialDimensionsLength(): number {
    const offset = this.bb!.__offset(this.bb_pos, 18);
    return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
  }

  kernelInputFeatureDimension(): bigint {
    const offset = this.bb!.__offset(this.bb_pos, 20);
    return offset ? this.bb!.readInt64(this.bb_pos + offset) : BigInt("0");
  }

  kernelOutputFeatureDimension(): bigint {
    const offset = this.bb!.__offset(this.bb_pos, 22);
    return offset ? this.bb!.readInt64(this.bb_pos + offset) : BigInt("0");
  }

  kernelSpatialDimensions(index: number): bigint | null {
    const offset = this.bb!.__offset(this.bb_pos, 24);
    return offset
      ? this.bb!.readInt64(this.bb!.__vector(this.bb_pos + offset) + index * 8)
      : BigInt(0);
  }

  kernelSpatialDimensionsLength(): number {
    const offset = this.bb!.__offset(this.bb_pos, 24);
    return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
  }

  outputBatchDimension(): bigint {
    const offset = this.bb!.__offset(this.bb_pos, 26);
    return offset ? this.bb!.readInt64(this.bb_pos + offset) : BigInt("0");
  }

  outputFeatureDimension(): bigint {
    const offset = this.bb!.__offset(this.bb_pos, 28);
    return offset ? this.bb!.readInt64(this.bb_pos + offset) : BigInt("0");
  }

  outputSpatialDimensions(index: number): bigint | null {
    const offset = this.bb!.__offset(this.bb_pos, 30);
    return offset
      ? this.bb!.readInt64(this.bb!.__vector(this.bb_pos + offset) + index * 8)
      : BigInt(0);
  }

  outputSpatialDimensionsLength(): number {
    const offset = this.bb!.__offset(this.bb_pos, 30);
    return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
  }

  featureGroupCount(): bigint {
    const offset = this.bb!.__offset(this.bb_pos, 32);
    return offset ? this.bb!.readInt64(this.bb_pos + offset) : BigInt("0");
  }

  batchGroupCount(): bigint {
    const offset = this.bb!.__offset(this.bb_pos, 34);
    return offset ? this.bb!.readInt64(this.bb_pos + offset) : BigInt("0");
  }

  precisionConfig(index: number): StablehloPrecisionConfig | null {
    const offset = this.bb!.__offset(this.bb_pos, 36);
    return offset ? this.bb!.readUint32(this.bb!.__vector(this.bb_pos + offset) + index * 4) : 0;
  }

  precisionConfigLength(): number {
    const offset = this.bb!.__offset(this.bb_pos, 36);
    return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
  }

  precisionConfigArray(): Uint32Array | null {
    const offset = this.bb!.__offset(this.bb_pos, 36);
    return offset
      ? new Uint32Array(
          this.bb!.bytes().buffer,
          this.bb!.bytes().byteOffset + this.bb!.__vector(this.bb_pos + offset),
          this.bb!.__vector_len(this.bb_pos + offset),
        )
      : null;
  }

  static startStablehloConvolutionOptions(builder: flatbuffers.Builder) {
    builder.startObject(17);
  }

  static addWindowStrides(builder: flatbuffers.Builder, windowStridesOffset: flatbuffers.Offset) {
    builder.addFieldOffset(0, windowStridesOffset, 0);
  }

  static createWindowStridesVector(
    builder: flatbuffers.Builder,
    data: bigint[],
  ): flatbuffers.Offset {
    builder.startVector(8, data.length, 8);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt64(data[i]!);
    }
    return builder.endVector();
  }

  static startWindowStridesVector(builder: flatbuffers.Builder, numElems: number) {
    builder.startVector(8, numElems, 8);
  }

  static addPadding(builder: flatbuffers.Builder, paddingOffset: flatbuffers.Offset) {
    builder.addFieldOffset(1, paddingOffset, 0);
  }

  static createPaddingVector(builder: flatbuffers.Builder, data: bigint[]): flatbuffers.Offset {
    builder.startVector(8, data.length, 8);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt64(data[i]!);
    }
    return builder.endVector();
  }

  static startPaddingVector(builder: flatbuffers.Builder, numElems: number) {
    builder.startVector(8, numElems, 8);
  }

  static addLhsDilation(builder: flatbuffers.Builder, lhsDilationOffset: flatbuffers.Offset) {
    builder.addFieldOffset(2, lhsDilationOffset, 0);
  }

  static createLhsDilationVector(builder: flatbuffers.Builder, data: bigint[]): flatbuffers.Offset {
    builder.startVector(8, data.length, 8);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt64(data[i]!);
    }
    return builder.endVector();
  }

  static startLhsDilationVector(builder: flatbuffers.Builder, numElems: number) {
    builder.startVector(8, numElems, 8);
  }

  static addRhsDilation(builder: flatbuffers.Builder, rhsDilationOffset: flatbuffers.Offset) {
    builder.addFieldOffset(3, rhsDilationOffset, 0);
  }

  static createRhsDilationVector(builder: flatbuffers.Builder, data: bigint[]): flatbuffers.Offset {
    builder.startVector(8, data.length, 8);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt64(data[i]!);
    }
    return builder.endVector();
  }

  static startRhsDilationVector(builder: flatbuffers.Builder, numElems: number) {
    builder.startVector(8, numElems, 8);
  }

  static addWindowReversal(builder: flatbuffers.Builder, windowReversalOffset: flatbuffers.Offset) {
    builder.addFieldOffset(4, windowReversalOffset, 0);
  }

  static createWindowReversalVector(
    builder: flatbuffers.Builder,
    data: boolean[],
  ): flatbuffers.Offset {
    builder.startVector(1, data.length, 1);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt8(+data[i]!);
    }
    return builder.endVector();
  }

  static startWindowReversalVector(builder: flatbuffers.Builder, numElems: number) {
    builder.startVector(1, numElems, 1);
  }

  static addInputBatchDimension(builder: flatbuffers.Builder, inputBatchDimension: bigint) {
    builder.addFieldInt64(5, inputBatchDimension, BigInt("0"));
  }

  static addInputFeatureDimension(builder: flatbuffers.Builder, inputFeatureDimension: bigint) {
    builder.addFieldInt64(6, inputFeatureDimension, BigInt("0"));
  }

  static addInputSpatialDimensions(
    builder: flatbuffers.Builder,
    inputSpatialDimensionsOffset: flatbuffers.Offset,
  ) {
    builder.addFieldOffset(7, inputSpatialDimensionsOffset, 0);
  }

  static createInputSpatialDimensionsVector(
    builder: flatbuffers.Builder,
    data: bigint[],
  ): flatbuffers.Offset {
    builder.startVector(8, data.length, 8);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt64(data[i]!);
    }
    return builder.endVector();
  }

  static startInputSpatialDimensionsVector(builder: flatbuffers.Builder, numElems: number) {
    builder.startVector(8, numElems, 8);
  }

  static addKernelInputFeatureDimension(
    builder: flatbuffers.Builder,
    kernelInputFeatureDimension: bigint,
  ) {
    builder.addFieldInt64(8, kernelInputFeatureDimension, BigInt("0"));
  }

  static addKernelOutputFeatureDimension(
    builder: flatbuffers.Builder,
    kernelOutputFeatureDimension: bigint,
  ) {
    builder.addFieldInt64(9, kernelOutputFeatureDimension, BigInt("0"));
  }

  static addKernelSpatialDimensions(
    builder: flatbuffers.Builder,
    kernelSpatialDimensionsOffset: flatbuffers.Offset,
  ) {
    builder.addFieldOffset(10, kernelSpatialDimensionsOffset, 0);
  }

  static createKernelSpatialDimensionsVector(
    builder: flatbuffers.Builder,
    data: bigint[],
  ): flatbuffers.Offset {
    builder.startVector(8, data.length, 8);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt64(data[i]!);
    }
    return builder.endVector();
  }

  static startKernelSpatialDimensionsVector(builder: flatbuffers.Builder, numElems: number) {
    builder.startVector(8, numElems, 8);
  }

  static addOutputBatchDimension(builder: flatbuffers.Builder, outputBatchDimension: bigint) {
    builder.addFieldInt64(11, outputBatchDimension, BigInt("0"));
  }

  static addOutputFeatureDimension(builder: flatbuffers.Builder, outputFeatureDimension: bigint) {
    builder.addFieldInt64(12, outputFeatureDimension, BigInt("0"));
  }

  static addOutputSpatialDimensions(
    builder: flatbuffers.Builder,
    outputSpatialDimensionsOffset: flatbuffers.Offset,
  ) {
    builder.addFieldOffset(13, outputSpatialDimensionsOffset, 0);
  }

  static createOutputSpatialDimensionsVector(
    builder: flatbuffers.Builder,
    data: bigint[],
  ): flatbuffers.Offset {
    builder.startVector(8, data.length, 8);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt64(data[i]!);
    }
    return builder.endVector();
  }

  static startOutputSpatialDimensionsVector(builder: flatbuffers.Builder, numElems: number) {
    builder.startVector(8, numElems, 8);
  }

  static addFeatureGroupCount(builder: flatbuffers.Builder, featureGroupCount: bigint) {
    builder.addFieldInt64(14, featureGroupCount, BigInt("0"));
  }

  static addBatchGroupCount(builder: flatbuffers.Builder, batchGroupCount: bigint) {
    builder.addFieldInt64(15, batchGroupCount, BigInt("0"));
  }

  static addPrecisionConfig(
    builder: flatbuffers.Builder,
    precisionConfigOffset: flatbuffers.Offset,
  ) {
    builder.addFieldOffset(16, precisionConfigOffset, 0);
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

  static endStablehloConvolutionOptions(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createStablehloConvolutionOptions(
    builder: flatbuffers.Builder,
    windowStridesOffset: flatbuffers.Offset,
    paddingOffset: flatbuffers.Offset,
    lhsDilationOffset: flatbuffers.Offset,
    rhsDilationOffset: flatbuffers.Offset,
    windowReversalOffset: flatbuffers.Offset,
    inputBatchDimension: bigint,
    inputFeatureDimension: bigint,
    inputSpatialDimensionsOffset: flatbuffers.Offset,
    kernelInputFeatureDimension: bigint,
    kernelOutputFeatureDimension: bigint,
    kernelSpatialDimensionsOffset: flatbuffers.Offset,
    outputBatchDimension: bigint,
    outputFeatureDimension: bigint,
    outputSpatialDimensionsOffset: flatbuffers.Offset,
    featureGroupCount: bigint,
    batchGroupCount: bigint,
    precisionConfigOffset: flatbuffers.Offset,
  ): flatbuffers.Offset {
    StablehloConvolutionOptions.startStablehloConvolutionOptions(builder);
    StablehloConvolutionOptions.addWindowStrides(builder, windowStridesOffset);
    StablehloConvolutionOptions.addPadding(builder, paddingOffset);
    StablehloConvolutionOptions.addLhsDilation(builder, lhsDilationOffset);
    StablehloConvolutionOptions.addRhsDilation(builder, rhsDilationOffset);
    StablehloConvolutionOptions.addWindowReversal(builder, windowReversalOffset);
    StablehloConvolutionOptions.addInputBatchDimension(builder, inputBatchDimension);
    StablehloConvolutionOptions.addInputFeatureDimension(builder, inputFeatureDimension);
    StablehloConvolutionOptions.addInputSpatialDimensions(builder, inputSpatialDimensionsOffset);
    StablehloConvolutionOptions.addKernelInputFeatureDimension(
      builder,
      kernelInputFeatureDimension,
    );
    StablehloConvolutionOptions.addKernelOutputFeatureDimension(
      builder,
      kernelOutputFeatureDimension,
    );
    StablehloConvolutionOptions.addKernelSpatialDimensions(builder, kernelSpatialDimensionsOffset);
    StablehloConvolutionOptions.addOutputBatchDimension(builder, outputBatchDimension);
    StablehloConvolutionOptions.addOutputFeatureDimension(builder, outputFeatureDimension);
    StablehloConvolutionOptions.addOutputSpatialDimensions(builder, outputSpatialDimensionsOffset);
    StablehloConvolutionOptions.addFeatureGroupCount(builder, featureGroupCount);
    StablehloConvolutionOptions.addBatchGroupCount(builder, batchGroupCount);
    StablehloConvolutionOptions.addPrecisionConfig(builder, precisionConfigOffset);
    return StablehloConvolutionOptions.endStablehloConvolutionOptions(builder);
  }
}
