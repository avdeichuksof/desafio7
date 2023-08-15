import CartService from "../services/cartsService.js";
const cartService = new CartService()

class CartController{
    getCartsController = async (req, res) => {
        try{
            let carts = await cartService.getCartsService()
            res.status(200).send({carts: carts})
        }catch(err){
            res.status(400).send({error: err})
        }
    }

    addCartController = async (req, res) => {
        try{
            let newCart = await cartService.addCartService()
            res.status(201).send({message: 'Cart created successfully', cart: newCart})
        }catch(err){
            res.status(400).send({error: err})
        }
    }

    getCartByIdController = async (req, res) => {
        try{
            const id = req.params.id
            const cartFound = await cartService.getCartByIdService(id)
            res.status(200).send({message: 'Cart found', cart: cartFound})
        }catch(err){
            res.status(400).send({error: err})
        }
    }

    addProductToCartController = async (req, res) => {
        try{
            const prodId = req.params.pid
            const cartId = req.params.cid
            const addProduct = await cartService.addProductToCartService(cartId, prodId)
            res.status(200).send({message: 'Product added to cart', product: addProduct})
        }catch(err){
            res.status(400).send({error: err})
        }
    }

    updateQuantityController = async (req, res) => {
        try{
            const prodId = req.params.pid
            const cartId = req.params.cid
            const newQuantity = req.body
            const updateQuant = await cartService.updateQuantityService(cartId, prodId, newQuantity)
            res.status(200).send({message: 'Quantity updated', updateQuant})
        }catch(err){
            res.status(400).send({error: err})
        }
    }

    deleteFromCartController = async (req, res) => {
        try{
            const prodId = req.params.pid
            const cartId = req.params.cid
            const deleteProduct = await cartService.deleteProductFromCartService(cartId, prodId)
            res.status(200).send({message: 'Product deleted from cart', product: deleteProduct})
        }catch(err){
            res.status(400).send({error: err})
        }
    }

    /* emptyCartController = async (req, res) => {
        try{
            const id = req.params.cid
            const emptyCart = await cartService.emptyCartService(id)
            res.status(200).send({message: 'Cart is empty', cart: emptyCart})
        }catch(err){
            res.status(400).send({error: err})
        }
    } */

    deleteCartController = async (req, res) => {
        try{
            const id = req.params.cid
            const deletedCart = await cartService.deleteCartService(id)
            res.status(200).send({message: 'Cart deleted successfully', cart: deletedCart})
        }catch(err){
            res.status(400).send({error: err})
        }
    }

}

export default CartController