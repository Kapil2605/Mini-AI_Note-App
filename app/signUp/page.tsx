"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data: any) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });
    if (!error) {
      router.push("/notes");
    } else {
      alert(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl"
      >
        <h2 className="mb-1 text-center text-2xl font-bold text-gray-900">Sign Up</h2>
        <p className="mb-6 text-center text-base font-semibold text-gray-600">Join us today!</p>

        {/* Email Input with Label */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
            Email
          </label>
          <Input
            {...register("email", { required: "Email is required" })}
            id="email"
            placeholder="Enter Your Email"
            type="email"
            className="w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
          />
          {/* {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>} */}
        </div>

        {/* Password Input with Label */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
            Password
          </label>
          <Input
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" }
            })}
            type="password"
            id="password"
            placeholder="Enter Your Password"
            className="w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
          />
          {/* {errors.password && <p className="mt-2 text-sm text-red-500">{errors.password.message}</p>} */}
        </div>

        <Button
          type="submit"
          className="mb-4 w-full rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Sign Up"}
        </Button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
