import { Table, ConfigProvider, Pagination } from "antd";
import type { IMeta } from "../../types/global.type";
import product_placeholder from "../../assets/images/product_placeholder.png";
import type { IProduct, TFeatureProductDataSource, TProductDataSource, TProductStatus, TStockStatus } from "../../types/product.type";
import ChangeProductStatusModal from "../modal/product/ChangeProductStatusModal";
import RemoveFeatureProductModal from "../modal/product/RemoveFeatureProductModal";


type TProps = {
  products: IProduct[];
  meta: IMeta,
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
};


const FeatureProductTable = ({ products, meta, currentPage, setCurrentPage, pageSize, setPageSize, loading }: TProps) => {

  const dataSource: TFeatureProductDataSource[] = products?.map((product, index) => ({
    key: index,
    serial: Number(index + 1) + ((currentPage - 1) * pageSize),
    _id: product?._id,
    name: product?.name,
    type: product?.type,
    category: product?.category,
    brand: product?.brand,
    flavor: product?.flavor,
    currentPrice: product?.currentPrice,
    originalPrice: product?.originalPrice,
    quantity: product?.quantity,
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
      width: 60,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "title",
      width: 160,
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
      width: 100,
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
      title: "Flavor",
      dataIndex: "flavor",
      key: "flavor",
      width: 90,
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
      width: 85,
      align: 'center' as const,
      render: (val: number) => (
        <span>${val}</span>
      )
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 145,
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
      title: "Action",
      dataIndex: "_id",
      key: "action",
      width: 200,
      render: (productId: string) => (
        <>
         <RemoveFeatureProductModal productId={productId}/>
        </>
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
      <div className="w-full overflow-auto px-4 overflow-x-auto sm:overflow-x-visible">
        <Table
          size="small"
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          rowKey="_id"
          sticky
          loading={loading}
          scroll={{ y: "calc(100vh - 324px)" }}
          // locale={{
          //   emptyText: (
          //     <div
          //       className="flex items-center justify-center text-gray-500"
          //       style={{ minHeight: "calc(100vh - 324px)" }}
          //     >
          //       No Products Found
          //     </div>
          //   ),
          // }}
          locale={{
            emptyText: (
              <div
                className="flex flex-col items-center justify-center text-gray-500 space-y-4"
                style={{ minHeight: "calc(100vh - 324px)" }}
              >
                {/* Illustration / Placeholder image */}
                <img
                  src={product_placeholder}
                  alt="No products"
                  className="w-24 h-24 opacity-70"
                />

                {/* Message */}
                <p className="text-lg font-medium">No Products Found</p>

                {/* Action Button */}
                {/* <Link
          to="/add-product"
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md shadow"
        >
          Add Product
        </Link> */}
              </div>
            ),
          }}
          className="employer-table min-h-[calc(100vh-324px)]"
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

export default FeatureProductTable;
