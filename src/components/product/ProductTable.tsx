import { Table, ConfigProvider, Pagination } from "antd";
import { Edit, Eye } from "lucide-react";
import type { IMeta } from "../../types/global.type";
import { Link } from "react-router-dom";
import product_placeholder from "../../assets/images/product_placeholder.png";
import type { IProduct, TProductDataSource, TProductStatus, TStockStatus } from "../../types/product.type";
import { FaStar } from "react-icons/fa";
import ChangeProductStatusModal from "../modal/product/ChangeProductStatusModal";
import ChangeStockStatusModal from "../modal/product/ChangeStockStatusModal";
import DeleteProductModal from "../modal/product/DeleteProductModal";


type TProps = {
  products: IProduct[];
  meta: IMeta,
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
};


const ProductTable = ({ products, meta, currentPage, setCurrentPage, pageSize, setPageSize }: TProps) => {

  const dataSource: TProductDataSource[] = products?.map((product, index) => ({
    key: index,
    serial: Number(index + 1) + ((currentPage - 1) * pageSize),
    _id: product?._id,
    name: product?.name,
    category: product?.category,
    brand: product?.brand,
    currentPrice: product?.currentPrice,
    originalPrice: product?.originalPrice,
    image: product?.image,
    ratings: product?.ratings,
    status: product?.status,
    stockStatus: product?.stockStatus
  }));



  const columns = [
    {
      title: "S.N.",
      dataIndex: "serial",
      key: "serial",
      width: "3%",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "title",
      width: "8.5%",
      render: (text: string) => (
        <>
          <p className="truncate">{text}</p>
        </>
      ),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: "7.5%",
      render: (val: string) => (
        <>
          {/* <img src={val} alt="icon" className="w-12 h-12 rounded-md" /> */}
          <img
            src={val}
            alt="profile"
            className="w-[45px] h-[45px] rounded-lg"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = product_placeholder;
            }}
          />
        </>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: "7%",
      render: (text: string) => (
        <>
          <p className="truncate">{text}</p>
        </>
      ),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      width: "7%",
      render: (text: string) => (
        <>
          <p className="truncate">{text}</p>
        </>
      ),
    },
    {
      title: "Price",
      dataIndex: "currentPrice",
      key: "currentPrice",
      width: "5%",
      align: 'center' as const,
      render: (val: number) => (
        <span>${val}</span>
      )
    },
    {
      title: "Original Price",
      dataIndex: "originalPrice",
      key: "originalPrice",
      width: "7%",
      align: 'center' as const,
       render: (val: number) => (
        <span>${val}</span>
      )
    },
    {
      title: "Ratings",
      dataIndex: "ratings",
      key: "ratings",
      width: "5%",
      render: (value: number) => (
        <>
          <div className="flex items-center gap-1 justify-center">
            <FaStar className="text-yellow-500" size={18} />
            <span>{value}</span>
          </div>
        </>
      )
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      render: (status: TProductStatus, record: TProductDataSource) => {
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
            <ChangeProductStatusModal productId={record?._id} status={status} />
          </div>
        );
      },
    },
    {
      title: "Stock Status",
      dataIndex: "stockStatus",
      key: "stockStatus",
      width: "10%",
      render: (status: TStockStatus, record: TProductDataSource) => {
        const statusStyles = {
          in_stock: "bg-blue-100 text-blue-800 border border-blue-300",
          stock_out: "bg-gray-200 text-gray-700 border border-gray-400",
          up_coming: "bg-yellow-100 text-yellow-800 border border-yellow-300",
        };

        const bgColor = statusStyles[status] || "bg-neutral-100 text-neutral-700 border";

        return (
          <div className="flex items-center gap-2">
            <button
              className={`${bgColor} capitalize w-28 cursor-default px-3 py-0.5 text-sm font-medium rounded-full`}
            >
              {status.replace("_", " ")}
            </button>
            <ChangeStockStatusModal productId={record?._id} stockStatus={status} />
          </div>
        );
      }
    },
    {
      title: "View",
      dataIndex: "_id",
      key: "_id",
      width: "5%",
      render: (productId: string) => (
        <div className="flex items-center gap-2">
          <Link
            to={`/product-details/${productId}`}
            className="bg-gray-600 hover:bg-gray-700 p-2 text-white rounded-full"
          >
            <Eye size={18} />
          </Link>
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "action",
      width: "7%",
      render: (productId: string) => (
        <div className="flex items-center gap-2">
          <Link
           // to={`/update-product/${productId}`}
            to={`/add-product?id=${productId}`}
            className="bg-green-600 hover:bg-green-700 p-2 text-white rounded-full"
          >
            <Edit size={18} />
          </Link>
          <DeleteProductModal productId={productId} />
        </div>
      ),
    },
  ];



  const handlePagination = (page: number, PageSize: number) => {
    setCurrentPage(page);
    setPageSize(PageSize)
  }



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

export default ProductTable;
