import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";

import Image from "next/image";
import { SignUpForm } from "./SignUpForm";

export const SignUpPage = () => {
  return (
    <Card className="w-full max-w-md -mt-40">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-4 relative">
          <Image
            src="/images/logo220x48.png"
            alt="Redline Logo"
            width={220}
            height={48}
          />
        </div>

        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>

        <CardDescription>Sign up to get started</CardDescription>
      </CardHeader>

      <CardContent>
        <SignUpForm />
      </CardContent>
    </Card>
  );
};
