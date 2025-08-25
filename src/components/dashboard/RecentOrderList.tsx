import { useNavigate } from "react-router-dom";
import RecentOrderTable from "./RecentOrderTable";
import { useGetOrdersQuery } from "../../redux/features/order/orderApi";
import ServerErrorCard from "../card/ServerErrorCard";
import RecentOrdersLoading from "../loader/RecentOrdersLoading";

const RecentOrderList = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetOrdersQuery([
    { name: "page", value: 1 },
    { name: "limit", value: 5 },
  ]);


  const orders = data?.data || [];

  let content: React.ReactNode;


  if (isLoading) {
    content = <RecentOrdersLoading />;
  }

  if (!isLoading && !isError) {
    content = (
      <RecentOrderTable
        orders={orders}
      />
    );
  }

  if (!isLoading && isError) {
    content = <ServerErrorCard />;
  }

   return (
    <div className="w-full mx-auto bg-white p-4 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Recent Orders</h1>
        <button onClick={()=>navigate('/orders')} className="text-sm text-blue-600 hover:underline">View All</button>
      </div>
      {content}
    </div>
  )
};

export default RecentOrderList;
