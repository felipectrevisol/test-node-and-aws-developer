import Client from "./Client";

export default class ClientRepository {
    
    private repository: Client[] = [];

    constructor() {
    }

    add(client: Client) {
        this.repository.push(client);
    }

    get clients(): ReadonlyArray<Client> {
        return this.repository;
    }

    bring(client: Client): Client | undefined {
        const finded: Client | undefined = this.repository.find(wanted => wanted.name === client.name);
        return finded === undefined ? undefined : finded;
    }

    alter(client: Client): ClientRepository {
        this.delete(client);
        return this;
    }

    toThisNewOne(client: Client): boolean {
        this.add(client);
        return true;
    }

    delete(client: Client): void {
        this.repository = this.repository.filter(wanted =>
            wanted.name !== client.name);
    }
}