const express = require('express')
const router = express.Router()
const {createShortId,redirecttooriginal,getanalytics,ejstemplate} = require('../controllers/url')

router.post('/',createShortId)

// router.get('/test',ejstemplate)

router.get('/:id',redirecttooriginal)
router.get('/analytics/:id',getanalytics)
module.exports = router



