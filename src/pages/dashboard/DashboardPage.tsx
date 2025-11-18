import { Suspense } from "react";
import RecentOrderList from "../../components/dashboard/RecentOrderList";
import StatsSection from "../../components/dashboard/StatsSection";
import IncomeOverviewChart from "../../components/summary/IncomeOverviewChart";
import UserOverviewChart from "../../components/summary/UserOverviewChart";
import DashboardFallbackLoading from "../../components/loader/DashboardFallbackLoading";


const DashboardPage = () => {
  return (
    <>
      <div>
        <Suspense fallback={<DashboardFallbackLoading />}>
          <StatsSection />
          <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4">
            <IncomeOverviewChart />
            <UserOverviewChart />
          </div>
          <div className="mt-4">
            <RecentOrderList />
          </div>
        </Suspense>
      </div>
    </>
  );
}

export default DashboardPage