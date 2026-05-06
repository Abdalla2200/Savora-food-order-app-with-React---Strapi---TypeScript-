import { Link } from "react-router-dom";
import { Leaf, ShoppingBag, UtensilsCrossed } from "lucide-react";
import SectionHeading from "../components/UI/SectionHeading";
import { Button } from "../components/UI/Button";

const highlights = [
  {
    icon: UtensilsCrossed,
    title: "Curated menu",
    text: "Dishes organized by category so you can browse quickly and order with confidence.",
  },
  {
    icon: Leaf,
    title: "Quality first",
    text: "We care about flavor and responsibly sourced ingredients—the same spirit as our home page promise.",
  },
  {
    icon: ShoppingBag,
    title: "Simple ordering",
    text: "Add items to your cart, check out when you are ready, and enjoy food made for busy days.",
  },
] as const;

export default function About() {
  return (
    <section className="container flex-1 py-10 md:py-14 px-4">
      <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
        <SectionHeading
          title="About"
          highlighted="Savora"
          pargraph="Good food, simple ordering, and a calm place to explore the menu."
        />
        <p className="text-primary-tx/90 text-left sm:text-center leading-relaxed">
          This app is a practice build: you can browse categories, use the cart,
          and walk through checkout like a small real-world flow. It shares the
          same spirit as the home page—thoughtful ingredients and an easy path
          from craving to plate.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto mb-10 md:mb-12">
        {highlights.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="border border-gray-200 rounded-2xl p-6 bg-secondary-bg shadow-sm text-left"
          >
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-accent/10 text-accent mb-4">
              <Icon className="w-5 h-5" strokeWidth={2} aria-hidden />
            </div>
            <h2 className="text-lg font-semibold text-primary-tx mb-2">
              {title}
            </h2>
            <p className="text-sm text-muted leading-relaxed">{text}</p>
          </div>
        ))}
      </div>

      <div className="max-w-xl mx-auto text-center rounded-2xl border border-gray-200 bg-secondary-bg px-6 py-8 shadow-sm">
        <p className="text-primary-tx font-medium mb-1">Hungry yet?</p>
        <p className="text-sm text-muted mb-6">
          Jump to the menu and pick something for tonight.
        </p>
        <Link to="/menu">
          <Button size="default">Explore menu</Button>
        </Link>
      </div>
    </section>
  );
}
