import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ProductTable from "./ProductTable";
import { useGetProductsQuery } from "../../redux/features/product/productApi";
import ListLoading from "../loader/ListLoading";
import ServerErrorCard from "../card/ServerErrorCard";
import { useGetTypeDropDownQuery } from "../../redux/features/type/typeApi";
import { useAppSelector } from "../../redux/hooks/hooks";
import ExportProductData from "./ExportProductData";

const ProductList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [typeId, setTypeId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  useGetTypeDropDownQuery(undefined);
  const { typeOptions } = useAppSelector((state) => state.type);
  const { data, isLoading, isFetching, isError } = useGetProductsQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: pageSize },
    { name: "searchTerm", value: searchTerm },
    { name: "typeId", value: typeId }
  ]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchTerm(searchQuery);
      setCurrentPage(1)
    }, 600);
    return () => clearTimeout(timeoutId); // cleanup for debounce
  }, [searchQuery]);


  const products = data?.data || [];
  const meta = data?.meta || {};
  

  let content: React.ReactNode;
 

  if (isLoading) {
    content = <ListLoading />;
  }

  if (!isLoading && !isError) {
    content = (
      <ProductTable
        products={products}
        meta={meta}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        loading={isFetching}
      />
    );
  }

  if (!isLoading && isError) {
    content = <ServerErrorCard />;
  }

   return (
     <>
       <div className="p-4 flex justify-between">
         <div className="flex flex-col md:flex-row md:items-center gap-x-16 gap-y-4">
           <h1 className="text-lg md:text-xl font-semibold text-gray-800">Product List</h1>
           <h1 className="md:text-lg">
             Total: <span className="font-bold"> {meta?.total} </span>
           </h1>
         </div>
         <div className="flex flex-col md:flex-row items-center gap-x-12 gap-y-4">
          <div className="flex gap-2 flex-col md:flex-row md:gap-3 items-center">
            <h1 className="text-md truncate">Filter by Type:</h1>
            <select
              className="p-1 md:p-2 bg-white border border-gray-300 rounded-md focus:border-blue-300"
              value={typeId}
              disabled={typeOptions?.length === 0}
              onChange={(e) => {
                setTypeId(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All</option>
              {
                typeOptions?.map((type, index) => (
                  <option key={index} value={type?.value}>{type.label}</option>
                ))
              }
            </select>
          </div>
           <div className="relative w-36 lg:w-72">
             <span className="absolute hidden inset-y-0 left-3 lg:flex items-center text-gray-700">
               <FaSearch size={16} />
             </span>
             <input
               type="text"
               placeholder="Search by name, type, category..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full pl-4 lg:pl-10 pr-4 py-1 lg:py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
             />
           </div>
           <button
             onClick={() => navigate("/add-product")}
             className="bg-primary w-36 lg:w-auto px-3 py-1.5 text-white cursor-pointer rounded-md hover:bg-[#2b4773] duration-200"
           >
             {" "}
             Add New
           </button>
         </div>
         <ExportProductData/>
       </div>
       {content}
     </>
   );
};

export default ProductList;
