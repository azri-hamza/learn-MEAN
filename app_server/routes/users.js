var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('you are in the url /users/')
})

module.exports = router
