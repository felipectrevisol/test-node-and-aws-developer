import Router from "./Router";

export default abstract class EntryPoint {
    public abstract route(): Router;
}