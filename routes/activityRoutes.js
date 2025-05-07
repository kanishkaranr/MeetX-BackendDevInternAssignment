const express = require('express');
const {listActivities} = require('../controllers/activityController'); 

const router = express.Router();

router.get('/', listActivities);

module.exports = router;