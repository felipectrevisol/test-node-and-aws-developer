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

export default abstract class Router {

    protected readonly routers: Router[] = [];

    protected constructor(
        public readonly path: RegExp,
        public readonly httpMethod: HttpMethod,
        protected readonly request: IncomingMessage,
        protected readonly response: ServerResponse
    ){}

    public isThisTheRightOne(): boolean {
        return this.path.test(this.request.url!.toString()) &&
        this.httpMethod.toString().includes(this.request.method!.toString());
    }

    public run(): void {}
}