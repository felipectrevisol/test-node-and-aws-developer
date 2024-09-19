import {Server} from 'node:http';
import {createServer} from 'node:http';
import {ServerResponse} from 'node:http';
import {IncomingMessage} from 'node:http';
import RouterMiddleware from "./RouterMiddleware";

const server: Server = createServer((request: IncomingMessage, response: ServerResponse) => {
    const route: RouterMiddleware = new RouterMiddleware(request, response);
    route.httpApi().run();
});

const PORT: number = 8000;
const HOST: string = "127.0.0.1";

server.listen(PORT, HOST, () => {
    console.log(`Server HOST: ${HOST} Listening on Port: ${PORT}`);
});