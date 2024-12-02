export type User = {
  created_at: string;
  email: string;
  email_verified_at: null | string;
  id: number;
  updated_at: string;
  username: string;
};
export interface IUser {
  token: string;
  user: User;
}
export interface Album {
  id: number;
  title: string;

  user_id: number;
}
