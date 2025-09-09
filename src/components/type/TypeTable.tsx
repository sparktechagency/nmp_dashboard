import { Table, ConfigProvider, Pagination } from "antd";
import type { IMeta } from "../../types/global.type";
import DeleteTypeModal from "../modal/type/DeleteTypeModal";
import EditTypeModal from "../modal/type/EditTypeModal";
import type { IType, ITypeDataSource } from "../../types/type.type";



type TProps = {
  types: IType[];
  meta: IMeta;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  isFetching: boolean;
}

const TypeTable = ({
  types,
  meta,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  isFetching
}: TProps) => {

  const dataSource: ITypeDataSource[] = types?.map((type, index) => ({
    key: index,
    serial: Number(index + 1) + (meta.page - 1) * pageSize,
    _id: type?._id,
    name: type?.name
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
      render: (val: string, record: IType) => (
        <div className="flex items-center gap-3">
          <EditTypeModal type={record} />
          <DeleteTypeModal typeId={val} />
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

export default TypeTable;
