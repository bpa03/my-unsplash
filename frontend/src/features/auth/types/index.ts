export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  data: {
    access: string;
  }
}

export interface AuthError {
  error: {
    type: string;
    message: string;
  }
}
