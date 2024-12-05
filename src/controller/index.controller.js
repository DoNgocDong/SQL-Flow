const request = require('../libs/axios');
const config = require('../config');

const getHome = function(req, res) {
  res.render('index');
}

const visualize = async function(req, res) {
  const { sqlText } = req.body;
  try {
    const response = await request().post('/sqlflow/generation/sqlflow/graph', {
      userId: String(config.uid),
      dbvendor: 'dbvmysql',
      sqltext: sqlText 
    });

    res.status(200).send(response.data);
  } catch (err) {
    res.status(400).send(err)
  }
}

module.exports = {
  getHome, visualize
}