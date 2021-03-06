import {
    React,
    ReactDOMServer,
    status,
    statusText
} from '../dependencies.js';
import Response from './response.js';

const respond = (source) => {
    const response = Response.wrap(source);

    if (React.isValidElement(response.body)) {
        response.body = ReactDOMServer.renderToStaticMarkup(response.body);
    }
    if (typeof response.body === 'string') {
        if (!response.headers.has('content-type')) {
            response.headers.set('content-type', 'text/html; charset=utf-8');
        }
    }
    else if (response.body === null || (source instanceof Response && response.body === undefined)) {
        response.body = '';
    }
    else if (response.body instanceof Deno.File || response.body instanceof Deno.Buffer || response.body instanceof Uint8Array) {
        return response;
    }
    else if (['object', 'number', 'boolean'].includes(typeof response.body)) {
        if (!response.headers.has('content-type')) {
            response.headers.set('content-type', 'application/json; charset=utf-8');
        }
        response.body = JSON.stringify(response.body);
    }
    else {
        response.status = status.InternalServerError;
        response.headers.set('content-type', 'application/json; charset=utf-8');
        response.body = JSON.stringify({
            error   : statusText.get(status.InternalServerError),
            message : statusText.get(status.InternalServerError),
            status  : status.InternalServerError
        });
    }

    return response;
};

export default respond;
