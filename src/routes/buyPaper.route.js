const express = require('express');
const router = express.Router();
const buyPageController = require('../controller/buyPage.controller')



router.patch('/buy-paper', buyPageController.purchasePaper);



module.exports = router;