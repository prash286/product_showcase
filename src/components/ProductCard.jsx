import { Link } from "react-router-dom";
// {
//     "id": 1,
//     "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//     "price": 109.95,
//     "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//     "category": "men's clothing",
//     "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//     "rating": {
//         "rate": 3.9,
//         "count": 120
//     }
// }
export const ProductCard = ({ productDetails, onViewDetails }) => {
  const { id, title, price, rating, image } = productDetails;
  return (
    <div className="rounded shadow hover:shadow-lg transition grid">
      <img
        src={image}
        alt=""
        className="w-full h-40 object-scale-down mb-2 rounded-t"
        loading="lazy"
      />
      <h2 className="text-lg font-bold line-clamp-2 px-3">{title}</h2>

      <div className="px-3 py-2 self-end">
        <p className="text-green-600 font-semibold">₹ {price}</p>
        <p className="text-yellow-500 text-sm">Rating: {rating?.rate} ⭐</p>
        <button
          className="text-blue-600 hover:underline cursor-pointer"
          onClick={() => onViewDetails(id)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};
