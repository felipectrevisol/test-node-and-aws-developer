import {ServerResponse} from 'node:http';
import {IncomingMessage} from 'node:http';

export default class Router {
    constructor (
        protected readonly path: string,
        protected readonly method: string,
        protected readonly request: IncomingMessage,
        protected readonly response: ServerResponse
    ){}

    public run(): void {}
}