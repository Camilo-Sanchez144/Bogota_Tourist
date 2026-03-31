import { User } from './user.entity'
export class UserService{
    async AgregarUsuario(data:any){
        
        const crearUser = new User();
        crearUser.first_name = data.first_name
        crearUser.last_name = data.last_name
        crearUser.email = data.email
        crearUser.cellphone = data.email
        crearUser.password = data.password
    }
}