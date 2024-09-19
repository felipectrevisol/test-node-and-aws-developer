import RouterMiddleware from "./RouterMiddleware";

exports.handler = (event: object, context: any) => {
    const route: RouterMiddleware = new RouterMiddleware(event.request, event.response);
    route.httpApi().run();
}