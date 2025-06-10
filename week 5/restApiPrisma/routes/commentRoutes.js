import {Router} from 'express'
import {createComment,deleteComment,fetchComments,showComment,updatedComment} from '../controllers/CommentController.js'
const router = Router()


router.post('/',createComment)
router.put('/:id',updatedComment)
router.get('/',fetchComments)
router.get('/:id',showComment)
router.delete('/:id',deleteComment)

export default router;