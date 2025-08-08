import React from "react";
import { Table, ConfigProvider, Pagination } from "antd";
import { Reply } from "lucide-react";
import type { IMeta } from "../../types/global.type";
import type { TContact } from "../../types/contact.type";
import ReplyModal from "../modal/contact/ReplyModal";
import ViewContactModal from "../modal/contact/ViewContactModal";
import getColorClassForDate from "../../utils/getColorClassForDate";


interface CandidateTableProps {
  contacts: TContact[];
  meta: IMeta;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}

type TDataSource = TContact & {
  key: number;
  serial: number;
}

const ContactTable : React.FC<CandidateTableProps> = ({
  contacts,
  meta,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
}) => {

  const dataSource: TDataSource[] = contacts?.map((contact, index) => ({
    key: index,
    serial: Number(index + 1) + (currentPage - 1) * pageSize,
    _id: contact?._id,
    name: contact?.name,
    email: contact?.email,
    message: contact?.message,
    phone: contact?.phone,
    replyText: contact?.replyText,
    createdAt: contact?.createdAt,
    replyAt: contact?.replyAt,
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
      title: "Contact Number",
      dataIndex: "phone",
      key: "phone",
      width: "15%",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      width: "20%",
      render: (text: string) => (
        <>
          <p className="truncate">{text}</p>
        </>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
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
      title: "Reply Date",
      dataIndex: "replyAt",
      key: "replyAt",
      width: "12%",
      render: (val: string) => {
        if (val) {
          const { bg, text, border } = getColorClassForDate(val.split('T')[0]);
          return (
            <button
              className={`text-sm px-2 py-1 rounded ${bg} ${text} ${border} border cursor-default`}
            >
              {val.split('T')[0]}
            </button>
          );
        }
        else{
          return <span className="text-red-500">Not replied yet.</span>
        }
      },
    },
    {
      title: "Action",
      key: "_id",
      dataIndex: "_id",
      width: "10%",
      align: "center" as const,
      render: (contactId: string, contact: TContact) => (
        <div className="flex justify-center gap-2">
          <ViewContactModal contact={contact}/>
          {contact?.replyText ? (
            <button className="bg-blue-300 hover:bg-blue-400 p-2 text-white rounded-full cursor-not-allowed">
              <Reply size={18} />
            </button>
          ) : (
            <ReplyModal contactId={contactId} />
          )}
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
      <div className="w-full overflow-auto px-4">
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          rowKey="_id"
          sticky
          scroll={{ y: "calc(100vh - 324px)" }}
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

export default ContactTable;
