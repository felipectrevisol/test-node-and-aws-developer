import Client from '../Client';
import Address from '../Address';
import Contact from '../Contact';
import {ServerResponse} from 'node:http';
import {IncomingMessage} from 'node:http';
import Finder from '../repository/Finder';
import connection from "../../ConnectionInjection";
import Router, {HttpStatusCode, HttpMethod} from "../../Router";

export default class GetClientRouter extends Router {

    constructor(request: IncomingMessage, response: ServerResponse, path: RegExp, private finder?: Finder) {
        super(path, HttpMethod.GET, request, response);
        this.finder = connection;
    }

    public run(): void {
        const josh: Client | undefined = this.finder!.bring(new Client("Josh", false, new Date(), new Array<Address>(), new Array<Contact>()));
        this.response.writeHead(HttpStatusCode.OK, {"Content-Type": "application/json"});
        this.response.end(JSON.stringify(josh));
    }
}