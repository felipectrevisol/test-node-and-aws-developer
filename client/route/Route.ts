import {ServerResponse} from 'node:http';
import {IncomingMessage} from 'node:http';

export default  class Route {
    constructor (
        public readonly path: string,
        public readonly method: string,
        public readonly request: IncomingMessage,
        private readonly serverResponse: ServerResponse
    ) {}

    public response(): void {
        this.serverResponse.writeHead(200, { "Content-Type": "application/json" });
        this.serverResponse.end("{\"name\": \"Josh\"}");
    }
}