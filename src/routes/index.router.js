const { Router } = require('express');
const request = require('../libs/axios');

const router = Router();

router.post('/visualize', async (req, res) => {
  const { sqlText } = req.body;
  try {
    const response = await request().post('/sqlflow/generation/sqlflow/graph', {
      sqltext: sqlText 
    });

    res.status(200).send(response.data);
  } catch (err) {
    res.status(400).send(err)
  }

});

module.exports = router;