import { useParams } from "react-router-dom";
import useMealsDetails from "../hooks/useMealsDetails";
import { Button } from "../components/UI/Button";
import LoadingHandler from "../components/UI/LoadingHandler";
import ErrorHandler from "../components/UI/ErrorHandler";
import { useCartStore } from "../store/cartStore";
import { useState } from "react";

export default function MealDetails() {
  const { mealId } = useParams();
  const { data: mealDetails, loading, error } = useMealsDetails(Number(mealId));

  const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);

  const items = useCartStore((state) => state.items);

  const itemQuantity =
    items.find((item) => item.id === mealDetails?.id)?.quantity || 0;
  const addToCart = useCartStore((state) => state.addToCart);
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const addBtnDelay = async () => {
    setIsAddBtnClicked(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setIsAddBtnClicked(false);
  };

  const handleAddToCartBtn = () => {
    addBtnDelay();
    if (!mealDetails) return;
    addToCart(mealDetails);
  };

  if (loading) return <LoadingHandler text="Loading meal details..." />;

  if (error) return <ErrorHandler message={error} />;

  if (!mealDetails) return null;

  return (
    <section className="container my-12">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] items-start">
        <div className="overflow-hidden rounded-2xl bg-secondary-bg shadow-lg shadow-accent/20">
          <img
            src={mealDetails.image}
            alt={mealDetails.title}
            className="h-[300px] w-full object-cover md:h-[400px]"
          />
        </div>

        <div className="rounded-2xl border border-accent/20 bg-secondary-bg p-6 md:p-8 shadow-lg shadow-accent/10">
          <p className="mb-2 text-sm uppercase tracking-[0.2em] text-accent">
            Meal Details
          </p>
          <h1 className="mb-3 text-3xl font-bold text-primary-tx md:text-4xl">
            {mealDetails.title}
          </h1>
          <p className="mb-6 text-2xl font-semibold text-accent">
            $
            {mealDetails.price % 1 === 0
              ? mealDetails.price
              : mealDetails.price.toFixed(2)}
          </p>

          <p className="mb-8 leading-7 text-muted">{mealDetails.description}</p>

          <div className="mb-6 flex items-center gap-3">
            <span className="text-sm font-medium text-primary-tx">Amount</span>
            <div className="flex items-center rounded-full border border-accent/30 bg-white/50">
              <button
                onClick={() =>
                  itemQuantity === 1
                    ? removeFromCart(mealDetails.id)
                    : decreaseQty(mealDetails.id)
                }
                type="button"
                className="px-4 py-2 text-lg font-semibold text-primary-tx transition-colors hover:text-accent"
                aria-label="Decrease amount"
              >
                -
              </button>
              <span className="min-w-10 text-center text-base font-semibold text-primary-tx">
                {itemQuantity}
              </span>
              <button
                onClick={() => {
                  if (itemQuantity === 0) {
                    addToCart(mealDetails);
                  } else {
                    increaseQty(mealDetails.id);
                  }
                }}
                type="button"
                className="px-4 py-2 text-lg font-semibold text-primary-tx transition-colors hover:text-accent"
                aria-label="Increase amount"
              >
                +
              </button>
            </div>
          </div>

          <Button
            disabled={isAddBtnClicked || itemQuantity > 0}
            onClick={handleAddToCartBtn}
            className={`w-full md:w-auto ${isAddBtnClicked || (itemQuantity > 0 && "cursor-not-allowed bg-gray-400!")}`}
          >
            {isAddBtnClicked
              ? "Adding ..."
              : itemQuantity > 0
                ? "In The Cart"
                : "Add to Cart"}
          </Button>
        </div>
      </div>
    </section>
  );
}
