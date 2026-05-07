import { Link, useNavigate } from "react-router-dom";
import { CreditCard, MapPinHouse } from "lucide-react";
import { useState } from "react";
import EmptyCardHandler from "../components/EmptyCardHandler";
import { useCartStore } from "../store/cartStore";
import SectionHeading from "../components/UI/SectionHeading";
import { useCheckoutStore } from "../store/checkoutStore";
import { submitOrder } from "../api/api";
import { useTokenStore } from "../store/tokenStore";

export default function Payment() {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const checkoutData = useCheckoutStore((state) => state.checkoutData);
  const clearCart = useCartStore((state) => state.clearCart);
  const subTotal = useCartStore((state) => state.getTotalPrice());

  const [orderError, setOrderError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deliveryFee = 2.99;
  const tax = Number((subTotal * 0.14).toFixed(2));
  const total = Number((subTotal + tax + deliveryFee).toFixed(2));

  const token = useTokenStore((state) => state.token);

  const payload = {
    name: checkoutData?.name,
    phone: checkoutData?.phone,
    address: checkoutData?.address,
    items: items.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
    })),
    subTotal,
    tax,
    total,
    paymentMethod: checkoutData?.paymentMethod,
    orderStatus: "pending",
  };

  const handlePlaceOrder = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    setOrderError("");
    setIsSubmitting(true);

    try {
      await submitOrder(payload, token);
      clearCart();
      navigate("/success");
    } catch (err) {
      if (err instanceof Error) {
        setOrderError(err.message);
      } else {
        setOrderError("Somthing went wrong");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return <EmptyCardHandler />;
  }

  return (
    <section className="container mt-6 mb-12">
      <SectionHeading
        title="Review your"
        highlighted="order"
        pargraph="Finalize your selection and secure your culinary experience."
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        {/* Left column */}
        <div className="xl:col-span-2 space-y-5">
          {/* Items list */}
          <div className="border border-gray-200 rounded-2xl p-5 md:p-6 bg-white shadow-sm">
            <h2 className="text-xl font-semibold text-primary-tx mb-4">
              Your Items
            </h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 md:gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-14 h-14 md:w-16 md:h-16 rounded-lg object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-primary-tx">
                      {item.title}
                    </p>
                    <p className="text-xs md:text-sm text-muted mt-1 truncate">
                      {item.description}
                    </p>
                    <p className="text-sm text-primary-tx mt-1">
                      Qty: <span className="font-medium">{item.quantity}</span>
                    </p>
                  </div>
                  <p className="text-sm md:text-base font-semibold text-accent shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery + Payment info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm">
              <div className="flex items-center gap-2 text-primary-tx">
                <MapPinHouse size={18} />
                <h3 className="font-semibold">Delivery Address</h3>
              </div>
              <p className="text-sm text-muted mt-3 wrap-break-word">
                {checkoutData?.address ?? "No address added yet."}
              </p>
              <button
                type="button"
                onClick={() => navigate("/checkout")}
                className="mt-3 text-sm font-semibold text-accent hover:opacity-80 transition"
              >
                Change
              </button>
            </div>

            <div className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm">
              <div className="flex items-center gap-2 text-primary-tx">
                <CreditCard size={18} />
                <h3 className="font-semibold">Payment Method</h3>
              </div>
              <p className="text-sm text-muted mt-3">
                Cash on delivery
                <br />
                {checkoutData?.phone ? `Phone: ${checkoutData.phone}` : ""}
              </p>
              <button
                type="button"
                onClick={() => navigate("/checkout")}
                className="mt-3 text-sm font-semibold text-accent hover:opacity-80 transition"
              >
                Change
              </button>
            </div>
          </div>
        </div>

        {/* Right column — Order summary */}
        <aside className="h-fit border border-gray-200 rounded-2xl p-5 md:p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold text-primary-tx mb-4">
            Order Summary
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-muted">
              <span>Subtotal</span>
              <span>${subTotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-muted">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-muted">
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="pt-3 border-t border-gray-200 flex items-center justify-between text-lg font-bold text-primary-tx">
              <span>Total Amount</span>
              <span className="text-accent">${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            type="button"
            disabled={isSubmitting}
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-accent text-white font-semibold py-3 hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Placing order..." : "Submit Order"}
          </button>

          {orderError && (
            <p className="text-red-600 text-sm text-center mt-2">
              {orderError}
            </p>
          )}

          <p className="text-xs text-center text-muted mt-3">
            By placing this order, you agree to Savora&apos;s Terms of Service
            and Privacy Policy.
          </p>

          {!checkoutData && (
            <p className="text-xs text-amber-700 mt-3 text-center">
              Missing delivery details.{" "}
              <Link to="/checkout" className="underline font-medium">
                Go back to checkout
              </Link>
              .
            </p>
          )}
        </aside>
      </div>
    </section>
  );
}
