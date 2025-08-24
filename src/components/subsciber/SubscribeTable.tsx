import React from "react";
import { Table, ConfigProvider, Pagination } from "antd";
import type { IMeta } from "../../types/global.type";
import getColorClassForDate from "../../utils/getColorClassForDate";
import type { ISubscriber, TSubscriberDataSource } from "../../types/subscriber.type";
import DeleteSubscriberModal from "../modal/subscriber/DeleteSubscriberModal";


interface SubscribeTableProps {
  subscribers: ISubscriber[];
  meta: IMeta;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}


const SubscribeTable : React.FC<SubscribeTableProps> = ({
  subscribers,
  meta,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
}) => {

  const dataSource: TSubscriberDataSource[] = subscribers?.map((subscriber, index) => ({
    key: index,
    serial: Number(index + 1) + (currentPage - 1) * pageSize,
    _id: subscriber?._id,
    email: subscriber?.email,
    subscribedAt: subscriber?.subscribedAt,
  }));

  const columns = [
    {
      title: "Serial",
      dataIndex: "serial",
      key: "serial",
      width: "5%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "17%",
    },
    {
      title: "Subscribe Date",
      dataIndex: "subscribedAt",
      key: "subscribedAt",
      width: "12%",
      render: (val: string) => {
        const { bg, text, border } = getColorClassForDate(val.split('T')[0]);
        return (
          <button
            className={`text-sm px-2 py-1 rounded ${bg} ${text} ${border} border cursor-default`}
          >
            {val.split('T')[0]}
          </button>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "action",
      width: "15%",
      render: (val: string) => (  
          <DeleteSubscriberModal subscriberId={val} />
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
      <div className="w-full overflow-auto px-4">
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          rowKey="_id"
          sticky
          scroll={{ y: "calc(100vh - 265px)" }}
          className="employer-table min-h-[calc(100vh-290px)]"
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

export default SubscribeTable;
