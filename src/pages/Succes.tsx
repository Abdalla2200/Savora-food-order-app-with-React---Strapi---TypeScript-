import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CircleCheckBig } from "lucide-react";
import { useCartStore } from "../store/cartStore";

export default function Succes() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <section className="container my-12">
      <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 md:p-10 shadow-sm text-center">
        <CircleCheckBig className="mx-auto text-green-600" size={56} />

        <h1 className="mt-4 text-2xl md:text-3xl font-semibold text-primary-tx">
          Order submitted successfully!
        </h1>
        <p className="mt-3 text-muted">
          Thanks for ordering with Savora. We received your order and will start
          preparing it right away.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-accent px-5 py-3 font-semibold text-white hover:opacity-90 transition"
          >
            Back to Home
          </Link>
          <Link
            to="/menu"
            className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-5 py-3 font-semibold text-primary-tx hover:border-accent hover:text-accent transition"
          >
            Continue Browsing
          </Link>
        </div>
      </div>
    </section>
  );
}
