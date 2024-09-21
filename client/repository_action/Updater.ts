import Client from "../Client";

export default interface Updater {
    alter(client: Client): Updater;
    toThisNewOne(client: Client): boolean;
}