var express = require('express')
var router = express.Router()

const ctrlLocations = require('../controllers/locations')
const ctrlOthers = require('../controllers/others')

/* Get Loations page */
router.get('/', ctrlLocations.homeList)
router.get('/locations', ctrlLocations.locationInfo)
router.get('/locations/review/new', ctrlLocations.addReview)

/* Others page */
router.get('/about', ctrlOthers.about)

module.exports = router
