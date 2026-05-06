import { Link, useRouteError } from "react-router-dom";

type RouteError = {
  statusText?: string;
  message?: string;
};

export default function NotFound() {
  const error = useRouteError() as RouteError | undefined;
  const errorMessage =
    error?.statusText || error?.message || "The page you are looking for does not exist.";

  return (
    <section className="container flex min-h-[65vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold tracking-wide text-accent">404 ERROR</p>
      <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-sm text-gray-600 sm:text-base">{errorMessage}</p>
      <Link
        to="/"
        className="mt-6 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white shadow-lg shadow-accent/25 transition-colors hover:bg-accent/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        Back to home
      </Link>
    </section>
  );
}
