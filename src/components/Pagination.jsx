export const Pagination = ({ totalPages = 0, currentPage, setCurrentPage }) => {
  return (
    <div className="bg-gray-300 p-2">
      <div className="flex justify-center">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 mx-1 border rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
