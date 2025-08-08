import BrandList from "../../components/brand/BrandList"

const FlavorPage = () => {
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

export default FlavorPage