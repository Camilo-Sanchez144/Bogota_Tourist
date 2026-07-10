import { Usuario } from "./Usuario"
export interface userProfile{
    id: number;
    bio: string | null;
    profile_picture: string | null;
    date_of_birth: Date | null;
    user: Usuario;
}