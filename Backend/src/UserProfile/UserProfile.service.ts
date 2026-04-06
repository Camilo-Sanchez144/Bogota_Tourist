import user from './UserProfile.entity'
class UserProfileService{
    async ConsultarUsuario(id:any){
        const userFind = user.findOneBy({id:Number(id)})
        if(!userFind){
            throw new Error ('Usuario no encontrado')
        }
        return userFind
    }
}
export default UserProfileService