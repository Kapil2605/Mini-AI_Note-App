import { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import LoginPage from "@/app/login/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated (you can add your authentication logic here)
    const isAuthenticated = false; // Change this logic to check if the user is logged in

    if (!isAuthenticated) {
      // If not authenticated, redirect to login page
      router.push("/login");
    }
  }, [router]);

  return (
    <>
    <LoginPage/>
    </>
  );
}
