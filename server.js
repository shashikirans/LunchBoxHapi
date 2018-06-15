'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const routes = require('./routes');

 const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

const swaggerOptions = {
    info: {
            title: 'Test API Documentation',
            version: '0.0.1',
        },
        'documentationPath': '/'
    };

server.register([
    Inert,
    Vision,
    {
        plugin: HapiSwagger,
        options: swaggerOptions
    }
]);

const validate = async function (decoded, request) {
    // do your checks to see if the person is valid
    if (!decoded.id) {
      return { isValid: false };
    }
    else {
      return { isValid: true };
    }
  };

server.route({
    method: 'GET',
    path: '/hello_world',
    config : {
        tags: ['api'],
        auth: false
    },
    handler: (request, h) => {
        return({message: 'Hello, world!'})
        // return 'Hello, world!';
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



const init = async () => {

    await server.register(require('hapi-auth-jwt2'));

    server.auth.strategy('jwt', 'jwt',
    {
      key: '23094820394823948dsafbhasdfhasdbf',          // Never Share your secret key
      validate: validate,            // validate function defined above
      verifyOptions: { algorithms: ['HS256'] } // pick a strong algorithm
    });

   server.auth.default('jwt');

   for (var route in routes) {
    server.route(routes[route]);
   }

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