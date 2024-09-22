import Client from "../Client";
import Adder from "../repository/Adder";
import {ServerResponse} from 'node:http';
import {IncomingMessage} from 'node:http';
import connection from "../../ConnectionInjection";
import Router, {HttpStatusCode, HttpMethod} from "../../Router";

export default class PostClientRouter extends Router {

    constructor(request: IncomingMessage, response: ServerResponse, path: RegExp, private adder?: Adder) {
        super(path, HttpMethod.POST, request, response);
        this.adder = connection;
    }

    public run(): void {
        let body: any = [];

        this.request.on('data', chunk => body.push(chunk))
            .on('end', () => {
                body = JSON.parse(Buffer.concat(body).toString());
                const client: Client = new Client(body.name, body.active, new Date(body.dateOfBirth), body.address, body.contacts);
                this.adder!.add(client);

            });
        
        this.response.writeHead(HttpStatusCode.Created, {"Content-Type": "application/json"});
        this.response.end(JSON.stringify({"message": "Client add with sucess!"}));

    }
}