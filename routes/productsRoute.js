import { Router } from 'express'
import ProductController from '../controllers/productsController.js'
const productController = new ProductController()

const router = new Router()

router.get('/', productController.getProductsController)
router.get('/:id', productController.getProductsByIdController)
router.post('/', productController.addProductController)
router.put('/:id', productController.updateProductController)
router.delete('/:id', productController.deleteProductController)

export default router