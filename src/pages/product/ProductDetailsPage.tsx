import { useParams } from "react-router-dom";
import ProductDetails from "../../components/product/ProductDetails"
import { useGetSingleProductQuery } from "../../redux/features/product/productApi";
import SingleProductLoading from "../../components/loader/SingleProductLoading";
import ServerErrorCard from "../../components/card/ServerErrorCard";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetSingleProductQuery(id);
  const product = data?.data?.product || {};

  if (isLoading) {
    return <SingleProductLoading />
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
        <ProductDetails product={product}/>
      </>
    )
  }
}

export default ProductDetailsPage