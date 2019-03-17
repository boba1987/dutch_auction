const { port, env } = require('./config/vars');
const app = require('./config/express');
app.listen(port, () => console.info(`server started on port ${port} (${env})`));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
  }

/**
* Exports express
* @public
*/
module.exports = app;