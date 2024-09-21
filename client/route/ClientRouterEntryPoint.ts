import Router from "../../Router";
import {ServerResponse} from 'node:http';
import {IncomingMessage} from 'node:http';
import EntryPoint from '../../EntryPoint';
import GetClientRouter from "./GetClientRouter";
import PutClientRouter from "./PutClientRouter";
import PostClientRouter from "./PostClientRouter";
import NotFound404Router from "../../NotFound404Router";
import DeleteClienteRouter from "./DeleteClienteRouter";

export default class ClientRouterEntryPoint extends EntryPoint {

    private readonly routers: GetClientRouter[] = [];

    constructor(private request: IncomingMessage, private response: ServerResponse) {
        super();
        {
            this.routers.push(new GetClientRouter(this.request, this.response, /client+[/]all+/gi));
            this.routers.push(new GetClientRouter(this.request, this.response, /client/gi));
            this.routers.push(new PutClientRouter(this.request, this.response, /client/gi));
            this.routers.push(new PostClientRouter(this.request, this.response, /client/gi));
            this.routers.push(new DeleteClienteRouter(this.request, this.response, /client/gi));
        }
    }

    public route(): Router {
        const router: Router | undefined = this.routers.find((route: Router) => route.isThisTheRightOne());
        return router === undefined ? new NotFound404Router(this.request, this.response) : router;
    }
}