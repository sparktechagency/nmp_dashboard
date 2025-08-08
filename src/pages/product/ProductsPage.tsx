import ProductList from "../../components/product/ProductList";

const ProductsPage = () => {

  return (
    <>
      <div>
        <div className="bg-white rounded-lg shadow h-full overflow-hidden">
          <div className="w-full h-full flex flex-col">
           <ProductList/>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductsPage;