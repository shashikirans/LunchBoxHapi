'use strict';

const Hapi = require('hapi');
const routes = require('./routes');
let server;

if(process.env.NODE_ENV === 'development') {
    server = Hapi.server({
        port: 3001,
        host: 'localhost'
    });
  } else if (process.env.NODE_ENV === 'test'){
    server = Hapi.server({
        port: 3002,
        host: 'localhost'
    });
  }

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return 'Hello, world!';
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: (request, h) => {

        // request.log(['a', 'name'], "Request name");
        // or
        request.logger.info('In handler %s', request.path);

        return `Hello, ${encodeURIComponent(request.params.name)}!`;
    }
});

for (var route in routes) {
    server.route(routes[route]);
}

const init = async () => {
    await server.register({
        plugin: require('hapi-pino'),
        options: {
            prettyPrint: false,
            logEvents: ['response']
        }
    });
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
module.exports = server;