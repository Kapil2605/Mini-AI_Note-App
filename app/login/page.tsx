"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    const { error } = await supabase.auth.signInWithPassword(data);
    if (!error) {
      router.push("/notes");
    } else {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://mini-ai-note-app.vercel.app/notes",
      },
    });
    if (error) alert(error.message);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl"
      >
        <h2 className="mb-1 text-center text-2xl font-bold text-gray-900">Login</h2>
        <p className="mb-6 text-center text-base font-semibold text-gray-600">Welcome back!</p>

        {/* Email Input Field with Label */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
            Email
          </label>
          <Input
            {...register("email")}
            id="email"
            placeholder="Enter Your Email"
            className="w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password Input Field with Label */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
            Password
          </label>
          <Input
            {...register("password")}
            type="password"
            id="password"
            placeholder="Enter Your Password"
            className="w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <Button
          type="submit"
          className="mb-4 w-full rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
        >
          Login
        </Button>

        <p className="mb-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link href="/signUp" className="text-blue-500 hover:underline">
            Signup
          </Link>
        </p>

        <div className="flex items-center gap-4 text-gray-400 mb-4">
          <div className="h-px flex-grow bg-gray-300" />
          <span className="text-xs uppercase">or</span>
          <div className="h-px flex-grow bg-gray-300" />
        </div>

        <Button
          type="button"
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 shadow-sm font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 533.5 544.3">
            <path fill="#4285F4" d="M533.5 278.4c0-18.6-1.5-36.4-4.4-53.6H272v101.4h146.9c-6.3 33.8-25.3 62.4-54 81.4v67.5h87.2c51.1-47 81.4-116.3 81.4-196.7z" />
            <path fill="#34A853" d="M272 544.3c73.4 0 135.2-24.4 180.3-66.2l-87.2-67.5c-24.2 16.3-55.1 26-93.1 26-71.5 0-132.1-48.1-153.8-112.9H27.4v70.9c45.7 90.2 139.2 149.7 244.6 149.7z" />
            <path fill="#FBBC04" d="M118.2 323.7c-10.1-30.4-10.1-63.2 0-93.6V159.2H27.4c-41.4 81.1-41.4 176.5 0 257.6l90.8-70.9z" />
            <path fill="#EA4335" d="M272 107.7c39.9-.6 78 14.4 107.3 41.4l80.4-80.4C408.2 24.2 345.4-1.3 272 0 166.6 0 73.1 59.5 27.4 149.7l90.8 70.9C139.9 155.8 200.5 107.7 272 107.7z" />
          </svg>
          Login with Google
        </Button>
      </form>
    </div>
  );
}
