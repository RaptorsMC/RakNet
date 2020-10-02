import Packet from './Packet.ts';
import Identifiers from './Identifiers.ts';
import type Address from '../utils/Address.ts';

class NewIncomingConnection extends Packet {
     public address!: Address;
     public systemAddresses: Address[];
     public requestTimestamp!: bigint;
     public acceptedTimestamp!: bigint;

     constructor() {
          super(Identifiers.NewIncomingConnection);
          this.systemAddresses = [];
     }

     public decode(): void {
          this.readId();
          this.address = this.readAddress();

          for (let i = 0; i < 20; i++) {
               this.systemAddresses.push(this.readAddress());
          }
          this.requestTimestamp = this.readLong();
          this.acceptedTimestamp = this.readLong();
     }

     public encode(): void {
          this.writeId();
          this.writeAddress(this.address);
          for (let address of this.systemAddresses) {
               this.writeAddress(address);
          }
          this.writeLong(this.requestTimestamp);
          this.writeLong(this.acceptedTimestamp);
     }
}
export default NewIncomingConnection;