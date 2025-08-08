import { Table, ConfigProvider, Pagination } from "antd";
import type { IMeta } from "../../types/global.type";
import type { IColor, TColorDataSource } from "../../types/color.type";
import EditColorModal from "../modal/color/EditColorModal";
import DeleteColorModal from "../modal/color/DeleteColorModal";



type TProps = {
  colors: IColor[];
  meta: IMeta;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}


const ColorTable = ({
  colors, 
  meta,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize
}: TProps) => {

  const dataSource: TColorDataSource[] = colors?.map((color, index) => ({
    key: index,
    serial: Number(index + 1) + (currentPage - 1) * pageSize,
    _id: color?._id,
    name: color?.name,
    hexCode: color?.hexCode
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
      title: "Color",
      dataIndex: "hexCode",
      key: "hexCode",
      width: "22%",
      render: (val: string) => (
        <div
          className="w-5 h-5 rounded-full border border-gray-300"
          style={{ backgroundColor: val }}
          title={"color"}
        />
      ),
    },
    {
      title: "Hex Code",
      dataIndex: "hexCode",
      key: "hexCode2",
      width: "22%",
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "action",
      width: "15%",
      render: (val: string, record: IColor) => (
        <div className="flex items-center gap-3">
          <EditColorModal color={record} />
          <DeleteColorModal colorId={val} />
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

export default ColorTable;
