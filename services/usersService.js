import UserMethods from "../dao/methods/usersMethods.js"
const userMethods = new UserMethods()

class UserService {
    getUsersService = async () => {
        try{
            const users = await userMethods.getUsersMethod()
            return users
        }catch(err){
            throw new Error(err.message)
        }
    }

    getUsersByIdService = async (id) => {
        try{
            const userFound = await userMethods.getUserByIdMethod(id)
            return userFound
        }catch(err){
            throw new Error(err.message)
        }
    }

    addUserService = async (user) => {
        try{
            const newUser = await userMethods.addUserMethod(user)
            return newUser
        }catch(err){
            throw new Error(err.message)
        }
    }
}

export default UserService