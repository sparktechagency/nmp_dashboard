import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import AdminTable from "./AdminTable";
import CreateAdminModal from "../modal/admin/CreateAdminModal";
import { useGetAdminsQuery } from "../../redux/features/admin/adminApi";
import ListLoading from "../loader/ListLoading";
import ServerErrorCard from "../card/ServerErrorCard";

const AdminList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading, isFetching, isError } = useGetAdminsQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: pageSize },
    { name: "searchTerm", value: searchTerm },
  ]);

  //debounced handle
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchTerm(searchQuery);
      setCurrentPage(1)
    }, 600);

    return () => clearTimeout(timeoutId); // cleanup for debounce
  }, [searchQuery]);

  const users = data?.data || [];
  const meta = data?.meta || {};


  let content: React.ReactNode;


  if (isLoading) {
    content = <ListLoading />;
  }

  if (!isLoading && !isError) {
    content = (
      <div className="flex-1 overflow-hidden">
        <AdminTable
          users={users}
          meta={meta}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          isFetching={isFetching}
        />
      </div>
    );
  }

  if (!isLoading && isError) {
    content = <ServerErrorCard />;
  }

  return (
    <>
      <div className="p-4 flex justify-between">
        <h1 className="text-xl font-medium text-gray-800">Admin List</h1>
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
          <CreateAdminModal/>
        </div>
      </div>
      {content}
    </>
  );
};

export default AdminList;
