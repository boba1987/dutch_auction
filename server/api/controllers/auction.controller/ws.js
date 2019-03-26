const app = require('../../../index');
const {getAuctions} = require('./index');

const emitAuctions = async () => {
    ws("auctions", getAuctions());
}
  
// init websockets
const http = require('http').Server(app);
const io = require('socket.io')(http);
    http.listen(4001, () => {
        console.log("listening on *:4001");
});

let connections = [];
io.on("connection", (client) => {
    connections.push(client);

    client.on('auction-added', () => {
        emitAuctions();
    });

    client.on('bid-made', () => {
        emitAuctions();
    });

    client.on('error', (err) => {
        console.log('received error from client:', client.id)
        console.log(err)
    });


    client.on('disconnect', () => {
        handleDisconnect(client.id);
    });
});

const handleDisconnect = (id) => {
    connections.splice(connections.findIndex(socket => socket.id === id), 1);
    console.log('client disconnect...', id)
}
  
const ws = async (signal, data) => {
    connections.forEach(connection => connection.emit(signal, data));
}

module.exports = {
    emitAuctions
}