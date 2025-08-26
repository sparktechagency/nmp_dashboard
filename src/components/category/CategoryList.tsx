import { useEffect, useState } from "react";
import CategoryTable from "./CategoryTable";
import { FaSearch } from "react-icons/fa";
import CreateCategoryModal from "../modal/category/CreateCategoryModal";
import { useGetCategoriesQuery } from "../../redux/features/category/categoryApi";
import ListLoading from "../loader/ListLoading";
import ServerErrorCard from "../card/ServerErrorCard";

const CategoryList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading,isFetching, isError } = useGetCategoriesQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: pageSize },
    { name: "searchTerm", value: searchTerm }
  ]);

  
  //debounced handle
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchTerm(searchQuery);
      setCurrentPage(1)
    }, 600);
    return () => clearTimeout(timeoutId); // cleanup for debounce
  }, [searchQuery]);


  const categories = data?.data || [];
  const meta = data?.meta || {};

  let content: React.ReactNode;
  


  
  if (isLoading) {
    content = <ListLoading />;
  }

  if (!isLoading && !isError) {
    content = <CategoryTable
      categories={categories}
      meta={meta}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      pageSize={pageSize}
      setPageSize={setPageSize}
      isFetching={isFetching}
    />;
  }

  if (!isLoading && isError) {
    content = <ServerErrorCard />;
  }


    return (
      <>
        <div className="p-4 flex justify-between">
          <h1 className="text-xl font-medium text-gray-800">Category List</h1>
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
            <CreateCategoryModal />
          </div>
        </div>
        {content}
      </>
    );
};

export default CategoryList;
