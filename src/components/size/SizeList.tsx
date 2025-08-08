import { useState } from "react";
import ServerErrorCard from "../card/ServerErrorCard";
import ListLoading from "../loader/ListLoading";
import SizeTable from "./SizeTable";
import { useGetSizesQuery } from "../../redux/features/size/sizeApi";

const SizeList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading, isError } = useGetSizesQuery(undefined);
  const sizes = data?.data || [];
  const meta = data?.meta || {};

  if (isLoading) {
    return <ListLoading />;
  }

  if (!isLoading && !isError) {
    return <SizeTable
      sizes={sizes}
      meta={meta}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      pageSize={pageSize}
      setPageSize={setPageSize}
    />;
  }

  if (!isLoading && isError) {
    return <ServerErrorCard />;
  }
};

export default SizeList;
