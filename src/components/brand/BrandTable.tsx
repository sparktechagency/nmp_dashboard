import type { IBrand } from "../../types/brand.type";
import EditBrandModal from "../modal/brand/EditBrandModal";
import DeleteBrandModal from "../modal/brand/DeleteBrandModal";
import type { IMeta } from "../../types/global.type";
import { ConfigProvider, Pagination, Table } from "antd";



type TProps = {
  brands: IBrand[];
  meta: IMeta;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean
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
  setPageSize,
  loading
}: TProps) => {

  const dataSource: TDataSource[] = brands?.map((brand, index) => ({
    key: index,
    serial: Number(index + 1) + (meta.page - 1) * pageSize,
    _id: brand?._id,
    name: brand?.name
  }))

  const columns = [
     {
      title: "S.N.",
      dataIndex: "serial",
      key: "serial",
      width: 60,
    },
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
      width: 180,
      render: (text: string) => (
        <>
          <p className="truncate">{text}</p>
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "action",
      width: 115,
      render: (val: string, record: IBrand) => (
        <div className="flex items-center gap-3">
          <EditBrandModal brand={record} />
          <DeleteBrandModal brandId={val} />
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
      <div className="w-full overflow-auto px-4 overflow-x-auto">
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          rowKey="_id"
          sticky
          scroll={{ y: "calc(100vh - 265px)" }}
          className="employer-table min-h-[calc(100vh-290px)]"
          loading={loading}
        />
      </div>
      {meta?.total > 0 && (
        <div className="p-8 bg-white border-t shadow-md flex justify-center">
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
