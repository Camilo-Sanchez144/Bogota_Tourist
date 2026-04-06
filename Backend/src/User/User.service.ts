import { User } from './User.entity'
import bcrypt from 'bcrypt';
export class UserService{
    async ConsultarUsuarios(){
        const consultar = await User.find({where:{status:1}})
        return consultar
    }
    async ConsultarUsuarioDetalle(id:any){
        const userId = await User.findOneBy({id:Number(id)})
        if(!userId){
            throw new Error('Usuario no encontrado')
        }
        return userId
    }
    async AgregarUsuario(data:any){
        const hashedPassword = await bcrypt.hash(data.password, 10)

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
    async ActualizarUsuario(id:any, data:any){
        const hashedPassword = await bcrypt.hash(data.password, 10)
        const registro = await User.findOneBy({id:Number(id)})
        if(!registro){
            throw new Error("Usuario no encontrado");
        }
        if(registro.status===0){
            throw new Error("Usuario desactivado");
        }
        registro.username = data.username;
        registro.first_name= data.first_name;
        registro.last_name = data.last_name;
        registro.email = data.email;
        registro.cellphone = data.cellphone;
        registro.password = hashedPassword;

        await registro.save();

        return registro;
    }
    async BorrarUsuario(id:any){
        const user = await User.findOneBy({id:Number(id)})
        if(!user){
            throw new Error("Usuario no encontrado");
        }
        user.status = 0

        await user.save()
        return user;
    }
}