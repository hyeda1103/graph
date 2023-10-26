// automatically generated by the FlatBuffers compiler, do not modify

import "flatbuffers";

export class SparseToDenseOptions {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): SparseToDenseOptions {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsSparseToDenseOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: SparseToDenseOptions,
  ): SparseToDenseOptions {
    return (obj || new SparseToDenseOptions()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb,
    );
  }

  static getSizePrefixedRootAsSparseToDenseOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: SparseToDenseOptions,
  ): SparseToDenseOptions {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new SparseToDenseOptions()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb,
    );
  }

  validateIndices(): boolean {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset ? !!this.bb!.readInt8(this.bb_pos + offset) : false;
  }

  static startSparseToDenseOptions(builder: flatbuffers.Builder) {
    builder.startObject(1);
  }

  static addValidateIndices(builder: flatbuffers.Builder, validateIndices: boolean) {
    builder.addFieldInt8(0, +validateIndices, +false);
  }

  static endSparseToDenseOptions(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createSparseToDenseOptions(
    builder: flatbuffers.Builder,
    validateIndices: boolean,
  ): flatbuffers.Offset {
    SparseToDenseOptions.startSparseToDenseOptions(builder);
    SparseToDenseOptions.addValidateIndices(builder, validateIndices);
    return SparseToDenseOptions.endSparseToDenseOptions(builder);
  }
}
