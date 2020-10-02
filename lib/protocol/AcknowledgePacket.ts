import { BinaryStream } from 'https://raw.githubusercontent.com/RaptorsMC/BinaryUtils/master/mod.ts';
import Packet from './Packet.ts';
const MaxAcknowledgePackets: number = 4096;
class AcknowledgePacket extends Packet {

    // Array containing all sequence numbers of received (ACK)
    // or lost (NACK) packets
    public packets: number[] = []

    public decode(): void {
        this.readId();

        // Clear old cached decoded packets 
        this.packets = [];
        let recordCount = this.readShort();

        for (let i = 0; i < recordCount; i++) {
            let recordType = this.readByte();

            // Range
            if (recordType == 0) {  
                let start = this.readLTriad();
                let end = this.readLTriad();

                for (let pack = start; pack <= end; pack++) {
                    this.packets.push(pack);
                    if (this.packets.length > MaxAcknowledgePackets) {
                        throw new Error('Maximum acknowledgement packets size exceeded');
                    }
                }
            } else {
                // Single
                let packet = this.readLTriad();
                this.packets.push(packet);
            }
        }

    }

    public encode() {
        this.writeId();
        let records: number = 0;
        let stream = new BinaryStream();
        // Sort packets to ensure a correct encoding
        // @ts-ignore
        this.packets.sort((a: number, b: number) => {
            this.packets[a] < this.packets[b];
        })

        if (this.packets.length > 0) {
            let pointer = 1;
            let start = this.packets[0];
            let last = this.packets[0];

            while (pointer < this.packets.length) {
                let current = this.packets[pointer++];
                let diff = current - last;
                if (diff === 1) {
                    last = current;
                } else if (diff > 1) {
                    if (start === last) {
                        stream.writeByte(1);
                        stream.writeLTriad(start);
                        start = last = current;
                    } else {
                        stream.writeByte(0);
                        stream.writeLTriad(start);
                        stream.writeLTriad(last);
                        start = last = current;
                    }
                    records++;
                }
            }

            if (start === last) {
                stream.writeByte(1);
                stream.writeLTriad(start);
            } else {
                stream.writeByte(0);
                stream.writeLTriad(start);
                stream.writeLTriad(last);
            }
            records++;
        }

        this.writeShort(records);
        this.write(stream.buffer);
    }
}
export default AcknowledgePacket;