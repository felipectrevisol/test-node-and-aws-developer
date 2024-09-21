import {ServerResponse} from 'node:http';
import {IncomingMessage} from 'node:http';
import Router, {HttpMethod, HttpStatusCode} from "./Router";

export default class NotFound404Router extends Router {

    constructor(request: IncomingMessage, response: ServerResponse) {
        super(new RegExp("404"), HttpMethod.GET, request, response);
    }

    public run(): void {
        const body: string = JSON.stringify({
            404: "Resource Not Found.",
            GoTo: [
                "http:localhost:client/",
                "http:localhost:client/all",
            ]
        });

        this.response.writeHead(HttpStatusCode.NotFound, {"Content-Type": "application/json"});
        this.response.end(body);
    }
}