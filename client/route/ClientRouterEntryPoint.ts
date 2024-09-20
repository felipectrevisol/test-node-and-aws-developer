import Router from "../../Router";
import {ServerResponse} from 'node:http';
import {IncomingMessage} from 'node:http';
import EntryPoint from '../../EntryPoint';
import GetClientRouter from "./GetClientRouter";
import PutClientRouter from "./PutClientRouter";
import PostClientRouter from "./PostClientRouter";
import DeleteClienteRouter from "./DeleteClienteRouter";

export default class ClientRouterEntryPoint extends EntryPoint {

    private readonly routers: GetClientRouter[] = [];

    constructor(private request: IncomingMessage, private response: ServerResponse) {
        super();
        {
            this.starHttpGetRouters();
            this.routers.push(new PutClientRouter(this.request, this.response));
            this.routers.push(new PostClientRouter(this.request, this.response));
            this.routers.push(new DeleteClienteRouter(this.request, this.response));
        }
    }

    private starHttpGetRouters(): void {
        this.routers.push(new GetClientRouter(this.request, this.response));
        this.routers.push(new GetClientRouter(this.request, this.response, "/all"));
        this.routers.push(new GetClientRouter(this.request, this.response, "/{name}"));
        this.routers.push(new GetClientRouter(this.request, this.response, "/active"));
        this.routers.push(new GetClientRouter(this.request, this.response, "/birthday"));
    }

    public route(): Router {
        const route: Router | undefined = this.routers.find((route: Router) =>
            route.path.match(this.request.url!.toString()));
        return route === undefined ? this.routers[0] : route;
    }
}