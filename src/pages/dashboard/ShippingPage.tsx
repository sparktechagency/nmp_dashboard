import ShippingList from "../../components/shipping/ShippingList"

const ShippingPage = () => {
  return (
    <>
       <div>
        <div className="bg-white shadow rounded-lg h-full overflow-hidden">
          <div className="w-full h-full flex flex-col">
            <ShippingList/>
          </div>
        </div>
      </div>
    </>
  )
}

export default ShippingPage