import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmptyCardHandler from "../components/EmptyCardHandler";
import { useCartStore } from "../store/cartStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type CheckoutFormData, checkoutSchema } from "../types/schema";
import SectionHeading from "../components/UI/SectionHeading";
import { useCheckoutStore } from "../store/checkoutStore";

type PaymentMethod = "cash" | "card";

export default function Checkout() {
  const setCheckoutData = useCheckoutStore((state) => state.setCheckoutData);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = (data: CheckoutFormData) => {
    if (!paymentMethod) {
      setShowMethodError(true);
      return;
    }

    setShowMethodError(false);

    setCheckoutData({ ...data, paymentMethod });

    navigate("/payment");
  };

  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const subTotal = useCartStore((state) => state.getTotalPrice());

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null,
  );
  const [showMethodError, setShowMethodError] = useState(false);

  const tax = Number((subTotal * 0.14).toFixed(2));
  const total = Number((subTotal + tax).toFixed(2));

  if (items.length === 0) {
    return <EmptyCardHandler />;
  }

  return (
    <section className="container mt-6 mb-12">
      <SectionHeading title="Checkout" pargraph="Delivery Details" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 border border-gray-200 rounded-2xl p-5 md:p-6 bg-white shadow-sm">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-primary-tx mb-2"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  {...register("name")}
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                />
                {errors.name && (
                  <p className="text-sm text-red-700 m-2">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-primary-tx mb-2"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  {...register("phone")}
                  type="tel"
                  placeholder="e.g. 0100 000 0000"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                />
                {errors.phone && (
                  <p className="text-sm text-red-700 m-2">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-primary-tx mb-2"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  {...register("address")}
                  rows={4}
                  placeholder="Enter delivery address"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                />
                {errors.address && (
                  <p className="text-sm text-red-700 m-2">
                    {errors.address.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <aside className="h-fit border border-gray-200 rounded-2xl p-5 md:p-6 bg-white shadow-sm">
            <h2 className="text-xl font-semibold text-primary-tx mb-4">
              Order Summary
            </h2>

            <div className="border border-gray-200 rounded-xl p-3 space-y-3 max-h-72 overflow-y-auto">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-14 h-14 rounded-lg object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-primary-tx truncate">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted mt-0.5">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-primary-tx shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between text-muted">
                <span>Subtotal</span>
                <span>${subTotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-muted">
                <span>
                  Tax <span className="text-sm">(14%)</span>
                </span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="pt-3 border-t border-gray-200 flex items-center justify-between text-lg font-bold text-primary-tx">
                <span>Total</span>
                <span className="text-accent">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-accent text-white font-semibold py-3 hover:opacity-90 transition"
            >
              Go To Payment
            </button>

            {showMethodError ? (
              <p className="text-sm text-red-500 mt-3 text-center">
                Please select a payment method before continuing.
              </p>
            ) : null}
          </aside>
        </div>

        <div className="mt-8 border border-gray-200 rounded-2xl p-5 md:p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold text-primary-tx mb-4">
            Payment Methods
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => {
                setPaymentMethod("cash");
                setShowMethodError(false);
              }}
              className={`rounded-xl border p-4 text-left transition ${
                paymentMethod === "cash"
                  ? "border-accent bg-accent/5"
                  : "border-gray-200 hover:border-accent/60"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-primary-tx">
                    Cash on Delivery
                  </p>
                  <p className="text-sm text-muted mt-1">
                    Pay in cash upon arrival.
                  </p>
                </div>
                <span
                  className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === "cash"
                      ? "border-accent"
                      : "border-gray-300"
                  }`}
                  aria-hidden="true"
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      paymentMethod === "cash" ? "bg-accent" : "bg-transparent"
                    }`}
                  />
                </span>
              </div>
            </button>

            <button
              type="button"
              disabled
              className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-left cursor-not-allowed opacity-80"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-primary-tx">
                      Visa / Credit Card
                    </p>
                    <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
                      Coming Soon
                    </span>
                  </div>
                  <p className="text-sm text-muted mt-1">
                    This method will be available soon. Please use cash for now.
                  </p>
                </div>
                <span
                  className="mt-0.5 w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <span className="w-2 h-2 rounded-full bg-gray-300" />
                </span>
              </div>
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
