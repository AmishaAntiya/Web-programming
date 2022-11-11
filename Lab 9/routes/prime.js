const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('prime/index', {});
});

module.exports = router;