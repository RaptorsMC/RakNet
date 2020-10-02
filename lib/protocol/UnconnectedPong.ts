import Identifiers from "./Identifiers.ts";
import OfflinePacket from "./OfflinePacket.ts";

class UnconnectedPing extends OfflinePacket {
     public sendTimestamp!: bigint;
     public serverGUID!: bigint;
     public serverName!: string;

     constructor() {
          super(Identifiers.UnconnectedPong);
     }

     public decode(): void {
          super.readId();
          this.sendTimestamp = this.readLong();
          this.serverGUID = this.readLong();
          this.readMagic();
          this.serverName = this.readRemaining().toString();
     }

     public encode(): void {
          super.writeId();
          this.writeLong(this.sendTimestamp);
          this.writeLong(this.serverGUID);
          this.writeMagic();
          this.writeString(this.serverName);
     }
}
export default UnconnectedPing;