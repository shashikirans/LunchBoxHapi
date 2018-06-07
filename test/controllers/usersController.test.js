'use strict';
const models = require('../../models');
const routes = require('../../routes');

const Hapi = require('hapi');
const Code = require('code');
// Lab test runner
const Lab = require('lab');
// instance of our test suite
const lab = exports.lab = Lab.script();
const server = require('../../server.js');

// var server = new Hapi.Server(8080);

// const server = new Hapi.Server({
//     port: 3000,
//     host: 'localhost'
// });

lab.test("main endpoint lists usernames on the network", async () => {
    var options = {
        method: "GET",
        url: "/api/users"
    };
 
    const response = await server.inject(options);
    let result = response.result;

    Code.expect(response.statusCode).to.equal(200);
    Code.expect(result["user"]).to.be.instanceof(Array);
    Code.expect(result["user"]).to.have.length(0);
});

lab.test("Creating valid user", async () => {
    var options = {
        method: "POST",
        url: "/api/users/create",
        payload: {
            first_name: "Test",
            last_name: "User",
            contact_number: '9964832025',
            email: "tuser@qwinix.io",
            password: "test1",
            account_status: true
        }
    };
 
    const response = await server.inject(options);
    let result = response.result;
    let payload = options.payload;

    console.log(result);

    Code.expect(response.statusCode).to.equal(200);
    // Code.expect(result["user"]).to.be.instanceof(Array);
    // Code.expect(result["user"]).to.have.length(0);
});