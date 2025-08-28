import FeatureProductList from "../../components/FeatureProducts/FeatureProductList";

const FeatureProductsPage = () => {

  return (
    <>
      <div>
        <div className="bg-white rounded-lg shadow h-full overflow-hidden">
          <div className="w-full h-full flex flex-col">
           <FeatureProductList/>
          </div>
        </div>
      </div>
    </>
  )
}

export default FeatureProductsPage;