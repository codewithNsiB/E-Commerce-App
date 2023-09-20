import express from 'express'
import{
    getAllCategories, sendCategoriesToDB,
} from '../controllers/category.js'
import { verifyToken } from '../middlewares/verifyToken.js'

const router = express.Router()


// post request
router.post('/sendcategories', sendCategoriesToDB)


// get request
router.get('/', getAllCategories)

export default router