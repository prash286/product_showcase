import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { CartPage } from "./pages/CartPage";
import { CartDataProvider } from "./contextApi/CartDataContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/cart",
      element: <CartPage />,
    },
  ]);

  return (
    <CartDataProvider>
      <RouterProvider router={router} />
    </CartDataProvider>
  );
}

export default App;
