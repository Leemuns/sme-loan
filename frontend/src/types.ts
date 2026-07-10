export interface User {
  username: string;
  fullname: string;
  email: string;
}

export interface NewUser {
  username: string;
  fullname: string;
  email: string;
  password: string;
}

export interface UserCredentials {
  username: string;
  password: string;
}
