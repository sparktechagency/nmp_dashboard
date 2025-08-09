import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import FlavorTable from "./FlavorTable";
import { flavorsData } from "../../data/flavor.data";
import CreateFlavorModal from "../modal/flavor/CreateFlavorModal";

const FlavorList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  //const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  // const { data, isLoading, isError } = useGetCategoriesQuery([
  //   { name: "page", value: currentPage },
  //   { name: "limit", value: pageSize },
  //   { name: "searchTerm", value: searchTerm }
  // ]);

  
  //debounced handle
  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     setSearchTerm(searchQuery);
  //     setCurrentPage(1)
  //   }, 600);

  //   return () => clearTimeout(timeoutId); // cleanup for debounce
  // }, [searchQuery]);


  //const categories = data?.data || [];
  //const meta = data?.meta || {};
   const meta = {
    "page": 1,
    "limit": 10,
    "totalPages": 4,
    "total": 10
  }
  //let content: React.ReactNode;
  const content: React.ReactNode = <FlavorTable
      brands={flavorsData}
      meta={meta}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      pageSize={pageSize}
      setPageSize={setPageSize}
    />;


  

  // if (isLoading) {
  //   content = <ListLoading />;
  // }

  // if (!isLoading && !isError) {
  //   content = <CategoryTable
  //     categories={categories}
  //     meta={meta}
  //     currentPage={currentPage}
  //     setCurrentPage={setCurrentPage}
  //     pageSize={pageSize}
  //     setPageSize={setPageSize}
  //   />;
  // }

  // if (!isLoading && isError) {
  //   content = <ServerErrorCard />;
  // }


    return (
      <>
        <div className="p-4 flex justify-between">
          <h1 className="text-xl font-medium text-gray-800">Flavor List</h1>
          <div className="flex items-center gap-12">
            <h1 className="text-lg">
              Total: <span className="font-bold"> {meta?.total} </span>
            </h1>
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
            <CreateFlavorModal />
          </div>
        </div>
        {content}
      </>
    );
};

export default FlavorList;
