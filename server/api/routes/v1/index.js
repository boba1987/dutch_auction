const express = require('express');
const userRoutes = require('./user.routes');
const auctionRoutes = require('./auction.routes');

const router = express.Router();

/**
* user route
*/
router.use('/user', userRoutes);
/**
* auction routes
*/
router.use('/auction', auctionRoutes);

module.exports = router;
