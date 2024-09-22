import {ServerResponse} from 'node:http';
import {IncomingMessage} from 'node:http';
import Repository from "../repository/Repository";
import connection from "../../ConnectionInjection";
import Router, {HttpStatusCode, HttpMethod} from "../../Router";

export default class GetClientRouter extends Router {

    constructor(request: IncomingMessage, response: ServerResponse, path: RegExp, private repository?: Repository) {
        super(path, HttpMethod.GET, request, response);
        this.repository = connection;
    }

    public run(): void {
        this.response.writeHead(HttpStatusCode.OK, {"Content-Type": "application/json"});
        this.response.end(JSON.stringify(this.repository?.clients));
    }
}