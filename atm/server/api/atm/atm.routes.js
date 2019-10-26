const router = require('express').Router();
const { atmAction } = require('../atm/atm.controller');

router.get('/:base64', atmAction);

module.exports = router;
