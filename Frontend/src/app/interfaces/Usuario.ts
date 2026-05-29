import { userProfile } from "./UserProfile";
export interface Usuario{
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  cellphone: string | null;
  bio?: string | null;
  profile: userProfile;
  is_active: boolean;
  last_login: string | null;
  is_superuser: boolean;
}