import {ServerResponse} from 'node:http';
import {IncomingMessage} from 'node:http';
import RouterMiddleware from "./RouterMiddleware";

export interface Event {
    request: IncomingMessage,
    response: ServerResponse
}

export default function handler (event: Event, context: any) {
    const route: RouterMiddleware = new RouterMiddleware(event.request, event.response);
    route.httpApi().run();
}