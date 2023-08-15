import Cart from '../dao/models/cartsModel.js'
import CartsMethods from "../dao/methods/cartsMethods.js";
const cartMethods = new CartsMethods()

class CartService{
    getCartsService = async () => {
        try{
            const carts = await cartMethods.getCartsMethods()
            return carts
        }catch(err){
            throw new Error(err.message)
        }
    }

    addCartService = async () => {
        try{
            const cart = await cartMethods.addCartMethods()
            return cart
        }catch(err){
            throw new Error(err.message)
        }
    }

    getCartByIdService = async (id) => {
        try{
            const cartFound = await cartMethods.getCartByIdMethods(id)
            return cartFound
        }catch(err){
            throw new Error(err.message)
        }
    }

    addProductToCartService = async (cartId, prodId) => {
        try{
            let cart = await this.getCartByIdService(cartId)
            if(!cart) console.log('Cart not found')

            const productFound = cart.products.find(item => item.product.toString() === prodId)

            if(productFound){
                await Cart.updateOne(
                    {_id: cartId, 'products.product': prodId},
                    {$inc:{'products.$.quantity': 1}}
                )
                return ({message:'Product quantity increased'})
            }else{
                const addProd = {$push:{products:{product: prodId, quantity: 1}}}
                await Cart.updateOne({_id: cartId}, addProd)
                return ({message:'Product added to cart'})
            }
        }catch(err){
            throw new Error(err.message)
        }
    }

    updateQuantityService = async (cartId, prodId, newQuantity) => {
        try{
            let cartFound = await this.getCartByIdService(cartId)

            if(cartFound){
                const productFound = cartFound.products.find((product) => product.product.toString() === prodId)
            
                if(productFound){
                    await Cart.updateOne(
                        {_id: cartId, 'products.product': prodId},
                        {$set:{'products.$.quantity': newQuantity}}
                    )
                    return ({message: 'Quantity updated successfully'})
                }else{
                    console.log('Product not found')
                }
            }else{
                console.log('Cart not found')
            }
        }catch(err){
            throw new Error(err.message)
        }
        
    }

    deleteProductFromCartService = async (cartId, prodId) => {
        try{
            let cartFound = await this.getCartByIdService(cartId)

            if(cartFound){
                const productFound = cartFound.products.find((product) => product.product.toString() === prodId)

                if(productFound){
                    cartFound.products.splice(productFound, 1)
                    await cartFound.save()
                    return cartFound
                }else{
                    return false
                }
            }else{
                console.log('Cart not found')
            }
        }catch(err){
            throw new Error(err.message)
        }
        
    }

    /* emptyCartService = async (id) => {
        try{
            const cartFound = await this.getCartByIdService(id)
            if(cartFound){
                cartFound.products = []
                await cartFound.save()
                return cartFound
            }else{
                return false
            }
        }catch(err){
            throw new Error(err.message)
        }
    } */

    deleteCartService = async (id) => {
        try{
            const deletedCart = await cartMethods.deleteCartMethods(id)
            return deletedCart
        }catch(err){
            throw new Error(err.message)
        }
    }

}

export default CartService