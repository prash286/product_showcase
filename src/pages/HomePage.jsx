import { useEffect, useState } from "react";
import { FilterSidebar } from "../components/FilterSidebar";
import { Header } from "../components/Header";
import { Pagination } from "../components/Pagination";
import { ProductCard } from "../components/ProductCard";
import { SortOptions } from "../components/SortOptions";
import { useCartData } from "../contextApi/CartDataContext";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProductDetails, setSelectedProductDetails] = useState({});
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [filterBy, setFilterBy] = useState({
    category: "",
    price: 0,
  });
  const [sortBy, setSortBy] = useState("title");
  const { cartData = [], setCartData } = useCartData();

  async function fetchProducts() {
    try {
      setLoading1(true);
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading1(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = products.reduce((pv, cv) => {
    if (!pv.includes(cv.category.toLowerCase())) {
      pv.push(cv.category.toLowerCase());
    }

    return pv;
  }, []);

  const newData = filterData.length ? filterData : products;
  const sortedData = newData.slice().sort((a, b) => {
    switch (sortBy) {
      case "title": {
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
      }
      case "price": {
        return a.price - b.price;
      }
      case "rating": {
        return b.rating.rate - a.rating.rate;
      }
    }
  });

  const paginationData = sortedData.slice(
    currentPage === 1 ? 0 : (currentPage - 1) * 10,
    currentPage * 10
  );

  const pageCount = Math.floor(sortedData.length / 10);

  async function fetchSelectedProductDetails(id) {
    setShowModal(true);
    try {
      setLoading2(true);
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      setSelectedProductDetails(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading2(false);
    }
  }

  function closeModal() {
    setShowModal(false);
    setSelectedProductDetails({});
  }

  useEffect(() => {
    const modifyData = products.slice().filter((item) => {
      if (filterBy.category && filterBy.price) {
        return (
          item.category.toLowerCase() === filterBy.category.toLowerCase() &&
          item.price >= Number(filterBy.price)
        );
      } else if (filterBy.category && !filterBy.price) {
        return item.category.toLowerCase() === filterBy.category.toLowerCase();
      } else if (!filterBy.category && filterBy.price) {
        return item.price >= Number(filterBy.price);
      } else {
        return false;
      }
    });

    if (modifyData.length) {
      setFilterData(modifyData);
    } else {
      setFilterData([]);
    }
  }, [filterBy.category, filterBy.price]);

  useEffect(() => {
    if (showModal) {
      document.sc;
    }
  }, [showModal]);

  return (
    <div className="h-[100dvh] flex flex-col">
      <Header />

      <div className="flex-1 flex flex-col overflow-y-auto sm:flex-row">
        <FilterSidebar categories={categories} onFilter={setFilterBy} />

        <div className="flex-1 overflow-y-auto flex flex-col">
          <SortOptions setSortBy={setSortBy} />

          <div className="flex-1 relative overflow-y-auto">
            {!loading1 &&
            Array.isArray(paginationData) &&
            paginationData.length ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2">
                {paginationData.map((item) => (
                  <ProductCard
                    productDetails={item}
                    key={item.id}
                    onViewDetails={fetchSelectedProductDetails}
                  />
                ))}
              </div>
            ) : loading1 ? (
              <div className="text-2xl font-medium h-full flex items-center justify-center">
                Loading...
              </div>
            ) : (
              <div className="text-3xl font-medium h-full flex items-center justify-center">
                No Data Found
              </div>
            )}

            {showModal ? (
              <div className="absolute top-0 bottom-0 left-0 right-0 backdrop-blur-md bg-[rgba(0,0,0,0.25)]">
                <div className="max-w-[50%] min-w-80 mx-auto bg-white h-full relative overflow-y-auto">
                  {!loading2 && Object.keys(selectedProductDetails).length ? (
                    <>
                      <div
                        className="sticky me-2 top-3 flex justify-end cursor-pointer"
                        onClick={closeModal}
                      >
                        <span className="w-6 h-6 rounded-full flex justify-center bg-gray-300">
                          X
                        </span>
                      </div>
                      <img
                        src={selectedProductDetails.image}
                        alt=""
                        className="w-full h-56 object-scale-down mb-2 rounded-t mt-4"
                        loading="eager"
                      />
                      <div className="px-6 py-4">
                        <h2 className="text-lg font-bold line-clamp-2">
                          {selectedProductDetails.title}
                        </h2>

                        <div className="py-2 self-end">
                          <p>{selectedProductDetails.description}</p>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-green-600 font-semibold">
                                ₹ {selectedProductDetails.price}
                              </p>
                              <p className="text-yellow-500 text-sm">
                                Rating: {selectedProductDetails.rating?.rate} ⭐
                              </p>
                            </div>
                            <button
                              className="rounded-3xl px-3 py-2 bg-yellow-500 font-medium cursor-pointer"
                              onClick={() => {
                                if (
                                  cartData.find(
                                    (obj) =>
                                      obj.id === selectedProductDetails.id
                                  )
                                ) {
                                  navigate("/cart");
                                } else {
                                  alert("Added to the cart");
                                  setCartData((pv) => [
                                    ...pv,
                                    { ...selectedProductDetails, quantity: 1 },
                                  ]);
                                }
                              }}
                            >
                              {Array.isArray(cartData) &&
                              cartData.find(
                                (obj) => obj.id === selectedProductDetails.id
                              )
                                ? "View cart"
                                : "Add to cart"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : loading2 ? (
                    <div className="text-2xl font-medium h-full flex items-center justify-center">
                      Loading...
                    </div>
                  ) : !Object.keys(selectedProductDetails).length ? (
                    <div className="text-2xl font-medium h-full flex items-center justify-center">
                      No data found
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>

          <Pagination
            totalPages={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};
