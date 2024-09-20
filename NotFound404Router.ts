import {ServerResponse} from 'node:http';
import {IncomingMessage} from 'node:http';
import Router, {HttpMethod, HttpStatusCode} from "./Router";

export default class NotFound404Router extends Router {

    constructor(request: IncomingMessage, response: ServerResponse) {
        super(new RegExp("404"), HttpMethod.GET, request, response);
    }

    public run(): void {
        this.response.writeHead(HttpStatusCode.NotFound, {"Content-Type": "application/json"});
        this.response.end(`{\"404\": \"Resource Not Found.\", "go-to": \[\"client/\", \"client/all\"]}`);
    }
}