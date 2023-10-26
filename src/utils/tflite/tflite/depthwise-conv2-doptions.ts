// automatically generated by the FlatBuffers compiler, do not modify

import "flatbuffers";

import { ActivationFunctionType } from "@/utils/tflite/tflite/activation-function-type";
import { Padding } from "@/utils/tflite/tflite/padding";

export class DepthwiseConv2DOptions {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): DepthwiseConv2DOptions {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsDepthwiseConv2DOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: DepthwiseConv2DOptions,
  ): DepthwiseConv2DOptions {
    return (obj || new DepthwiseConv2DOptions()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb,
    );
  }

  static getSizePrefixedRootAsDepthwiseConv2DOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: DepthwiseConv2DOptions,
  ): DepthwiseConv2DOptions {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new DepthwiseConv2DOptions()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb,
    );
  }

  padding(): Padding {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset ? this.bb!.readInt8(this.bb_pos + offset) : Padding.SAME;
  }

  strideW(): number {
    const offset = this.bb!.__offset(this.bb_pos, 6);
    return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
  }

  strideH(): number {
    const offset = this.bb!.__offset(this.bb_pos, 8);
    return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
  }

  depthMultiplier(): number {
    const offset = this.bb!.__offset(this.bb_pos, 10);
    return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
  }

  fusedActivationFunction(): ActivationFunctionType {
    const offset = this.bb!.__offset(this.bb_pos, 12);
    return offset ? this.bb!.readInt8(this.bb_pos + offset) : ActivationFunctionType.NONE;
  }

  dilationWFactor(): number {
    const offset = this.bb!.__offset(this.bb_pos, 14);
    return offset ? this.bb!.readInt32(this.bb_pos + offset) : 1;
  }

  dilationHFactor(): number {
    const offset = this.bb!.__offset(this.bb_pos, 16);
    return offset ? this.bb!.readInt32(this.bb_pos + offset) : 1;
  }

  static startDepthwiseConv2DOptions(builder: flatbuffers.Builder) {
    builder.startObject(7);
  }

  static addPadding(builder: flatbuffers.Builder, padding: Padding) {
    builder.addFieldInt8(0, padding, Padding.SAME);
  }

  static addStrideW(builder: flatbuffers.Builder, strideW: number) {
    builder.addFieldInt32(1, strideW, 0);
  }

  static addStrideH(builder: flatbuffers.Builder, strideH: number) {
    builder.addFieldInt32(2, strideH, 0);
  }

  static addDepthMultiplier(builder: flatbuffers.Builder, depthMultiplier: number) {
    builder.addFieldInt32(3, depthMultiplier, 0);
  }

  static addFusedActivationFunction(
    builder: flatbuffers.Builder,
    fusedActivationFunction: ActivationFunctionType,
  ) {
    builder.addFieldInt8(4, fusedActivationFunction, ActivationFunctionType.NONE);
  }

  static addDilationWFactor(builder: flatbuffers.Builder, dilationWFactor: number) {
    builder.addFieldInt32(5, dilationWFactor, 1);
  }

  static addDilationHFactor(builder: flatbuffers.Builder, dilationHFactor: number) {
    builder.addFieldInt32(6, dilationHFactor, 1);
  }

  static endDepthwiseConv2DOptions(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createDepthwiseConv2DOptions(
    builder: flatbuffers.Builder,
    padding: Padding,
    strideW: number,
    strideH: number,
    depthMultiplier: number,
    fusedActivationFunction: ActivationFunctionType,
    dilationWFactor: number,
    dilationHFactor: number,
  ): flatbuffers.Offset {
    DepthwiseConv2DOptions.startDepthwiseConv2DOptions(builder);
    DepthwiseConv2DOptions.addPadding(builder, padding);
    DepthwiseConv2DOptions.addStrideW(builder, strideW);
    DepthwiseConv2DOptions.addStrideH(builder, strideH);
    DepthwiseConv2DOptions.addDepthMultiplier(builder, depthMultiplier);
    DepthwiseConv2DOptions.addFusedActivationFunction(builder, fusedActivationFunction);
    DepthwiseConv2DOptions.addDilationWFactor(builder, dilationWFactor);
    DepthwiseConv2DOptions.addDilationHFactor(builder, dilationHFactor);
    return DepthwiseConv2DOptions.endDepthwiseConv2DOptions(builder);
  }
}
