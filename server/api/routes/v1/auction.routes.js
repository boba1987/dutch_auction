const express = require('express');
const controller = require('../../controllers/auction.controller');
const router = express.Router();
const { checkToken } = require('../../utils/tokenStore');
const { checkSchema } = require('express-validator/check');
const auctionSchema = {
  title: {
    isLength: {
      errorMessage: 'title should be at least 5 chars long',
      // Multiple options would be expressed as an array
      options: { min: 5 }
    }
  },
  price: {
    errorMessage: 'price has to be a valid number grater than 1',
    isInt: true,
    isLength: {
      errorMessage: 'price required',
      // Multiple options would be expressed as an array
      options: { min: 1 }
    },
    custom: {
      options: (value) => {
        if (value <= 1) return false;
        return true;
      }
    }
  }
};

router
  .route('/')
    .post(checkToken, checkSchema(auctionSchema), controller.create)
    .get(checkToken, controller.get)

module.exports = router;