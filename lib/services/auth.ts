import {
  type UserCredential,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import type { FirebaseError } from "firebase/app";
import { AuthErrors } from "@/lib/types/error-messages";
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
    password: string,
  ): Promise<{ credential?: UserCredential; error?: string }> {
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log("🚀 - :36 - AuthService - credential:", credential);
      return { credential };
    } catch (e) {
      return this.getErrorMessageFromFirebaseError(e as FirebaseError);
    }
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ credential?: UserCredential; error?: string }> {
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log(`🚀 - :53 - AuthService - { credential }:`, { credential });
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
          error: AuthErrors.INVALID_CREDENTIALS,
        };

      case "auth/email-already-in-use":
        return {
          error: AuthErrors.EMAIL_IN_USE,
        };

      case "auth/weak-password":
        return {
          error: AuthErrors.WEAK_PASSWORD,
        };

      default:
        return {
          error: AuthErrors.LOGIN_FAILED,
        };
    }
  }
}
