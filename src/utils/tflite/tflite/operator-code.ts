// automatically generated by the FlatBuffers compiler, do not modify

import { BuiltinOperator } from "@/utils/tflite/tflite/builtin-operator";

import "flatbuffers";

export class OperatorCode {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): OperatorCode {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsOperatorCode(bb: flatbuffers.ByteBuffer, obj?: OperatorCode): OperatorCode {
    return (obj || new OperatorCode()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  static getSizePrefixedRootAsOperatorCode(
    bb: flatbuffers.ByteBuffer,
    obj?: OperatorCode,
  ): OperatorCode {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new OperatorCode()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  deprecatedBuiltinCode(): number {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset ? this.bb!.readInt8(this.bb_pos + offset) : 0;
  }

  customCode(): string | null;
  customCode(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
  customCode(optionalEncoding?: any): string | Uint8Array | null {
    const offset = this.bb!.__offset(this.bb_pos, 6);
    return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
  }

  version(): number {
    const offset = this.bb!.__offset(this.bb_pos, 8);
    return offset ? this.bb!.readInt32(this.bb_pos + offset) : 1;
  }

  builtinCode(): BuiltinOperator {
    const offset = this.bb!.__offset(this.bb_pos, 10);
    return offset ? this.bb!.readInt32(this.bb_pos + offset) : BuiltinOperator.ADD;
  }

  static startOperatorCode(builder: flatbuffers.Builder) {
    builder.startObject(4);
  }

  static addDeprecatedBuiltinCode(builder: flatbuffers.Builder, deprecatedBuiltinCode: number) {
    builder.addFieldInt8(0, deprecatedBuiltinCode, 0);
  }

  static addCustomCode(builder: flatbuffers.Builder, customCodeOffset: flatbuffers.Offset) {
    builder.addFieldOffset(1, customCodeOffset, 0);
  }

  static addVersion(builder: flatbuffers.Builder, version: number) {
    builder.addFieldInt32(2, version, 1);
  }

  static addBuiltinCode(builder: flatbuffers.Builder, builtinCode: BuiltinOperator) {
    builder.addFieldInt32(3, builtinCode, BuiltinOperator.ADD);
  }

  static endOperatorCode(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createOperatorCode(
    builder: flatbuffers.Builder,
    deprecatedBuiltinCode: number,
    customCodeOffset: flatbuffers.Offset,
    version: number,
    builtinCode: BuiltinOperator,
  ): flatbuffers.Offset {
    OperatorCode.startOperatorCode(builder);
    OperatorCode.addDeprecatedBuiltinCode(builder, deprecatedBuiltinCode);
    OperatorCode.addCustomCode(builder, customCodeOffset);
    OperatorCode.addVersion(builder, version);
    OperatorCode.addBuiltinCode(builder, builtinCode);
    return OperatorCode.endOperatorCode(builder);
  }
}
