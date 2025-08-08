import { Table, ConfigProvider, Pagination } from "antd";
import EditCategoryModal from "../modal/category/EditCategoryModal";
import type { ICategory } from "../../types/category.type";
import DeleteCategoryModal from "../modal/category/DeleteCategoryModal";
import type { IMeta } from "../../types/global.type";
import type { IBrand } from "../../types/brand.type";



type TProps = {
  brands: IBrand[];
  meta: IMeta;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}

type TDataSource = {
  key: number;
  serial: number;
  _id: string;
  name: string;
}


const BrandTable = ({
  brands, meta,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize
}: TProps) => {

  const dataSource: TDataSource[] = brands?.map((category, index) => ({
    key: index,
    serial: Number(index + 1) + (currentPage - 1) * pageSize,
    _id: category?._id,
    name: category?.name
  }))

  const columns = [
    {
      title: "Serial No",
      dataIndex: "serial",
      key: "serial",
      width: "10%",
    },
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
      width: "22.5%",
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "action",
      width: "15%",
      render: (val: string, record: ICategory) => (
        <div className="flex items-center gap-3">
          <EditCategoryModal category={record} />
          <DeleteCategoryModal categoryId={val} />
        </div>
      ),
    },
  ];


  const handlePagination = (page: number, PageSize: number) => {
    setCurrentPage(page);
    setPageSize(PageSize);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#FEF3C7", // Amber-50 color
            headerColor: "#000000",
            rowHoverBg: "#F3F4F6", // Gray-100 color
            borderColor: "#E5E7EB", // Gray-200 color
          },
        },
      }}
    >
      <div className="w-full overflow-auto">
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          rowKey="_id"
          sticky
          scroll={{ y: "calc(100vh - 265px)" }}
          className="employer-table"
        />
      </div>
      {meta?.totalPages > 1 && (
        <div className="p-8 bg-white shadow-md flex justify-center">
          <Pagination
            onChange={handlePagination}
            current={currentPage}
            pageSize={pageSize}
            total={meta?.total}
          />
        </div>
      )}
    </ConfigProvider>
  );
};

export default BrandTable;
