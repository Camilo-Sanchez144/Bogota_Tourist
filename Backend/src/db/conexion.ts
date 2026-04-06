import { DataSource } from "typeorm"
import  User  from '../users/user.entity'
import UserProfile from "../userProfile/UserProfile.entity"


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "turismo",
    logging:true,
    entities:[UserProfile,User],
    synchronize:true
});