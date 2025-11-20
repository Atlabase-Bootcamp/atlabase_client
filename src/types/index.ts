export interface IUser {
  id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  is_admin: boolean;
}

export interface IApiResponse<T> {
  success: boolean;
  data: T;
}
