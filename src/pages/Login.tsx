import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/UI/Button";
import SectionHeading from "../components/UI/SectionHeading";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../types/schema";
import { useTokenStore } from "../store/tokenStore";
import { loginUser } from "../api/api";

export default function Login() {
  const navigate = useNavigate();
  const setToken = useTokenStore((state) => state.setToken);
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (formData: LoginFormData) => {
    setMessage("");

    try {
      const data = await loginUser(formData.userName, formData.password);
      // save token and user
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
          title="Sign in"
          pargraph="Sign in to continue ordering."
        />

        <div className="border border-gray-200 rounded-2xl p-6 sm:p-8 bg-secondary-bg shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label
                htmlFor="login-username"
                className="block text-sm font-medium text-primary-tx mb-2"
              >
                Username
              </label>
              <input
                {...register("userName")}
                id="login-username"
                type="text"
                autoComplete="username"
                placeholder="Your username"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
              <p className="text-red-700 mt-1">{errors.userName?.message}</p>
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="block text-sm font-medium text-primary-tx mb-2"
              >
                Password
              </label>
              <input
                {...register("password")}
                id="login-password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
              <p className="text-red-700 mt-1">{errors.password?.message}</p>
            </div>

            <Button type="submit" size="default" className="w-full">
              Sign in
            </Button>
            <p className="text-red-700 mt-2 text-center">{message}</p>
          </form>

          <p className="text-center text-sm text-muted mt-6 pt-6 border-t border-gray-100">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-accent hover:text-accent/90 underline-offset-4 hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
