import { Link } from "react-router-dom";
import type { Meal } from "../types";
import { Button } from "./UI/Button";
import { useState } from "react";
import { useCartStore } from "../store/cartStore";

export default function CategoryMealsCard({ meal }: { meal: Meal }) {
  const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);

  const addBtnDelay = async () => {
    setIsAddBtnClicked(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setIsAddBtnClicked(false);
  };

  const handleAddToCartBtn = () => {
    addBtnDelay();

    addToCart(meal);
  };

  return (
    <div className="relative bg-secondary-bg rounded-lg overflow-hidden hover:scale-[1.05] duration-300 shadow-lg shadow-accent/80">
      <Link to={`/meal/${meal.id}`} className="absolute inset-0 z-30" />
      <img
        src={meal.image}
        alt="Meal Image"
        className="w-full h-[220px] object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-center mb-1">
          <h2 className="font-semibold text-xl text-primary-tx ">
            {meal.title}
          </h2>
          <span className="font-semibold text-xl text-accent">
            ${meal.price % 1 === 0 ? meal.price : meal.price.toFixed(2)}
          </span>
        </div>
        <p className="mb-4 text-muted leading-6 line-clamp-2">
          {meal.description}
        </p>
        <Button
          disabled={isAddBtnClicked}
          onClick={handleAddToCartBtn}
          size="sm"
          className={`w-full z-30 ${isAddBtnClicked && "bg-gray-400! cursor-not-allowed"}`}
        >
          {isAddBtnClicked ? "Adding ..." : "Add to cart"}
        </Button>
      </div>
    </div>
  );
}
