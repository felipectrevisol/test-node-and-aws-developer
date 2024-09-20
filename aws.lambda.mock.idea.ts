import ApiGateway from "./ApiGateway";
import {ServerResponse} from 'node:http';
import {IncomingMessage} from 'node:http';

export interface Event {
    request: IncomingMessage,
    response: ServerResponse
}

export default function handler (event: Event, context: any) {
    const api: ApiGateway = new ApiGateway(event.request, event.response);
    api.http().run();
}