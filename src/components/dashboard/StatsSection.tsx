import money from "../../assets/images/dashboard/money.png";
import product from "../../assets/images/dashboard/product.png";
import order from "../../assets/images/dashboard/order.png";
import user from "../../assets/images/dashboard/user.png";
import { useGetStatsQuery } from "../../redux/features/dashboard/dashboardApi";
import StatsLoading from "../loader/StatsLoading";

const StatsSection = () => {
  const { data, isLoading, isError } = useGetStatsQuery(undefined);
  const stats = data?.data || {};

  if (isLoading) {
    return <StatsLoading />;
  }

  if (!isLoading && isError) {
    return <h1 className="text-lg text-red-500">Server Error Occured</h1>;
  }

  if (!isLoading && !isError && stats) {
    return (
      <div className="w-full bg-gray-100">
        <div className="w-full mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <img src={user} alt="job" className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{stats?.totalUsers}</p>
                <p className="text-sm text-gray-500">Total Users</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                <img src={order} alt="job" className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{stats?.completedOrders}</p>
                <p className="text-sm text-gray-500">Order Completed</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
                <img src={money} alt="money" className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">${stats?.totalIncome}</p>
                <p className="text-sm text-gray-500">Total Income</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                <img src={product} alt="job" className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{stats?.totalProducts}</p>
                <p className="text-sm text-gray-500">Total Products</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

   return (
      <div className="w-full bg-gray-100">
        <div className="w-full mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <img src={user} alt="job" className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{stats?.totalUsers}</p>
                <p className="text-sm text-gray-500">Total Users</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                <img src={order} alt="job" className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{stats?.completedOrders}</p>
                <p className="text-sm text-gray-500">Order Completed</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
                <img src={money} alt="money" className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">${stats?.totalIncome}</p>
                <p className="text-sm text-gray-500">Total Income</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                <img src={product} alt="job" className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">${stats?.totalProducts}</p>
                <p className="text-sm text-gray-500">Total Products</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default StatsSection;
