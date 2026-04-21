import UserProfile from './userProfile.entity'
import User from '../User/User.entity'
class UserProfileService{
    async getProfileByUserId(profileId:number){
        const profile = await UserProfile.findOne({
            where: { user: { id: profileId } },
            relations: ['user']
        })
        if(!profile){
            throw new Error ('Perfil no encontrado')
        }
        return profile
    }
    async createProfile(data:any){
        const saveUser = new UserProfile()
        const user = await User.findOne({where:{id:Number(data.user)}})
        if(!user){
            throw new Error('No se encontró el usuario')
        }
        if(user?.status==0){
            throw new Error("Usuario desactivado");
        }
        const existingProfile = await UserProfile.findOne({
            where: { user: { id: user.id } }
        })
        if (existingProfile) {
            throw new Error('El usuario ya tiene perfil')
        }
        saveUser.bio = data.bio;
        saveUser.date_of_birth = data.date_of_birth;
        saveUser.profile_picture = data.profile_picture;
        saveUser.user = user

        await saveUser.save()

        return saveUser
    }
    async updateProfile(profileId:number, data:any){
        const updateProfile = await UserProfile.findOne({
            where: { id: (profileId) },
            loadRelationIds: true
        })
        if(!updateProfile){
            throw new Error("Perfil no encontrado");
        }
        const validateUser = await User.findOne({
            where: {id:Number(updateProfile.user)}
        })
        if(!validateUser){
            throw new Error('No se encontró el usuario')
        }
        if(validateUser?.status===0){
            throw new Error("Usuario desactivado");
        }
        if(Number(updateProfile.user) != data.user){
            throw new Error("Usuario no coincide el id");
        }
        updateProfile.bio = data.bio;
        updateProfile.date_of_birth = data.date_of_birth;
        updateProfile.profile_picture = data.profile_picture;

        await updateProfile.save();

        return updateProfile;
    }
    async patchProfile(profileId: number, data: any) {
        const updateUser = await UserProfile.findOne({
            where: { id: (profileId) },
            loadRelationIds: true
        })
        if(!updateUser){
            throw new Error("Usuario no encontrado");
        }
        const validateUser = await User.findOne({
            where: {id:Number(updateUser.user)}
        })
        if(!validateUser){
            throw new Error('No se encontró el usuario')
        }
        if(validateUser?.status===0){
            throw new Error("Usuario desactivado");
        }
        if(Number(updateUser.user) != data.user){
            throw new Error("Usuario no coincide el id");
        }
        updateUser.bio = data.bio ?? updateUser.bio
        updateUser.date_of_birth = data.date_of_birth ?? updateUser.date_of_birth
        updateUser.profile_picture = data.profile_picture ?? updateUser.profile_picture

        await updateUser.save();
        
        return updateUser
    }
    async deleteProfile(profileId:number){
        const userDelete = await UserProfile.findOneBy({id:(profileId)})
        if(!userDelete){
            throw new Error("Usuario no encontrado");
        }
        if (Number(userDelete.user) !== profileId) {
            throw new Error('No autorizado')
        }
        await userDelete.remove()
        return userDelete;
    }
}
export default UserProfileService