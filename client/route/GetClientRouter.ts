import {ServerResponse} from 'node:http';
import {IncomingMessage} from 'node:http';
import Router, {HttpStatusCode, HttpMethod} from "../../Router";

export default class GetClientRouter extends Router {

    constructor(request: IncomingMessage, response: ServerResponse, path?: string) {
        super(`client${path === undefined ? "" : path}`, HttpMethod.GET, request, response);
    }

    public run(): void {
        this.response.writeHead(HttpStatusCode.OK, {"Content-Type": "application/json"});
        this.response.end(`{\"${this.path}\": \"Get Josh\"}`);
    }
}