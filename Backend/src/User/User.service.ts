import { User } from './User.entity'
import bcrypt from 'bcrypt';
export class UserService{
    async getUsers(){
        const getUsers = await User.find({where:{status:1}})
        return getUsers
    }
    async getUserById(userId:number){
        const user = await User.findOneBy({id:(userId)})
        if(!user || user.status === 0){
            throw new Error('Usuario no encontrado o desactivado')
        }
        return user
    }
    async createUser(data:any){
        const hashedPassword = await bcrypt.hash(data.password, 10)
        const existingUser = await User.findOne({ where: { email: data.email } })

        if (existingUser) {
        throw new Error('Email ya registrado')
        }
        const createUser = new User();
        createUser.username = data.username;
        createUser.first_name = data.first_name
        createUser.last_name = data.last_name
        createUser.email = data.email
        createUser.cellphone = data.cellphone
        createUser.password = hashedPassword
        createUser.status = 1

        await createUser.save()
        return createUser

    }
    async updateUser(userId:number, data:any){
        const hashedPassword = await bcrypt.hash(data.password, 10)
        const register = await User.findOneBy({id:(userId)})
        if(!register){
            throw new Error("Usuario no encontrado");
        }
        if(register.status===0){
            throw new Error("Usuario desactivado");
        }
        register.username = data.username;
        register.first_name= data.first_name;
        register.last_name = data.last_name;
        register.email = data.email;
        register.cellphone = data.cellphone;
        register.password = hashedPassword;

        await register.save();

        return register;
    }
    async patchUser(userId:number, data:any){
        const register = await User.findOneBy({ id: userId })

        if (!register) {
            throw new Error("Usuario no encontrado")
        }
        if (register.status === 0) {
            throw new Error("Usuario desactivado")
        }
        register.username = data.username ?? register.username 
        register.first_name = data.first_name ?? register.first_name
        register.last_name = data.last_name ?? register.last_name
        register.email = data.email ?? register.email
        register.cellphone = data.cellphone ?? register.cellphone

        if (data.password) {
            register.password = await bcrypt.hash(data.password, 10)
        }

        await register.save()

        const { password, ...safeUser } = register

        return safeUser
    }
    async deleteUser(userId:number){
        const user = await User.findOneBy({id:(userId)})
        if(!user){
            throw new Error("Usuario no encontrado");
        }
        user.status = 0

        await user.save()
        return user;
    }
}