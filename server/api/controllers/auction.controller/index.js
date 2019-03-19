const moment = require('moment');
const { validationResult } = require('express-validator/check');
const {isAuctionFailed} = require('./utils');
const AUCTION_STATE = {
  ACTIVE: 'ACTIVE',
  PENDING: 'PENDING',
  FAILED: 'FAILED'
};

let auctions = [
  {
      id: 0,
      title: 'Lizard on sale',
      price: 500,
      start: moment().format(),
      end: moment(this.start).add(process.env.AUCTION_DURATION, 'minutes').format(),
      seller: 'user',
      status: AUCTION_STATE.ACTIVE
  },
  {
    id: 1,
    title: 'Cat on sale',
    price: 1.5,
    start: moment().format(),
    end: moment(this.start).add(process.env.AUCTION_DURATION, 'minutes').format(),
    seller: 'user',
    status: AUCTION_STATE.PENDING
  }
];

const auctionPredefinedFields = {
  id: auctions.length,
  start: moment().format(),
  end: moment(this.start).add(process.env.AUCTION_DURATION, 'minutes').format(),
  status: AUCTION_STATE.PENDING
};

exports.updateAuctions = async (auctions) => {
  auctions.filter(auction => auction.status === AUCTION_STATE.ACTIVE).forEach((auction) => {
    auctions[auction.id].price = Math.round((auction.price*0.8) * 100) / 100;
    auctions[auction.id].status = isAuctionFailed(auction) ? AUCTION_STATE.FAILED : AUCTION_STATE.ACTIVE;
  });
};

exports.loadPendingAuctions = async (auctions) => {
  auctions.filter(auction => auction.status === AUCTION_STATE.PENDING).forEach((auction) => {
    auctions[auction.id].status = AUCTION_STATE.ACTIVE;
  });
}

exports.getAuctions = () => {
  return auctions;
}

exports.get = (req, res) => {
  res.json(auctions);
}

exports.create = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  auctions.push({...auctionPredefinedFields, ...req.body});

  res.end();
}