const express = require('express');
const config = require('./config');

const app = express();
const port = config.port;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

console.log()

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
