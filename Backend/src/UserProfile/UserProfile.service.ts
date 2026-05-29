import UserProfile from './userProfile.entity'
import User from '../User/User.entity'
class UserProfileService{
    async getProfileByUserId(profileId:number){
        const profile = await UserProfile.findOne({
            where: { user: { id: profileId, status:1 } },
            relations: ['user']
        })
        if(!profile){
            throw new Error ('Perfil no encontrado')
        }
        return profile
    }
/*     async createProfile(userId:number, data:any){
        const saveUser = new UserProfile()
        const user = await User.findOne({where:{id:userId, status:1}})
        if(!user){
            throw new Error('No se encontró el usuario')
        }
        const existingProfile = await UserProfile.findOne({
            where: { user: { id: userId } }
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
    } */
    async updateProfile(userId:number, data:any){
        const profile = await UserProfile.findOne({
            where: { user :{id:userId, status:1} },
            relations:['user']
        })
        if(!profile){
            throw new Error("Perfil no encontrado");
        }
        profile.bio = data.bio;
        profile.date_of_birth = data.date_of_birth;
        profile.profile_picture = data.profile_picture;

        await profile.save();

        return profile;
    }
    async patchProfile(userId: number, data: any) {
        const updateUser = await UserProfile.findOne({
            where: { user:{id:userId, status:1}},
             relations:['user']
        })
        if(!updateUser){
            throw new Error("Usuario no encontrado");
        }

        updateUser.bio = data.bio ?? updateUser.bio
        updateUser.date_of_birth = data.date_of_birth ?? updateUser.date_of_birth
        updateUser.profile_picture = data.profile_picture ?? updateUser.profile_picture

        await updateUser.save();
        
        return updateUser
    }
    async deleteProfile(userId:number){
        const userDelete = await UserProfile.findOne({where:{user:{id:userId, status:1}}, relations:['user']})
        if(!userDelete){
            throw new Error("Usuario no encontrado");
        }
        await userDelete.remove()
        return userDelete;
    }
}
export default UserProfileService