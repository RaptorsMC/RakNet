import Identifiers from "./Identifiers.ts";
import OfflinePacket from "./OfflinePacket.ts";

class UnconnectedPing extends OfflinePacket {
     public sendTimestamp!: bigint;
     public clientGUID!: bigint;

     constructor() {
          super(Identifiers.UnconnectedPing);
     }

     public decode(): void {
          super.readId();
          this.sendTimestamp = this.readLong();
          this.readMagic();
          this.clientGUID = this.readLong();
     }
}
export default UnconnectedPing;