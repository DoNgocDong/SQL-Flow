const { Router } = require('express');
const controller = require('../controller/index.controller');

const router = Router();

router.get('/', controller.getHome);
router.post('/visualize', controller.visualize);

module.exports = router;