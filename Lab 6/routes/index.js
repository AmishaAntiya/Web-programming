const bands = require('./bands');
const albums = require('./albums');



const constructorMethod = (app) => {
  app.use('/bands', bands);
  app.use('/albums',albums);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = constructorMethod;