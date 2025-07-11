import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";

import Image from "next/image";
import { LoginForm } from "./LoginForm";

export const LoginPage = () => {
  return (
    <Card className="w-full max-w-md -mt-40">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-4">
          <Image
            src="/images/logo220x48.png"
            alt="Redline Logo"
            width={220}
            height={48}
          />
        </div>
        <CardTitle className="text-2xl font-bold">
          Sign in to your account
        </CardTitle>
        <CardDescription>
          Enter your email and password to access the dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
};
