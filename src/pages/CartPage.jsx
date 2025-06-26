import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { useCartData } from "../contextApi/CartDataContext";

export const CartPage = () => {
  const { cartData = [] } = useCartData();
  const [cartItems, setCartItems] = useState([]);

  const updateQuantity = (id, delta) => {
    const updated = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
        : item
    );
    setCartItems(updated);
  };

  const total = cartItems?.length
    ? cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : 0;

  useEffect(() => {
    setCartItems(cartData);
  }, [cartData]);

  return (
    <div className="h-[100dvh] flex flex-col">
      <Header />
      <div className="p-4 max-w-4xl mx-auto flex-1">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        {!cartItems?.length ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {Array.isArray(cartItems) &&
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="border-b py-4 flex justify-between items-center"
                >
                  <div>
                    <h2 className="font-bold">{item.title}</h2>
                    <p>
                      ₹ {item.price} x {item.quantity}
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-2"
                    >
                      -
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-2"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            <div className="text-right font-bold mt-4">
              Total: ₹ {total.toFixed(2)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
