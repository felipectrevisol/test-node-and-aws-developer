import {Server} from 'node:http';
import {createServer} from 'node:http';
import {ServerResponse} from 'node:http';
import {IncomingMessage} from 'node:http';
import RouteMidleware from "./RouteMiddleware";

const server: Server = createServer((request: IncomingMessage, response: ServerResponse) => {
    const route: RouteMidleware = new RouteMidleware(request, response);
    route.forThisHttpApi().response();
});

const PORT: number = 8000;
const HOST: string = "127.0.0.1";

server.listen(PORT, HOST, () => {
    console.log(`Server HOST: ${HOST} Listening on Port: ${PORT}`);
});