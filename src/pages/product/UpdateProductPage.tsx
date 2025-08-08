import UpdateProductForm from "../../components/product/UpdateProductForm";
import UpdateImagePreview from "../../components/product/UpdateImagePreview";
import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../../redux/features/product/productApi";
import UpdateProductLoading from "../../components/loader/UpdateProductLoading";
import ServerErrorCard from "../../components/card/ServerErrorCard";

const UpdateProductPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetSingleProductQuery(id);
  const product = data?.data?.product|| {};

  if (isLoading) {
    return <UpdateProductLoading />
  }

  if (!isLoading && isError) {
    return <ServerErrorCard />
  }

  if (!isLoading && !isError && !product?._id) {
    return <h1>Product Not Found</h1>
  }

  if (!isLoading && !isError && product?._id) {
    return (
      <>
        <div>
          <div className="bg-white rounded-lg shadow h-full overflow-hidden">
            <div className="w-full h-full flex flex-col">
              <div className="p-4 flex justify-between">
                <h1 className="text-xl font-bold text-gray-900">
                  Update Product
                </h1>
              </div>
              <div className="flex-1 overflow-hidden p-4 space-y-8">
                <UpdateImagePreview product={product}/>
                <UpdateProductForm product={product}/>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }


}

export default UpdateProductPage;