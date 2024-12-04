const dotenv = require('dotenv');
dotenv.config();

const config =  {
  port: process.env.PORT,
  token: process.env.TOKEN,
  uid: process.env.UID,
};

module.exports = config;