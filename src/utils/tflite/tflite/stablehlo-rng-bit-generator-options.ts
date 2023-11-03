// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from "flatbuffers";

import { RngAlgorithm } from "@/utils/tflite/tflite/rng-algorithm";

export class StablehloRngBitGeneratorOptions {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): StablehloRngBitGeneratorOptions {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsStablehloRngBitGeneratorOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: StablehloRngBitGeneratorOptions,
  ): StablehloRngBitGeneratorOptions {
    return (obj || new StablehloRngBitGeneratorOptions()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb,
    );
  }

  static getSizePrefixedRootAsStablehloRngBitGeneratorOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: StablehloRngBitGeneratorOptions,
  ): StablehloRngBitGeneratorOptions {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new StablehloRngBitGeneratorOptions()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb,
    );
  }

  algorithm(): RngAlgorithm {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset ? this.bb!.readInt8(this.bb_pos + offset) : RngAlgorithm.DEFAULT;
  }

  static startStablehloRngBitGeneratorOptions(builder: flatbuffers.Builder) {
    builder.startObject(1);
  }

  static addAlgorithm(builder: flatbuffers.Builder, algorithm: RngAlgorithm) {
    builder.addFieldInt8(0, algorithm, RngAlgorithm.DEFAULT);
  }

  static endStablehloRngBitGeneratorOptions(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createStablehloRngBitGeneratorOptions(
    builder: flatbuffers.Builder,
    algorithm: RngAlgorithm,
  ): flatbuffers.Offset {
    StablehloRngBitGeneratorOptions.startStablehloRngBitGeneratorOptions(builder);
    StablehloRngBitGeneratorOptions.addAlgorithm(builder, algorithm);
    return StablehloRngBitGeneratorOptions.endStablehloRngBitGeneratorOptions(builder);
  }
}
