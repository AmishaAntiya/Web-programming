const userApi = require('./userApi');


const constructorMethod = (app) => {
  app.use('/', userApi);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = constructorMethod;
