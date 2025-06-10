import {Router} from 'express'
import {createUser, deleteUser, fetchUsers, showUser, updatedUser} from '../controllers/UserController.js'
const router = Router()


router.post('/',createUser)
router.put('/:id',updatedUser)
router.get('/',fetchUsers)
router.get('/:id',showUser)
router.delete('/:id',deleteUser)

export default router;