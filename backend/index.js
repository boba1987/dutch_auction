const { port, env } = require('./config/vars');
const app = require('./config/express');
// listen to requests
app.listen(port, () => console.info(`server started on port ${port} (${env})`));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
  }

/**
* Exports express
* @public
*/
module.exports = app;