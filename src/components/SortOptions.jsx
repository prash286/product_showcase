export const SortOptions = ({ setSortBy }) => {
  return (
    <div className="flex justify-start bg-gray-300">
      <div className="py-1 px-3 rounded text-sm flex items-center gap-3">
        <span className="font-medium">Sort by: </span>
        <select
          className="border p-1 rounded font-medium"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="title">Title</option>

          <option value="price">Price</option>

          <option value="rating">Popularity</option>
        </select>
      </div>
    </div>
  );
};
