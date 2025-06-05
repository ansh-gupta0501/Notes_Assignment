const express = require('express')
const router = express.Router()
const {handleCreateUser,handleLoginUser} = require('../controllers/user')
router.post('/',handleCreateUser)
router.post('/login',handleLoginUser)
module.exports = router