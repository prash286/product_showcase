import { Link, useNavigate } from "react-router-dom";
import { useCartData } from "../contextApi/CartDataContext";

export const Header = () => {
  const navigate = useNavigate();
  const { cartData = [] } = useCartData();

  const uniqueJson = cartData.length
    ? [...new Set(cartData.map((obj) => JSON.stringify(obj)))]
    : [];

  const uniqueObjects = uniqueJson.map((json) => JSON.parse(json));

  return (
    <div className="flex items-center justify-between py-4 px-8 bg-[antiquewhite]">
      <img src="logo.png" alt="logo" className="w-12 aspect-square" />

      <div className="flex items-center gap-3">
        <Link to="/" className="text-xl font-semibold">
          Home
        </Link>

        <Link to="/cart" className="text-xl font-semibold ">
          Cart {uniqueObjects.length ? `(${uniqueObjects.length})` : ""}
        </Link>
      </div>
    </div>
  );
};
