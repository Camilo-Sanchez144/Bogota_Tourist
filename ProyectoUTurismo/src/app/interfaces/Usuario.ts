export interface Usuario{
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  cellphone: string | null;
  is_active: boolean;
  last_login: string | null;
  is_superuser: boolean;
}