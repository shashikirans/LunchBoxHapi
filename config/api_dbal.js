const PATH = 'http://0.0.0.0:3005';

const corsHeader = {
    origin: ['*'],
    headers: ['Access-Control-Allow-Origin', 'Access-Control-Allow-Headers', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'AuthKey', 'Authorization', 'Email'],
    credentials: true
  };

module.exports = {
    PATH, corsHeader
};