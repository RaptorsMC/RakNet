import Identifiers from "./Identifiers.ts";
import OfflinePacket from "./OfflinePacket.ts";
import { Buffer } from 'https://deno.land/std@0.83.0/node/buffer.ts';
import type Address from "../utils/Address.ts";

class OpenConnectionRequestTwo extends OfflinePacket {
     public serverAddress!: Address;
     public mtuSize!: number;
     public clientGUID!: bigint;

     constructor() {
          super(Identifiers.OpenConnectionRequest2);
     }

     public read(): void {
          super.read();
          this.readMagic();
          this.serverAddress = this.readAddress();
          this.mtuSize = this.readShort();
          this.clientGUID = this.readLong();
     }

     public write(): void {
          super.write();
          this.writeMagic();
          this.writeAddress(this.serverAddress);
          this.writeShort(this.mtuSize);
          this.writeLong(this.clientGUID);
     }
}
export default OpenConnectionRequestTwo;