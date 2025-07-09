import { $Enums, PrismaClient } from "@prisma/client";

import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcryptjs"; // assuming you store hashed passwords

const prisma = new PrismaClient();

export enum Role {
  ADMIN = "ADMIN",
  CLIENT = "CLIENT",
  USER = "USER",
  AHJ = "AHJ",
}

export interface User {
  id: string;
  name: string;
  email: string | null;
  password: string | null;
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  roles: $Enums.Role[];
}

export class AuthService {
  private static instance: AuthService;
  private _user!: User;

  private constructor() {}

  get user(): User {
    return this._user;
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }

    return AuthService.instance;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email } });
  }

  async authorize(credentials?: Record<"email" | "password", string>) {
    if (!credentials?.email || !credentials.password) {
      throw new Error("Missing credentials");
    }

    const authService = AuthService.getInstance();
    const user = await authService.getUserByEmail(credentials.email);
    if (!user || !user.password) {
      throw new Error("No user found");
    }

    const isValid = await compare(credentials.password, user.password);
    if (!isValid) {
      throw new Error("Invalid password");
    }

    this._user = user;

    return user;
  }
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const authService = AuthService.getInstance();
        return authService.authorize(credentials);
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login", // Optional: custom login page
  },
};
