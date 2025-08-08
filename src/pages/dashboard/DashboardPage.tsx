import RecentOrderList from "../../components/dashboard/RecentOrderList";
import StatsSection from "../../components/dashboard/StatsSection";
import IncomeOverviewChart from "../../components/summary/IncomeOverviewChart";
import UserOverviewChart from "../../components/summary/UserOverviewChart";


const DashboardPage = () => {
  return (
    <>
      <div>
        <StatsSection/>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4">
          <IncomeOverviewChart/>
          <UserOverviewChart/>
        </div>
         <div className="mt-4">
          <RecentOrderList/>
         </div>
      </div>
    </>
  );
}

export default DashboardPage