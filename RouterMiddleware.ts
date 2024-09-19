import Router from "./Router";
import {ServerResponse} from 'node:http';
import {IncomingMessage} from 'node:http';
import GetClientRouter from "./client/route/GetClientRouter";
import PutClientRouter from "./client/route/PutClientRouter";
import PostClientRouter from "./client/route/PostClientRouter";
import DeleteClienteRouter from "./client/route/DeleteClienteRouter";

export default class RouterMiddleware {
    private readonly routes: Router[] = [
        new GetClientRouter(this.request, this.response),
        new PutClientRouter(this.request, this.response),
        new PostClientRouter(this.request, this.response),
        new DeleteClienteRouter(this.request, this.response)
    ];

    constructor(
        private readonly request: IncomingMessage,
        private readonly response: ServerResponse
    ){}

    public httpApi(): Router {
        return this.routes[3];
    }
}