import { Usuario } from "./Usuario"
export interface userProfile{
    id: number;
    bio: String | null;
    profile_picture: string | null;
    date_of_birth: Date | null;
    user: Usuario;
}