import Route from "./client/route/Route";
import {ServerResponse} from 'node:http';
import {IncomingMessage} from 'node:http';

export default class RouteMidleware {
    public readonly routes: Route[] = [
        new Route("/client", "GET", this.request, this.response),
        new Route("/client", "PUT", this.request, this.response),
        new Route("/client", "POST", this.request, this.response)
    ];

    constructor(
        private readonly request: IncomingMessage,
        private readonly response: ServerResponse
    ){}

    public forThisHttpApi(): Route {
        return this.routes[0];
    }
}