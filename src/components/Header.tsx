import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "../store/cartStore";
import { useTokenStore } from "../store/tokenStore";

const navLinks = [
  { title: "Home", to: "/" },
  { title: "Menu", to: "/menu" },
  { title: "About", to: "/about" },
];

export default function Header() {
  const navigate = useNavigate();
  const token = useTokenStore((state) => state.token);
  const clearToken = useTokenStore((state) => state.clearToken);
  const isLoggedIn = !!token;
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    clearToken();
    setShowLogoutModal(false);
    navigate("/");
  };
  const totalQuantity = useCartStore((state) => state.getTotalQuantity());

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="bg-secondary-bg shadow-lg shadow-accent/30 relative">
        {/* NAVBAR */}
        <div className="container py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <h1 className="text-accent text-2xl md:text-3xl font-bold">
              Savora
            </h1>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden sm:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.title}
                to={link.to}
                className={({ isActive }) =>
                  `py-2 text-lg transition ${
                    isActive
                      ? "text-accent border-b-2 border-accent"
                      : "text-primary-tx hover:text-accent"
                  }`
                }
              >
                {link.title}
              </NavLink>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-6 md:gap-8">
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `relative ${isActive ? "text-accent/80" : "text-primary-tx"}`
              }
            >
              <ShoppingCart className="" />
              <span className="absolute -top-3 -right-4 flex items-center justify-center w-5 h-5 rounded-full  bg-accent text-white text-xs font-bold shadow">
                {totalQuantity}
              </span>
            </NavLink>

            <div className="hidden sm:block">
              {isLoggedIn ? (
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium bg-accent text-white hover:bg-accent/90 transition"
                >
                  Log out
                </button>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium bg-accent text-white hover:bg-accent/90 transition"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Burger */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU OVERLAY */}
        <div
          className={`sm:hidden fixed inset-0 bg-black/50 z-40 transition-opacity ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* MOBILE MENU PANEL */}
        <div
          className={`sm:hidden fixed top-0 right-0 h-full w-2/3 bg-primary-bg z-50 transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col gap-6 p-6">
            {/* Close button */}
            <button onClick={() => setIsOpen(false)} className="self-end">
              <X />
            </button>

            {/* Links */}
            {navLinks.map((link) => (
              <NavLink
                key={link.title}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-lg ${isActive ? "text-accent" : "text-primary-tx"}`
                }
              >
                {link.title}
              </NavLink>
            ))}

            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/25 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent w-fit"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-primary-tx mb-2">
              Log out?
            </h3>
            <p className="text-sm text-muted mb-6">
              Are you sure you want to log out of your account?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-primary-tx hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 rounded-xl bg-accent py-2.5 text-sm font-medium text-white hover:bg-accent/90 transition"
              >
                Yes, log out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
