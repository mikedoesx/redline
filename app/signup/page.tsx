import { Metadata } from "next";
import { SignUpPage } from "@/lib/components/pages/signup/SignUpPage";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sign Up | REDLINE Fire Watch Staffing",
    description:
      "Create a REDLINE account to get professional fire watch staffing solutions and protect your business with ease.",
    icons: {
      icon: "/images/favicon.ico",
      shortcut: "/images/favicon.png",
      apple: "/images/logo180.png",
    },
    openGraph: {
      title: "Sign Up | REDLINE Fire Watch Staffing",
      description:
        "Join REDLINE today and ensure your fire watch staffing and safety compliance needs are covered.",
    },
  };
}

export default function SignUp() {
  return <SignUpPage />;
}
