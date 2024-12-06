const request = require('../libs/axios');
const config = require('../config');
const analysisData = require('../service/analysis');

const getHome = function(req, res) {
  res.render('index');
}

const visualize = async function(req, res) {
  const { sqlText } = req.body;
  try {
    const body = new URLSearchParams({
      "userId": String(config.uid),
      "dbvendor": 'dbvmysql',
      "sqltext": sqlText,
      "showRelationType": 'fdd',
      "treatArgumentsInCountFunctionAsDirectDataflow": true,
      "ignoreRecordSet": false,
      "ignoreFunction": true,
      "showConstantTable": false,
      "showTransform": false,
      "columnLevel": true
    });
    
    const { data } = await request().request({
      method: 'POST',
      url: '/sqlflow/generation/sqlflow/graph',
      data: body
    });

    const graphData = analysisData(data.data);
    res.status(200).send(graphData);
  } catch (err) {
    res.status(400).send(err)
  }
}

module.exports = {
  getHome, visualize
}