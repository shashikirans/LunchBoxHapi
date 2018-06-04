'use strict';
// Hapi framework
const Hapi = require('hapi');
const Code = require('code');
// Lab test runner
const Lab = require('lab');
// instance of our test suite
const lab = exports.lab = Lab.script();

const server = new Hapi.Server({
    port: 8080,
    host: 'localhost'
});


lab.test('Ensure that the server exists', () => {
    Code.expect(server).to.exist(); 
});

lab.test('Simple example of a bad request', async () => {

    // What we will inject into the server
    const toInject = {
        method: 'POST',
        url: '/hello?item=101', // 101 > 100, this will fail !!
        payload: { alive: true }
    };
    const res = await server.inject(toInject);
    Code.expect(res.statusCode).to.equal(404);
});