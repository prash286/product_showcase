import { useEffect, useState } from "react";

export const FilterSidebar = ({
  categories,
  // filterByCategory,
  // filterByPrice,
  onFilter,
}) => {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    let id;
    if (price) {
      id = setTimeout(() => {
        onFilter((pv) => ({ ...pv, price: price }));
      }, 500);
    } else {
      onFilter((pv) => ({ ...pv, price: 0 }));
    }

    return () => clearTimeout(id);
  }, [price]);

  return (
    <div className="sm:w-56 sm:block w-full flex gap-3 justify-between p-4 bg-blue-200">
      <span className="block font-medium text-xl mb-4">Filter By</span>

      <div className="mb-8">
        <label className="block font-semibold mb-1">Category</label>
        <select
          className="w-full border p-2 rounded"
          onChange={(e) =>
            onFilter((pv) => ({ ...pv, category: e.target.value }))
          }
        >
          {Array.isArray(categories) && categories.length ? (
            <>
              <option value="">All</option>
              {categories.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </>
          ) : (
            <></>
          )}
        </select>
      </div>
      <div>
        <label className="block font-semibold mb-1">Max Price: {price}</label>
        <input
          type="range"
          min="0"
          max="1000"
          step="10"
          className="w-full"
          defaultValue={0}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>
    </div>
  );
};
