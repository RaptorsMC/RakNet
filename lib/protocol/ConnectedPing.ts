import Packet from './Packet.ts';
import Identifiers from './Identifiers.ts';

class ConnectedPing extends Packet {
     private _clientTimestamp!: bigint;

     constructor() {
          super(Identifiers.ConnectedPing);
     }

     public decode(): void {
          this.readId()
          this._clientTimestamp = this.readLong();
     }

     public encode(): void {
          this.writeId();
          this.writeLong(this._clientTimestamp);
     }

     public get clientTimestamp(): bigint {
          return this._clientTimestamp;
     }

     public set clientTimestamp(clientTimestamp) {
          this._clientTimestamp = clientTimestamp;
     }

}
export default ConnectedPing;