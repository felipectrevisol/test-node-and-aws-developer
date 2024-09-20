import {ServerResponse} from 'node:http';
import {IncomingMessage} from 'node:http';
import RouterMiddleware from "./RouterMiddleware";

interface Event {
    request: IncomingMessage,
    response: ServerResponse
}

exports.handler = (event: Event, context: any) => {
    const route: RouterMiddleware = new RouterMiddleware(event.request, event.response);
    route.httpApi().run();
}