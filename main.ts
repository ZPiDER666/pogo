import Router from './lib/router.ts';
import Server from './lib/server.ts';
import { Route, RouteHandler, RoutesList, ServerOptions } from './lib/types.ts';

export default {
    server(options: ServerOptions): Server {
        return new Server(options);
    },
    router(route?: RoutesList, options?: Route | RouteHandler, handler?: RouteHandler): Router {
        return new Router(route, options, handler);
    }
};
