import TypeList from "../../components/type/TypeList"

const TypesPage = () => {
  return (
    <>
       <div>
        <div className="bg-white shadow rounded-lg h-full overflow-hidden">
          <div className="w-full h-full flex flex-col">
            <TypeList/>
          </div>
        </div>
      </div>
    </>
  )
}

export default TypesPage