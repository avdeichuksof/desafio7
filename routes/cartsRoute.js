import { Router } from 'express'
import CartController from '../controllers/cartsController.js'
const cartController = new CartController()

const router = new Router()

router.get('/', cartController.getCartsController)
router.get('/:cid', cartController.getCartByIdController)
router.post('/', cartController.addCartController)
router.post('/:cid/product/:pid', cartController.addProductToCartController)
router.put('/:cid/products/:pid', cartController.updateQuantityController)
router.delete('/:cid', cartController.deleteCartController)
router.delete('/:cid/products/:pid', cartController.deleteFromCartController)

export default router