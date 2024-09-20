import Router from "./Router";
import EntryPoint from "./EntryPoint";
import {ServerResponse} from 'node:http';
import {IncomingMessage} from 'node:http';
import ClientRouterEntryPoint from "./client/route/ClientRouterEntryPoint";

export default class ApiGateway {
    private readonly entryPoints: EntryPoint[] = [];

    constructor(private readonly request: IncomingMessage, private readonly response: ServerResponse) {
        this.entryPoints.push(new ClientRouterEntryPoint(this.request, this.response));
    }

    public http(): Router {
        return this.entryPoints[0].route();
    }
}