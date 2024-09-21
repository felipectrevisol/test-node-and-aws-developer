import Client from "../Client";

export default interface Remover {
    delete(client: Client): void;
}