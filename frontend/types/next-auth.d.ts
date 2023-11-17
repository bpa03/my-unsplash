import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth/jwt' {
  interface JWT {
    id: string | number;
    access: string;
  }
}

declare module 'next-auth' {
  interface User {
    id: number | string;
    access: string;
  }

  interface Session {
    user: {
      id: string | number;
      email: string;
      name: string;
      access: string;
    };
  }
}