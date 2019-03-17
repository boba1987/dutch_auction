const moment = require('moment');

let auctions = [
  {
      id: 0,
      title: 'Lizard on sale',
      price: 500,
      start: moment().format(),
      end: moment(this.start).add(5, 'minutes').format(),
      seller: 'user'
  }  
];

exports.get = (req, res) => {
    res.json(auctions);
}