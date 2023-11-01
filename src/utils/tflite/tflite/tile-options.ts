// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from "flatbuffers";

export class TileOptions {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): TileOptions {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsTileOptions(bb: flatbuffers.ByteBuffer, obj?: TileOptions): TileOptions {
    return (obj || new TileOptions()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  static getSizePrefixedRootAsTileOptions(
    bb: flatbuffers.ByteBuffer,
    obj?: TileOptions,
  ): TileOptions {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new TileOptions()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  static startTileOptions(builder: flatbuffers.Builder) {
    builder.startObject(0);
  }

  static endTileOptions(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createTileOptions(builder: flatbuffers.Builder): flatbuffers.Offset {
    TileOptions.startTileOptions(builder);
    return TileOptions.endTileOptions(builder);
  }
}
