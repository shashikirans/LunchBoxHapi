'use strict';

const Hapi = require('hapi');
const routes = require('./routes');
var server;

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

  console.log(process.env.NODE_ENV) // dev
console.log(process.env.NODE_ENV === 'dev') // false
console.log(process.env.NODE_ENV.length)

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
module.exports = server;