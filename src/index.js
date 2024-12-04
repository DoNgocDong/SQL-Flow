const express = require('express');
const config = require('./config');
const router = require('./routes/index.router');

const app = express();
const port = config.port;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(router);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
