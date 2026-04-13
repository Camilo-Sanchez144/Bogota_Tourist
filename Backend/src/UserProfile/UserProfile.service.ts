import UserProfile from './userProfile.entity'
import User from '../User/User.entity'
class UserProfileService{
    async ConsultarUsuario(id:any){
        const userFind = await UserProfile.findOneBy({id:Number(id)})
        if(!userFind){
            throw new Error ('Usuario no encontrado')
        }
        return userFind
    }
    async AgregarUsuario(data:any, id:any){
        const saveUser = await new UserProfile()
        const user = await User.findOne({where:{id:Number(data.user)}})
        if(user?.status==0){
            throw new Error("Usuario desactivado");
        }
        if(!user){
            throw new Error('No se encontró el usuario')
        }
        saveUser.bio = data.bio;
        saveUser.date_of_birth = data.date_of_birth;
        saveUser.profile_picture = data.profile_picture;
        saveUser.user = data.user

        await saveUser.save()

        return saveUser
    }
    async ActualizarUsuario(id:any, data:any){
            const updateUser = await UserProfile.findOne({
                where: { id: Number(id) },
                loadRelationIds: true
            })
            if(!updateUser){
                throw new Error("Usuario no encontrado");
            }
            const validateUser = await User.findOne({
                where: {id:Number(updateUser.user)}
            })
            if(validateUser?.status===0){
                throw new Error("Usuario desactivado");
            }
            if(updateUser.user != data.user){
                throw new Error("Usuario no coincide el id");
            }
            if(!validateUser){
                throw new Error('No se encontró el usuario')
            }
            updateUser.bio = data.bio;
            updateUser.date_of_birth = data.date_of_birth;
            updateUser.profile_picture = data.profile_picture;

            await updateUser.save();
    
            return updateUser;
    }
    async BorrarUsuario(id:any){
        const userDelete = await UserProfile.findOneBy({id:Number(id)})
        if(!userDelete){
            throw new Error("Usuario no encontrado");
        }

        await userDelete.remove()
        return userDelete;
    }
}
export default UserProfileService