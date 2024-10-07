const express = require('express');
const router = express.Router();

const { getAvailableCountries, getCountryInfo } = require('../controllers/countryController');

router.route('/').get(getAvailableCountries);
router.route('/:countryCode').get(getCountryInfo);


module.exports = router;