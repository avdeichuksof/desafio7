import ProductsMethods from '../dao/methods/productsMethods.js'
const productMethods = new ProductsMethods()

class ProductService{
    getProductsService = async (category, limit, page, sort) => {
        try{
            const data = await productMethods.getProductsMethods(category, limit, page, sort)
            return data
        }catch(err){
            console.log(err)
            throw new Error(err.message)
        }
    }

    getProductByIdService = async (id) => {
        try{
            const productFound = await productMethods.getProductByIdMethods(id)
            return productFound
        }catch(err){
            console.log(err)
            throw new Error(err.message)
        }
    }


    validateProduct = async (title, description, price, thumbnail, code, stock, category) => {
        try{
            if(!title || !description || !price || !thumbnail || !code || !stock || !category) throw new Error('Please fill all the fields')
        }catch(err){
            console.log(err)
            throw new Error(err.message)
        }
    }

    addProductService = async (newProduct) => {
        try{
            await this.validateProduct(newProduct.title, newProduct.description, newProduct.price, newProduct.thumbnail, newProduct.code, newProduct.stock, newProduct.category)
            
            const product = await productMethods.addProductMethods(newProduct)
            if(product) console.log({message: 'Product added successfully', product: product})

            return product
        }catch(err){
            console.log(err)
            throw new Error(err.message)
        }
    }

    updateProductService = async (id, newData) => {
        try{
            const productFound = await productMethods.getProductByIdMethods(id)
            if(!productFound) throw new Error('Product not found, invalid ID')

            const updatedProduct = await productMethods.updateProductMethods(id, newData)
            if(updatedProduct) console.log({message: 'Product updated successfully', product: updatedProduct})

            return updatedProduct
        }catch(err){
            console.log(err)
            throw new Error(err.message)
        }
    }

    deleteProductService = async (id) => {
        try{
            const productFound = await productMethods.getProductByIdMethods(id)
            if(!productFound) throw new Error('Product not found, invalid ID')

            const deletedProduct = await productMethods.deleteProductMethods(id)
            if(deletedProduct) console.log({message: 'Product deleted successfully', product: deletedProduct})

        }catch(err){
            console.log(err)
            throw new Error(err.message)
        }
    }

}

export default ProductService