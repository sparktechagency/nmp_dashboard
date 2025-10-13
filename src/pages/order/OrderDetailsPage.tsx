import { useParams } from "react-router-dom";
import OrderDetails from "../../components/order/OrderDetails";
import { useGetSingleOrderQuery } from "../../redux/features/order/orderApi";
import OrderLoading from "../../components/loader/OrderLoading";
import ServerErrorCard from "../../components/card/ServerErrorCard";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import AuthenticationCard from "../../components/card/AuthenticationCard";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetSingleOrderQuery(id);
  const order = data?.data || {};
  const fetchError = error as FetchBaseQueryError;

  if (isLoading) {
    return <OrderLoading />
  }

  if (!isLoading && isError && fetchError?.status===404) {
    return <h1>Order Not Found</h1>
  }
  if (!isLoading && isError && fetchError?.status===401) {
    return <AuthenticationCard/>
  }

  if (!isLoading && isError && fetchError?.status===500) {
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