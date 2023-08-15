import Cart from '../models/cartsModel.js'

class CartsMethods{
    getCartsMethods = async () => {
        const carts = await Cart.find({})
        return carts
    }

    addCartMethods = async () => {
        const newCart = new Cart()
        return newCart.save()
        
    }

    getCartByIdMethods = async (id) => {
        const cartFound = await Cart.findOne({_id: id})
        return cartFound
        
    }

    deleteCartMethods = async (id) => {
        const deletedCart = await Cart.deleteOne({_id: id})
        return deletedCart
    }

}

export default CartsMethods 