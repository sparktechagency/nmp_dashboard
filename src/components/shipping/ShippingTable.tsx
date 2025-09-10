import { Table, ConfigProvider, Pagination } from "antd";
import type { IMeta } from "../../types/global.type";
import type { TShippingCost, TShippingCostDataSource } from "../../types/shipping.type";
import EditShippingCostModal from "../modal/shipping/EditShippingCostModal";
import DeleteShippingCostModal from "../modal/shipping/DeleteShippingCostModal";



type TProps = {
  shippingCosts: TShippingCost[];
  meta: IMeta;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  isFetching: boolean;
}

const ShippingTable = ({
  shippingCosts,
  meta,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  isFetching
}: TProps) => {

  const dataSource: TShippingCostDataSource[] = shippingCosts?.map((cost, index) => ({
    key: index,
    serial: Number(index + 1) + (meta.page - 1) * pageSize,
    _id: cost?._id,
    name: cost?.name,
    minSubTotal: cost?.minSubTotal,
    maxSubTotal: cost?.maxSubTotal,
    cost: cost?.cost,
    isActive: cost?.isActive,
    priority: cost?.priority
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
      title: "Minimum Value",
      dataIndex: "minSubTotal",
      key: "minSubTotal",
      width: 90,
      align: "center" as const,
      render: (val: number) => (
        <span>{val}</span>
      )
    },
    {
      title: "Maximum Value",
      dataIndex: "maxSubTotal",
      key: "maxSubTotal",
      width: 90,
      align: "center" as const,
      render: (val: number) => (
        <span>{val}</span>
      )
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
      width: 90,
      align: "center" as const,
      render: (val: number) => (
        <span>{val}</span>
      )
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      width: 90,
      align: "center" as const,
      render: (val: number) => (
        <span className="font-bold">{val}</span>
      )
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "action",
      width: 115,
      render: (val: string, record: TShippingCost) => (
        <div className="flex items-center gap-3">
          <EditShippingCostModal shippingCost={record} />
          <DeleteShippingCostModal shippingCostId={val} />
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
            headerBg: "#FEF3C7", 
            headerColor: "#000000",
            rowHoverBg: "#F3F4F6", 
            borderColor: "#E5E7EB", 
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
          loading={isFetching}
        />
      </div>
      {meta?.totalPages > 1 && (
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

export default ShippingTable;
