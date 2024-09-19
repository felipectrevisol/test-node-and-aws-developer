import Router from "../../Router";
import {ServerResponse} from 'node:http';
import {IncomingMessage} from 'node:http';

export default class GetClientRouter extends Router {

    constructor(request: IncomingMessage, response: ServerResponse) {
        super("/client", "GET", request, response);
    }

    public run(): void {
        this.response.writeHead(200, { "Content-Type": "application/json" });
        this.response.end("{\"name\": \"Get Josh\"}");
    }
}