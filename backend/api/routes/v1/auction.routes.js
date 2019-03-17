const express = require('express');
const controller = require('../../controllers/auction.controller');
const router = express.Router();
const { checkToken } = require('../../utils/tokenStore');

router
  .route('/')
    .get(checkToken, controller.get)

module.exports = router;