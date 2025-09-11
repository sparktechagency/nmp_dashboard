import CreateProductForm from "../../components/product/CreateProductForm";

const CreateProductPage = () => {
  return (
    <>
      <div>
        <div className="bg-white rounded-lg shadow h-full overflow-hidden">
          <div className="w-full h-full flex flex-col">
            <div className="p-4 flex justify-between">
              <h1 className="text-xl font-semibold text-gray-900">
                Add New Product
              </h1>
            </div>
            <div className="w-full overflow-hidden p-4">
              <CreateProductForm/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateProductPage;