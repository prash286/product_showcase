import { createContext, useContext, useState } from "react";

const CartDataContext = createContext(null);

function CartDataProvider({ children }) {
  const [cartData, setCartData] = useState([]);

  return (
    <CartDataContext.Provider value={{ cartData, setCartData }}>
      {children}
    </CartDataContext.Provider>
  );
}

function useCartData() {
  const context = useContext(CartDataContext);
  if (!context) {
    throw new Error("useCartData must be used within a CartDataProvider");
  }

  return context;
}

export { CartDataProvider, useCartData };
