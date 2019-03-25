const app = require('../../../index');
const {getAuctions} = require('./index');

exports.emitAuctions = async () => {
    ws("auctions", getAuctions());
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