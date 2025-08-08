import BrandList from "../../components/brand/BrandList"

const BrandsPage = () => {
  return (
    <>
       <div>
        <div className="bg-white shadow rounded-lg h-full overflow-hidden">
          <div className="w-full h-full flex flex-col">
            <BrandList/>
          </div>
        </div>
      </div>
    </>
  )
}

export default BrandsPage