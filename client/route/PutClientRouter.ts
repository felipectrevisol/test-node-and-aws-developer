import Router from "../../Router";
import {ServerResponse} from 'node:http';
import {IncomingMessage} from 'node:http';

export default class PutClientRouter extends Router {

    constructor(request: IncomingMessage, response: ServerResponse) {
        super("/client", "PUT", request, response);
    }

    public run(): void {
        this.response.writeHead(200, { "Content-Type": "application/json" });
        this.response.end("{\"name\": \"Put Josh\"}");
    }
}