const moment = require('moment');
const { validationResult } = require('express-validator/check');
const {isAuctionFailed} = require('./utils');
const app = require('../../../index');
const AUCTION_STATE = {
  ACTIVE: 'ACTIVE',
  PENDING: 'PENDING',
  FAILED: 'FAILED',
  FINISHED: 'FINISHED'
};

let auctions = [
  {
      id: 0,
      title: 'Lizard on sale',
      price: 500,
      start: moment().format(),
      end: moment(this.start).add(process.env.AUCTION_DURATION, 'minutes').format(),
      seller: 'user',
      status: AUCTION_STATE.ACTIVE,
      lastUpdate: moment().format(),
      nextUpdate: moment(this.start).add(1, 'minutes').format()
  },
  {
    id: 1,
    title: 'Cat on sale',
    price: 1.5,
    start: moment().format(),
    end: moment(this.start).add(process.env.AUCTION_DURATION, 'minutes').format(),
    seller: 'user',
    status: AUCTION_STATE.PENDING,
  }
];

const auctionPredefinedFields = {
  id: auctions.length,
  start: moment().format(),
  end: moment(this.start).add(process.env.AUCTION_DURATION, 'minutes').format(),
  status: AUCTION_STATE.PENDING,
  lastUpdate: moment().format(),
  nextUpdate: moment(this.start).add(1, 'minutes').format()
};

exports.updateAuctions = async (auctions) => {
  auctions.filter(auction => auction.status === AUCTION_STATE.ACTIVE).forEach((auction) => {
    auctions[auction.id].price = Math.round((auction.price*0.8) * 100) / 100;
    auctions[auction.id].status = isAuctionFailed(auction) ? AUCTION_STATE.FAILED : AUCTION_STATE.ACTIVE;
    auctions[auction.id].lastUpdate = moment().format();
    auctions[auction.id].nextUpdate = moment(this.start).add(1, 'minutes').format();
  });
};

exports.loadPendingAuctions = async (auctions) => {
  auctions.filter(auction => auction.status === AUCTION_STATE.PENDING).forEach((auction) => {
    auctions[auction.id].status = AUCTION_STATE.ACTIVE;
    auctions[auction.id].lastUpdate = moment().format();
    auctions[auction.id].nextUpdate = moment(this.start).add(1, 'minutes').format();
  });
}

exports.getAuctions = () => {
  return auctions;
}


exports.emitAuctions = async () => {
  ws("auctions", auctions);
}

// init websockets
const http = require('http').Server(app);
const io = require('socket.io')(http);
http.listen(4001, () => {
  console.log("listening on *:4001");
});
let connections = [];
io.on("connection", (socket) => {
    console.log("a user connected");
    connections.push(socket);
});

const ws = async (signal, data) => {
  connections.forEach(connection => connection.emit(signal, data));
}

exports.get = (req, res) => {
  let auctionsFiltered;
  let {status} = req.query;
  if (status) {
    auctionsFiltered = auctions.filter(auction => auction.status === status);
  }

  res.json(auctionsFiltered || auctions);
}

exports.create = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  auctions.push({...auctionPredefinedFields, ...req.body});

  res.end();
}