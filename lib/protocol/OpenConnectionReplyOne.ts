import Identifiers from "./Identifiers.ts";
import OfflinePacket from "./OfflinePacket.ts";

class OpenConnectionReplyOne extends OfflinePacket {
     public serverGUID!: bigint;
     public mtuSize!: number;

     constructor() {
          super(Identifiers.OpenConnectionReply1);
     }

     public decode(): void {
          this.readId();
          this.readMagic();
          this.serverGUID = this.readLong();
          this.readByte();
          this.mtuSize = this.readShort();
     }

     public encode(): void {
          this.writeId();
          this.writeMagic();
          this.writeLong(this.serverGUID);
          this.writeByte(0);
          this.writeShort(this.mtuSize);
     }
}
export default OpenConnectionReplyOne;