import Adder from "./Adder";
import Finder from "./Finder";
import Client from "../Client";
import Remover from "./Remover";
import Updater from "./Updater";


export default class Repository implements Adder, Finder, Updater, Remover {

    private repository: Client[] = [];

    constructor() {
    }

    public add(client: Client): void {
        this.repository.push(client);
    }

    public get clients(): ReadonlyArray<Client> {
        return this.repository;
    }

    public bring(client: Client): Client | undefined {
        const finded: Client | undefined = this.repository.find(wanted => wanted.name === client.name);
        return finded === undefined ? undefined : finded;
    }

    public alter(client: Client): Updater {
        this.delete(client);
        return this;
    }

    public toThisNewOne(client: Client): boolean {
        this.add(client);
        return true;
    }

    public delete(client: Client): void {
        this.repository = this.repository.filter(wanted =>
            wanted.name !== client.name);
    }
}