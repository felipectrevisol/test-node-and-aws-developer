import {ServerResponse} from 'node:http';
import {IncomingMessage} from 'node:http';
import Router, {HttpStatusCode, HttpMethod} from "../../Router";

export default class GetClientRouter extends Router {

    constructor(request: IncomingMessage, response: ServerResponse) {
        super("/client", HttpMethod.GET, request, response);
        {
            this.routers.push(new GetClientRouter("/{name}", HttpMethod.GET, request, response));
            this.routers.push(new GetClientRouter("/all/{active}", HttpMethod.GET, request, response));
        }
    }

    public run(): void {
        this.response.writeHead(HttpStatusCode.OK, {"Content-Type": "application/json"});
        this.response.end("{\"name\": \"Get Josh\"}");
    }
}