import { DataSource } from "typeorm"
import  User  from '../User/User.entity'
import UserProfile from "../UserProfile/UserProfile.entity"


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