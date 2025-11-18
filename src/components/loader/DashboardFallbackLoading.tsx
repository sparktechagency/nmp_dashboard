import IncomeOverviewLoading from "./IncomeOverviewLoading"
import RecentOrderLoading from "./RecentOrderLoading"
import StatsLoading from "./StatsLoading"
import UserOverviewLoading from "./UserOverviewLoading"

const DashboardFallbackLoading = () => {
    return (
        <>
            <div>
                <StatsLoading />
                <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4">
                    <IncomeOverviewLoading />
                    <UserOverviewLoading />
                </div>
                <div className="mt-4">
                    <RecentOrderLoading />
                </div>
            </div>
        </>
    )
}

export default DashboardFallbackLoading