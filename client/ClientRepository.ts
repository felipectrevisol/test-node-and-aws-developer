import Client from "./Client";
import Adder from "./repository_action/Adder";
import Finder from "./repository_action/Finder";
import Remover from "./repository_action/Remover";
import Updater from "./repository_action/Updater";

export default class ClientRepository implements Adder, Finder, Updater, Remover {
    
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