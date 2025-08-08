import FlavorList from "../../components/flavor/FlavorList"

const FlavorPage = () => {
  return (
    <>
       <div>
        <div className="bg-white shadow rounded-lg h-full overflow-hidden">
          <div className="w-full h-full flex flex-col">
            <FlavorList/>
          </div>
        </div>
      </div>
    </>
  )
}

export default FlavorPage