// automatically generated by the FlatBuffers compiler, do not modify

import "flatbuffers";

export class AssignVariableOptions {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): AssignVariableOptions {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsAssignVariableOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: AssignVariableOptions,
  ): AssignVariableOptions {
    return (obj || new AssignVariableOptions()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb,
    );
  }

  static getSizePrefixedRootAsAssignVariableOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: AssignVariableOptions,
  ): AssignVariableOptions {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new AssignVariableOptions()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb,
    );
  }

  static startAssignVariableOptions(builder: flatbuffers.Builder) {
    builder.startObject(0);
  }

  static endAssignVariableOptions(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createAssignVariableOptions(builder: flatbuffers.Builder): flatbuffers.Offset {
    AssignVariableOptions.startAssignVariableOptions(builder);
    return AssignVariableOptions.endAssignVariableOptions(builder);
  }
}
