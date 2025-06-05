import {Router} from 'express';
import { 
    getAllUsers,
    changeCurrentPassword, 
    getCurrentUser, 
    getUserChannelProfile, 
    getWatchHistory, 
    loginUser, 
    logoutUser, 
    refreshAccessToken, 
    registerUser, 
    updateAccountDetails, 
    deleteUser,
    softDelete,
    restoreUser
} from '../controllers/user.controller.js';

import { verifyJWT } from '../middewares/auth.middleware.js';
const router = Router();

router.route('/getAllUsers').get(getAllUsers)
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)

//secured routes
router.route('/logout').post(verifyJWT,logoutUser)
router.route('/refresh-token').post(refreshAccessToken)
router.route('/changePassword').post(verifyJWT,changeCurrentPassword)
router.route('/updateAccountDetails').patch(verifyJWT,updateAccountDetails)
router.route('/getCurrentUser').get(verifyJWT,getCurrentUser)
router.route('/c/:username',).get(verifyJWT,getUserChannelProfile)
router.route('/history').get(verifyJWT,getWatchHistory)
router.route('/delete').delete(verifyJWT,deleteUser)
router.route('/softDelete/:id').patch(softDelete)
router.route('/restoreUser/:id').patch(restoreUser)





export default router;