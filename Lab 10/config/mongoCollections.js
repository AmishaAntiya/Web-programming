const { createConn } = require('./mongoConnection');


const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await createConn();
      _col = await db.collection(collection);
    }

    return _col;
  };
};


module.exports = {
  users: getCollectionFn('users')
};