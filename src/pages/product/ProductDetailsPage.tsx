import ProductDetails from "../../components/product/ProductDetails"
//
const ProductDetailsPage = () => {
  //const { id } = useParams();
  //const { data, isLoading, isError } = useGetSingleProductQuery(id);
  //const product = data?.data?.product || {};
  const product = {
    "_id": "6892dd11a837a73e81115b93",
    "name": "Gaming Headset",
    "categoryId": "6891c97cca166f12802bd669",
    "categoryName": "Headphone",
    "currentPrice": 100,
    "originalPrice": 200,
    "discount": "",
    "ratings": 0,
    "totalReview": 0,
    "images": [
      "https://res.cloudinary.com/dwok2hmb7/image/upload/v1754717935/MTK-Ecommerce/imwdxcwasz57rrf8xoab.jpg"
    ],
    "description": "<p><strong><u>description</u></strong><br></p>",
    "status": "visible",
    "stockStatus": "in_stock"
  }

  return (
    <>
      <ProductDetails product={product} />
    </>
  )

  // if (isLoading) {
  //   return <SingleProductLoading />
  // }

  // if (!isLoading && isError) {
  //   return <ServerErrorCard />
  // }

  // if (!isLoading && !isError && !product?._id) {
  //   return <h1>Product Not Found</h1>
  // }

  // if (!isLoading && !isError && product?._id) {
  //   return (
  //     <>
  //       <ProductDetails product={product} />
  //     </>
  //   )
  // }
}

export default ProductDetailsPage