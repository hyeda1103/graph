// automatically generated by the FlatBuffers compiler, do not modify

import "flatbuffers";

import { ActivationFunctionType } from "@/utils/tflite/tflite/activation-function-type";
import { Padding } from "@/utils/tflite/tflite/padding";

export class Conv3DOptions {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): Conv3DOptions {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsConv3DOptions(bb: flatbuffers.ByteBuffer, obj?: Conv3DOptions): Conv3DOptions {
    return (obj || new Conv3DOptions()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  static getSizePrefixedRootAsConv3DOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: Conv3DOptions,
  ): Conv3DOptions {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new Conv3DOptions()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  padding(): Padding {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset ? this.bb!.readInt8(this.bb_pos + offset) : Padding.SAME;
  }

  strideD(): number {
    const offset = this.bb!.__offset(this.bb_pos, 6);
    return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
  }

  strideW(): number {
    const offset = this.bb!.__offset(this.bb_pos, 8);
    return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
  }

  strideH(): number {
    const offset = this.bb!.__offset(this.bb_pos, 10);
    return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
  }

  fusedActivationFunction(): ActivationFunctionType {
    const offset = this.bb!.__offset(this.bb_pos, 12);
    return offset ? this.bb!.readInt8(this.bb_pos + offset) : ActivationFunctionType.NONE;
  }

  dilationDFactor(): number {
    const offset = this.bb!.__offset(this.bb_pos, 14);
    return offset ? this.bb!.readInt32(this.bb_pos + offset) : 1;
  }

  dilationWFactor(): number {
    const offset = this.bb!.__offset(this.bb_pos, 16);
    return offset ? this.bb!.readInt32(this.bb_pos + offset) : 1;
  }

  dilationHFactor(): number {
    const offset = this.bb!.__offset(this.bb_pos, 18);
    return offset ? this.bb!.readInt32(this.bb_pos + offset) : 1;
  }

  static startConv3DOptions(builder: flatbuffers.Builder) {
    builder.startObject(8);
  }

  static addPadding(builder: flatbuffers.Builder, padding: Padding) {
    builder.addFieldInt8(0, padding, Padding.SAME);
  }

  static addStrideD(builder: flatbuffers.Builder, strideD: number) {
    builder.addFieldInt32(1, strideD, 0);
  }

  static addStrideW(builder: flatbuffers.Builder, strideW: number) {
    builder.addFieldInt32(2, strideW, 0);
  }

  static addStrideH(builder: flatbuffers.Builder, strideH: number) {
    builder.addFieldInt32(3, strideH, 0);
  }

  static addFusedActivationFunction(
    builder: flatbuffers.Builder,
    fusedActivationFunction: ActivationFunctionType,
  ) {
    builder.addFieldInt8(4, fusedActivationFunction, ActivationFunctionType.NONE);
  }

  static addDilationDFactor(builder: flatbuffers.Builder, dilationDFactor: number) {
    builder.addFieldInt32(5, dilationDFactor, 1);
  }

  static addDilationWFactor(builder: flatbuffers.Builder, dilationWFactor: number) {
    builder.addFieldInt32(6, dilationWFactor, 1);
  }

  static addDilationHFactor(builder: flatbuffers.Builder, dilationHFactor: number) {
    builder.addFieldInt32(7, dilationHFactor, 1);
  }

  static endConv3DOptions(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createConv3DOptions(
    builder: flatbuffers.Builder,
    padding: Padding,
    strideD: number,
    strideW: number,
    strideH: number,
    fusedActivationFunction: ActivationFunctionType,
    dilationDFactor: number,
    dilationWFactor: number,
    dilationHFactor: number,
  ): flatbuffers.Offset {
    Conv3DOptions.startConv3DOptions(builder);
    Conv3DOptions.addPadding(builder, padding);
    Conv3DOptions.addStrideD(builder, strideD);
    Conv3DOptions.addStrideW(builder, strideW);
    Conv3DOptions.addStrideH(builder, strideH);
    Conv3DOptions.addFusedActivationFunction(builder, fusedActivationFunction);
    Conv3DOptions.addDilationDFactor(builder, dilationDFactor);
    Conv3DOptions.addDilationWFactor(builder, dilationWFactor);
    Conv3DOptions.addDilationHFactor(builder, dilationHFactor);
    return Conv3DOptions.endConv3DOptions(builder);
  }
}