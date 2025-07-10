import {
  UserCredential,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { FirebaseError } from "firebase/app";
import { auth } from "./firebase";

export class AuthService {
  private static instance: AuthService;

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }

    return AuthService.instance;
  }

  async register(
    email: string,
    password: string
  ): Promise<{ credential?: UserCredential; error?: string }> {
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return { credential };
    } catch (e) {
      return this.getErrorMessageFromFirebaseError(e as FirebaseError);
    }
  }

  async login(
    email: string,
    password: string
  ): Promise<{ credential?: UserCredential; error?: string }> {
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return { credential };
    } catch (e) {
      return this.getErrorMessageFromFirebaseError(e as FirebaseError);
    }
  }

  async logout(): Promise<void> {
    return await signOut(auth);
  }

  async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(auth, email);
  }

  private getErrorMessageFromFirebaseError(error: FirebaseError): {
    error: string;
  } {
    console.log(error.code);
    switch (error.code) {
      case "auth/invalid-credential":
        return {
          error: "Invalid login credentials",
        };

      case "auth/email-already-in-use":
        return {
          error: "This email is already in use.",
        };

      default:
        return {
          error: "Couldn't login",
        };
    }
  }
}
