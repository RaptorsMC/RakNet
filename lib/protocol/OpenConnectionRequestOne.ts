import Identifiers from "./Identifiers.ts";
import OfflinePacket from "./OfflinePacket.ts";
import Buffer from 'https://deno.land/std/node/buffer.ts';

class OpenConnectionRequestOne extends OfflinePacket {
     public mtuSize!: number;
     public protocol!: number;

     constructor() {
          super(Identifiers.OpenConnectionRequest1);
     }

     public decode(): void {
          this.readId();
          this.mtuSize = (Buffer.byteLength(this.buffer) + 1) + 28;
          this.readMagic();
          this.protocol = this.readByte();
     }

     public encode(): void {
          this.writeId();
          this.writeMagic();
          this.writeByte(this.protocol);
          let length: number = (this.mtuSize - this.buffer.length);
          let buf: Buffer = Buffer.alloc(length).fill(0x00);
          this.write(buf);
     }
}
export default OpenConnectionRequestOne;