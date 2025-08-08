import OrderList from "../../components/order/OrderList";

const OrdersPage = () => {

  return (
    <>
      <div>
        <div className="bg-white rounded-lg shadow h-full overflow-hidden">
          <div className="w-full h-full flex flex-col">
           <OrderList/>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrdersPage;