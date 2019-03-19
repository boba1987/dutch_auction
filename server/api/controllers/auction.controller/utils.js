const moment = require('moment');

exports.isAuctionFailed = (auction) => {
  return moment().diff(auction.end, 'minutes') >= 0 || auction.price < 1;
}