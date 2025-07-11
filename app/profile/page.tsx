import type { Metadata } from "next"
import { ProfilePage } from "@/lib/components/pages/profile/ProfilePage"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Profile Setup | REDLINE Fire Watch Staffing",
    description:
      "Create your REDLINE Fire Watch profile to manage fire watch schedules, staffing and safety compliance.",
    icons: {
      icon: "/images/favicon.ico",
      shortcut: "/images/favicon.png",
      apple: "/images/logo180.png",
    },
    openGraph: {
      title: "Profile Setup | REDLINE Fire Watch Staffing",
      description: "Create your REDLINE Fire Watch profile",
    },
  }
}

export default function Profile() {
  return <ProfilePage />
}
