import CategoryList from "../../components/category/CategoryList"

const CategoryPage = () => {
  return (
    <>
       <div>
        <div className="bg-white shadow rounded-lg h-full overflow-hidden">
          <div className="w-full h-full flex flex-col">
            <CategoryList/>
          </div>
        </div>
      </div>
    </>
  )
}

export default CategoryPage