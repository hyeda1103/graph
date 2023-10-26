// automatically generated by the FlatBuffers compiler, do not modify

import "flatbuffers";

import { ReduceWindowFunction } from "@/utils/tflite/tflite/reduce-window-function";

export class ReduceWindowOptions {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): ReduceWindowOptions {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsReduceWindowOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: ReduceWindowOptions,
  ): ReduceWindowOptions {
    return (obj || new ReduceWindowOptions()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb,
    );
  }

  static getSizePrefixedRootAsReduceWindowOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: ReduceWindowOptions,
  ): ReduceWindowOptions {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new ReduceWindowOptions()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb,
    );
  }

  reduceFunction(): ReduceWindowFunction {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset ? this.bb!.readInt32(this.bb_pos + offset) : ReduceWindowFunction.UNSUPPORTED;
  }

  static startReduceWindowOptions(builder: flatbuffers.Builder) {
    builder.startObject(1);
  }

  static addReduceFunction(builder: flatbuffers.Builder, reduceFunction: ReduceWindowFunction) {
    builder.addFieldInt32(0, reduceFunction, ReduceWindowFunction.UNSUPPORTED);
  }

  static endReduceWindowOptions(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createReduceWindowOptions(
    builder: flatbuffers.Builder,
    reduceFunction: ReduceWindowFunction,
  ): flatbuffers.Offset {
    ReduceWindowOptions.startReduceWindowOptions(builder);
    ReduceWindowOptions.addReduceFunction(builder, reduceFunction);
    return ReduceWindowOptions.endReduceWindowOptions(builder);
  }
}
