class Address {
     private _ip: string;
     private _port: number;
     private _version: 4 | 6;

     /**
      * Get the Address instance from a Deno.NetAddr instance
      * @param addr
      */
     public static from(addr: Deno.Addr): Address {
          addr = (addr as Deno.NetAddr);
          let exp: RegExp = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/gm;
          let type: 4|6 = (addr.hostname.match(exp) === null) ? 4 : 6;
          let port: number = addr.port;
          return new Address(addr.hostname, port, type);
     }

     constructor(ip: string, port: number, version: 4|6 = 4) {
          this._ip = ip;
          this._port = port;
          this._version = version;
     }

     /**
      * Gets the ip of the address
      */
     public get ip(): string {
          return this._ip;
     }

     /**
      * Gets the port of the address
      */
     public get port(): number {
          return this._port;
     }

     /**
      * Gets the protocolversion for the address
      */
     public get version(): number {
          return this._version;
     }
     
     /**
      * Gets the protocol for the address as a string 
      * @yields 0.0.0.0v4
      */
     public get protocol(): string {
          return this.ip + 'v' + this.version;
     }

     /**
      * Gets the token for the address.
      * @yields 0.0.0.0:19283
      */
     public get token(): string {
          return this.ip + ':' + this.port;
     }

     /**
      * Converts to deno address for sending.
      */
     public toDenoAddr(): Deno.Addr {
          return {
               hostname: this.ip,
               port: this.port,
               transport: 'udp'
          }
     }
}
export default Address;