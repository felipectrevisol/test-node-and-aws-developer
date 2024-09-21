import Client from "../Client";
import Address from "../Address";
import Contact from "../Contact";
import {ServerResponse} from 'node:http';
import {IncomingMessage} from 'node:http';
import Adder from "../repository_action/Adder";
import connection from "../../ConnectionInjection";
import Router, {HttpStatusCode, HttpMethod} from "../../Router";

export default class PostClientRouter extends Router {

    constructor(request: IncomingMessage, response: ServerResponse, path: RegExp, private adder?: Adder) {
        super(path, HttpMethod.POST, request, response);
        this.adder = connection;
    }

    public run(): void {
        this.adder!.add(new Client("Josh", false, new Date(), new Array<Address>(), new Array<Contact>()));
        {
            this.response.writeHead(HttpStatusCode.Created, {"Content-Type": "application/json"});
            this.response.end("Client add with sucess!");
        }
    }
}