import ColorList from "../../components/color/ColorList"

const ColorsPage = () => {
  return (
    <>
       <div>
        <div className="bg-white shadow rounded-lg h-full overflow-hidden">
          <div className="w-full h-full flex flex-col">
            <ColorList/>
          </div>
        </div>
      </div>
    </>
  )
}

export default ColorsPage