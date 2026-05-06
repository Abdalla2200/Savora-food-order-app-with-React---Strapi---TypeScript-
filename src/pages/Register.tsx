import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/UI/Button";
import SectionHeading from "../components/UI/SectionHeading";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "../types/schema";
import { useTokenStore } from "../store/tokenStore";
import { registerUser } from "../api/api";

export default function Register() {
  const navigate = useNavigate();
  const setToken = useTokenStore((state) => state.setToken);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (formData: RegisterFormData) => {
    setMessage("");
    try {
      const data = await registerUser(
        formData.userName,
        formData.email,
        formData.password,
      );

      // save token and user same as login — Strapi returns jwt on register too
      setToken(data.jwt, data.user);
      navigate("/payment");
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("Something went wrong");
      }
    }
  };

  return (
    <section className="container flex-1 py-10 md:py-14 px-4">
      <div className="max-w-md mx-auto">
        <SectionHeading
          title="Join"
          highlighted="Savora"
          pargraph="Create an account to order faster."
        />

        <div className="border border-gray-200 rounded-2xl p-6 sm:p-8 bg-secondary-bg shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label
                htmlFor="register-username"
                className="block text-sm font-medium text-primary-tx mb-2"
              >
                Username
              </label>
              <input
                {...register("userName")}
                id="register-username"
                type="text"
                autoComplete="username"
                placeholder="Choose a username"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
              <p className="text-red-700 mt-1">{errors.userName?.message}</p>
            </div>

            <div>
              <label
                htmlFor="register-email"
                className="block text-sm font-medium text-primary-tx mb-2"
              >
                Email
              </label>
              <input
                {...register("email")}
                id="register-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
              <p className="text-red-700 mt-1">{errors.email?.message}</p>
            </div>

            <div>
              <label
                htmlFor="register-password"
                className="block text-sm font-medium text-primary-tx mb-2"
              >
                Password
              </label>
              <input
                {...register("password")}
                id="register-password"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
              <p className="text-red-700 mt-1">{errors.password?.message}</p>
            </div>

            <div>
              <label
                htmlFor="register-confirm-password"
                className="block text-sm font-medium text-primary-tx mb-2"
              >
                Confirm password
              </label>
              <input
                {...register("confirmPassword")}
                id="register-confirm-password"
                type="password"
                autoComplete="new-password"
                placeholder="Repeat password"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
              <p className="text-red-700 mt-1">
                {errors.confirmPassword?.message}
              </p>
            </div>

            <Button type="submit" size="default" className="w-full">
              Create account
            </Button>
            <p className="text-red-700 mt-2 text-center">{message}</p>
          </form>

          <p className="text-center text-sm text-muted mt-6 pt-6 border-t border-gray-100">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-accent hover:text-accent/90 underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
