import { useEffect, useState } from "react";
import ServerErrorCard from "../card/ServerErrorCard";
import ListLoading from "../loader/ListLoading";
import { FaSearch } from "react-icons/fa";
import OrderTable from "./OrderTable";
import { useGetOrdersQuery } from "../../redux/features/order/orderApi";

const OrderList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading, isError } = useGetOrdersQuery([
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
      <OrderTable
        orders={orders}
        meta={meta}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    );
  }

  if (!isLoading && isError) {
    content = <ServerErrorCard />;
  }

   return (
     <>
       <div className="p-4 flex justify-between">
         <h1 className="text-xl font-medium text-gray-800">Order List</h1>
         <div className="flex items-center gap-12">
           <h1 className="text-lg">
             Total: <span className="font-bold"> {meta?.total} </span>
           </h1>
           <div className="flex gap-3 items-center">
             <h1>Filter by Status:</h1>
             <select 
               className="p-2 bg-white border border-gray-300 rounded-md focus:border-blue-300"
               value={status}
               onChange={(e) =>{
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
           <div className="relative w-72">
             <span className="absolute inset-y-0 left-3 flex items-center text-gray-700">
               <FaSearch size={16} />
             </span>
             <input
               type="text"
               placeholder="Search here..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
             />
           </div>
         </div>
       </div>
       {content}
     </>
   );
};

export default OrderList;
