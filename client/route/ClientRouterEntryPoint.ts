import Router from "../../Router";
import {ServerResponse} from 'node:http';
import {IncomingMessage} from 'node:http';
import EntryPoint from '../../EntryPoint';
import GetClientRouter from "./GetClientRouter";

export default class ClientRouterEntryPoint extends EntryPoint {

    private readonly routers: GetClientRouter[] = [];

    constructor(private request: IncomingMessage, private response: ServerResponse) {
        super();
        {
            this.starHttpGetRouters();
        }
    }

    private starHttpGetRouters(): void {
        this.routers.push(new GetClientRouter(this.request, this.response, /client+[/]all+/gi));
        this.routers.push(new GetClientRouter(this.request, this.response, /client/gi));
    }

    public route(): Router {
        const router: Router | undefined = this.routers.find((route: Router) =>
            route.path.test(this.request.url!.toString()) &&
            route.httpMethod.toString().includes(this.request.method!.toString()))
        return router === undefined ? this.routers[4] : router;
    }
}