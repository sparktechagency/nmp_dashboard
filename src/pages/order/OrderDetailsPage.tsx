import { useParams } from "react-router-dom";
import ServerErrorCard from "../../components/card/ServerErrorCard";
import { useGetSingleOrderQuery } from "../../redux/features/order/orderApi";
import OrderLoading from "../../components/loader/OrderLoading";
import OrderDetails from "../../components/order/OrderDetails";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetSingleOrderQuery(id);
  const order = data?.data || {};

  if (isLoading) {
    return <OrderLoading />
  }

  if (!isLoading && isError) {
    return <ServerErrorCard />
  }

  if (!isLoading && !isError && !order?._id) {
    return <h1>Product Not Found</h1>
  }

  if (!isLoading && !isError && order?._id) {
    return (
      <>
        <OrderDetails order={order}/>
      </>
    )
  }
}

export default OrderDetailsPage