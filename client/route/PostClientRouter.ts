import {ServerResponse} from 'node:http';
import {IncomingMessage} from 'node:http';
import Router, {HttpStatusCode, HttpMethod} from "../../Router";

export default class PostClientRouter extends Router {

    constructor(request: IncomingMessage, response: ServerResponse, path: RegExp) {
        super(path, HttpMethod.POST, request, response);
    }

    public run(): void {
        this.response.writeHead(HttpStatusCode.Created, { "Content-Type": "application/json" });
        this.response.end(JSON.stringify({path: `${this.path}`, method: `${this.httpMethod}`}));
    }
}