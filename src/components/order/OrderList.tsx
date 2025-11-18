import React, { Suspense, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useGetOrdersQuery } from "../../redux/features/order/orderApi";
import ListLoading from "../loader/ListLoading";
import ServerErrorCard from "../card/ServerErrorCard";
import ExportOrderData from "./ExportOrderData";
const OrderTable = React.lazy(() => import("./OrderTable"));


const OrderList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading, isFetching, isError } = useGetOrdersQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: pageSize },
    { name: "searchTerm", value: searchTerm },
    { name: "status", value: status },
  ]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchTerm(searchQuery);
      setCurrentPage(1)
    }, 600);

    return () => clearTimeout(timeoutId); // cleanup for debounce
  }, [searchQuery]);



  const orders = data?.data || [];
  const meta = data?.meta || {};

  let content: React.ReactNode;


  if (isLoading) {
    content = <ListLoading />;
  }

  if (!isLoading && !isError) {
    content = (
      <Suspense fallback={<ListLoading/>}>
        <OrderTable
          orders={orders}
          meta={meta}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          isFetching={isFetching}
        />
      </Suspense>
    );
  }

  if (!isLoading && isError) {
    content = <ServerErrorCard />;
  }



   return (
     <>
       <div className="p-4 flex justify-between">
         <div className="flex flex-col md:flex-row md:items-center gap-x-16 gap-y-4">
           <h1 className="text-lg md:text-xl font-semibold text-gray-800">Order List</h1>
           <h1 className="md:text-lg">
             Total: <span className="font-bold"> {meta?.total} </span>
           </h1>
         </div>
         <div className="flex flex-col md:flex-row items-end md:items-center gap-x-12 gap-y-4">
           <div className="flex gap-2 flex-col md:flex-row md:gap-3 items-center">
             <h1 className="text-md truncate">Filter by Status:</h1>
             <select
               className="p-1 md:p-2 bg-white border border-gray-300 rounded-md focus:border-blue-300"
               value={status}
               onChange={(e) => {
                 setStatus(e.target.value);
                 setCurrentPage(1);
               }}
             >
               <option value="">All</option>
               <option value="processing">Processing</option>
               <option value="shipped">Shipped</option>
               <option value="delivered">Delivered</option>
               <option value="cancelled">Cancelled</option>
             </select>
           </div>
           <div className="relative w-48 lg:w-72">
             <span className="absolute hidden inset-y-0 left-3 lg:flex items-center text-gray-700">
               <FaSearch size={16} />
             </span>
             <input
               type="text"
               placeholder="Search here..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full pl-4 lg:pl-10 pr-4 py-1 lg:py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
             />
           </div>
           <ExportOrderData/>
         </div>
       </div>
       {content}
     </>
   );
};

export default OrderList;
