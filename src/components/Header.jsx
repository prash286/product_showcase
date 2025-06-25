import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-[antiquewhite]">
      <img src="logo.png" alt="logo" className="w-12 aspect-square" />

      <div>
        <Link to="/" className="text-xl font-semibold">
          Home
        </Link>
      </div>
    </div>
  );
};
