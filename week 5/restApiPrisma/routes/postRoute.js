import {Router} from 'express'
import {createPost,fetchPosts,showPost,deletePost,updatedPost, searchPost} from '../controllers/PostController.js'
const router = Router()


router.post('/',createPost)

router.get('/search',searchPost)

router.put('/:id',updatedPost)
router.get('/',fetchPosts)
router.get('/:id',showPost)
router.delete('/:id',deletePost)



export default router;