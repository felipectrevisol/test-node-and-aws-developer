import Client from "../Client";

export default interface Adder {
    add(client: Client): void;
}