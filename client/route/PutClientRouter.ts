import {ServerResponse} from 'node:http';
import {IncomingMessage} from 'node:http';
import Router, {HttpStatusCode, HttpMethod} from "../../Router";

export default class PutClientRouter extends Router {

    constructor(request: IncomingMessage, response: ServerResponse) {
        super("/client", HttpMethod.PUT, request, response);
    }

    public run(): void {
        this.response.writeHead(HttpStatusCode.OK, { "Content-Type": "application/json" });
        this.response.end("{\"name\": \"Put Josh\"}");
    }
}