import type { IBrand, IBrandDataSource, TBrandStatus } from "../../types/brand.type";
import EditBrandModal from "../modal/brand/EditBrandModal";
import DeleteBrandModal from "../modal/brand/DeleteBrandModal";
import type { IMeta } from "../../types/global.type";
import { ConfigProvider, Pagination, Table } from "antd";
import getTypeColor from "../../utils/getTypeColor";
import ChangeBrandStatusModal from "../modal/brand/ChangeBrandStatusModal";



type TProps = {
  brands: IBrand[];
  meta: IMeta;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean
}

const BrandTable = ({
  brands, meta,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  loading
}: TProps) => {

  const dataSource: IBrandDataSource[] = brands?.map((brand, index) => ({
    key: index,
    serial: Number(index + 1) + (meta.page - 1) * pageSize,
    _id: brand?._id,
    name: brand?.name,
    typeId: brand?.typeId,
    type: brand?.type,
    status: brand?.status
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
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 180,
      render: (type: string) => {
        const styleClass = getTypeColor(type);
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${styleClass}`}
          >
            {type}
          </span>
        );
      },
    },
     {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 145,
      render: (status: TBrandStatus, record: IBrandDataSource) => {
        const statusStyles = {
          hidden: "bg-red-100 text-red-700 border border-red-300",
          visible: "bg-green-100 text-green-700 border border-green-300",
        };

        const bgColor = status === "visible" ? statusStyles.visible : statusStyles.hidden;

        return (
          <div className="flex items-center gap-2">
            <button
              className={`${bgColor} capitalize w-20 cursor-default px-3 py-0.5 text-sm font-medium rounded-full`}
            >
              {status}
            </button>
            <ChangeBrandStatusModal brandId={record?._id} status={status} />
          </div>
        );
      },
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
