import {ServerResponse} from 'node:http';
import {IncomingMessage} from 'node:http';

export enum HttpStatusCode {
    OK = 200,
    Created = 201,
    NotFound = 404
}

export enum HttpMethod {
    GET = "GET",
    PUT = "PUT",
    POST = "POST",
    DELETE = "DELETE"
}
export default class Router {

    protected readonly routers: Router[] = [];

    constructor(
        protected readonly path: string,
        protected readonly method: HttpMethod,
        protected readonly request: IncomingMessage,
        protected readonly response: ServerResponse
    ){}

    public run(): void {}
}