import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import CategoryMeals from "../pages/CategoryMeals";
import MealDetails from "../pages/MealDetails";
import About from "../pages/About";
import Menu from "../pages/Menu";
import Checkout from "../pages/Checkout";
import Payment from "../pages/Payment";
import Succes from "../pages/Succes";
import Login from "../pages/Login";
import Register from "../pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "menu", element: <Menu /> },
      { path: "menu/:catId", element: <CategoryMeals /> },
      { path: "meal/:mealId", element: <MealDetails /> },
      { path: "about", element: <About /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "payment", element: <Payment /> },
      { path: "success", element: <Succes /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);
export default function AppRouter() {
  return <RouterProvider router={router} />;
}
