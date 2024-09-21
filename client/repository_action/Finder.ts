import Client from "./Client";

export default interface Finder {
    bring(client: Client): Client | undefined;
}