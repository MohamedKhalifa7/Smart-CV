export interface RegisterParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export interface LoginParams {
  email: string;
  password: string;
}