import {Server} from 'node:http';
import {createServer} from 'node:http';
import {ServerResponse} from 'node:http';
import {IncomingMessage} from 'node:http';
import handler, {Event} from "./aws.lambda.mock.idea";

const server: Server = createServer((request: IncomingMessage, response: ServerResponse) => {
    const event: Event = {request: request, response: response};
    const context: any = null;
    handler(event, context);
});

const PORT: number = 8000;
const HOST: string = "127.0.0.1";

server.listen(PORT, HOST, () => {
    console.log(`Server HOST: ${HOST} Listening on Port: ${PORT}`);
});