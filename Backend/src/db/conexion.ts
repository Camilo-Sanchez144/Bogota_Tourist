import { DataSource } from "typeorm"
import  User  from '../User/User.entity'
import UserProfile from "../UserProfile/userProfile.entity"
import Post from '../Posts/Post.entity'
import { Like } from "../Likes/Likes.entity";
import { Comment } from "../Comments/Comments.entity";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "turismo",
    logging:true,
    entities:[UserProfile,User,Post, Comment, Like],
    synchronize:true
});