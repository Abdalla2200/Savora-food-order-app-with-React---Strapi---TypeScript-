import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import EmptyCardHandler from "../components/EmptyCardHandler";

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const subTotal = useCartStore((state) => state.getTotalPrice());
  const tax = (subTotal * 0.14).toFixed(2);
  const total = (+subTotal + +tax).toFixed(2);

  if (items.length === 0) {
    return <EmptyCardHandler />;
  }

  return (
    <div className="container mt-6 mb-12">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl md:text-3xl text-primary-tx font-semibold">
          Your <span className="text-accent">Selection</span>{" "}
        </h1>
        {/* Delete Cart Button (UI Only, no action) */}
        <button
          onClick={clearCart}
          type="button"
          className="px-3 md:px-4 py-1 md:py-2 bg-red-500 hover:bg-red-600 text-white text-sm md:text-[16px] md:font-semibold rounded-lg transition"
        >
          Delete Cart
        </button>
      </div>
      <p className="text-muted md:text-lg leading-7 mb-8">
        Review your selected items before checkout.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row gap-4 bg-white shadow-sm"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full sm:w-28 h-28 object-cover rounded-xl"
              />

              <div className="flex-1 flex flex-col justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-primary-tx">
                    {item.title}
                  </h2>
                  <p className="text-sm text-muted mt-1">
                    Unit price: ${item.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        item.quantity === 1
                          ? removeFromCart(item.id)
                          : decreaseQty(item.id)
                      }
                      type="button"
                      className="w-8 h-8 rounded-full border border-gray-300 text-lg font-semibold text-primary-tx hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="min-w-6 text-center font-medium text-primary-tx">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      type="button"
                      className="w-8 h-8 rounded-full border border-gray-300 text-lg font-semibold text-primary-tx hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <p className="text-lg font-bold text-primary-tx">
                      ${(item.quantity * item.price).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      type="button"
                      className="text-sm font-medium text-red-500 hover:text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Cart Summary */}
        <aside className="h-fit border border-gray-200 rounded-2xl p-5 md:p-6 bg-white shadow-sm">
          <h3 className="text-xl font-semibold text-primary-tx mb-4">
            Cart Summary
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-muted">
              <span>Subtotal</span>
              <span>${subTotal}</span>
            </div>
            <div className="flex items-center justify-between text-muted">
              <span>
                Tax <span className="text-sm">(14%)</span>
              </span>
              <span>${tax}</span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex items-center justify-between text-lg font-bold text-primary-tx">
              <span>Total</span>
              <span className="text-accent">${total}</span>
            </div>
          </div>

          <Link
            to="/checkout"
            className="mt-6 inline-flex items-center justify-center w-full rounded-xl bg-accent text-white font-semibold py-3 hover:opacity-90 transition"
          >
            Go To Checkout
          </Link>
        </aside>
      </div>
    </div>
  );
}
