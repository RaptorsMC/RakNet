import type Address from "../utils/Address.ts";
import Identifiers from "./Identifiers.ts";
import OfflinePacket from "./OfflinePacket.ts";

class OpenConnectionReplyTwo extends OfflinePacket {
     public serverGUID!: bigint;
     public clientAddress!: Address;
     public mtuSize!: number;

     constructor() {
          super(Identifiers.OpenConnectionReply2);
     }

     public decode(): void {
          this.readId();
          this.readMagic();
          this.serverGUID = this.readLong();
          this.clientAddress = this.readAddress();
          this.mtuSize = this.readShort();
     }

     public encode(): void {
          this.writeId();
          this.writeMagic();
          this.writeLong(this.serverGUID);
          this.writeAddress(this.clientAddress);
          this.writeShort(this.mtuSize);
          this.writeByte(0);
     }
}
export default OpenConnectionReplyTwo;