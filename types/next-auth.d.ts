import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: string;
    no_telepon?: string;
  }

  interface Session {
    user: User & {
      id: string;
      role: string;
      no_telepon?: string;
    };
  }
}
