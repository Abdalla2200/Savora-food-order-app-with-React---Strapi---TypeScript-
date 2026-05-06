import { Link } from "react-router-dom";

export default function EmptyCardHandler() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h2 className="text-2xl md:text-3xl font-semibold text-primary-tx mb-4">
        Your cart is currently empty!
      </h2>
      <p className="text-muted mb-8 text-center max-w-sm">
        It looks like you haven&apos;t chosen any delicious meals yet. Browse
        our menu and treat yourself!
      </p>
      <Link
        to="/menu"
        className="inline-flex items-center px-6 py-3 bg-accent text-white font-semibold rounded-xl hover:opacity-90 transition"
      >
        Return to Menu
      </Link>
    </div>
  );
}
