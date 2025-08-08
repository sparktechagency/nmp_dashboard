export default function JobOverviewLoading () {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 w-20 bg-gray-200 rounded border animate-pulse"></div>
      </div>

      {/* Chart Container */}
      <div className="relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-80 flex flex-col justify-between text-sm text-gray-400 pr-4">
          <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-6 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Chart Area */}
        <div className="ml-12 border-l border-b border-gray-200">
          {/* Grid lines */}
          <div className="absolute ml-12 w-full h-80">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="absolute w-full border-t border-gray-100" style={{ top: `${i * 20}%` }}></div>
            ))}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute h-full border-l border-gray-100"
                style={{ left: `${(i + 1) * 8.33}%` }}
              ></div>
            ))}
          </div>

          {/* Skeleton Bars */}
          <div className="flex items-end justify-between h-80 px-4 relative">
            {/* Jan */}
            <div className="flex flex-col items-center">
              <div className="w-12 bg-gray-300 rounded-t animate-pulse mb-2" style={{ height: "90px" }}></div>
            </div>
            {/* Feb */}
            <div className="flex flex-col items-center">
              <div className="w-12 bg-gray-300 rounded-t animate-pulse mb-2" style={{ height: "80px" }}></div>
            </div>
            {/* Mar */}
            <div className="flex flex-col items-center">
              <div className="w-12 bg-gray-300 rounded-t animate-pulse mb-2" style={{ height: "120px" }}></div>
            </div>
            {/* Apr */}
            <div className="flex flex-col items-center">
              <div className="w-12 bg-gray-300 rounded-t animate-pulse mb-2" style={{ height: "110px" }}></div>
            </div>
            {/* May */}
            <div className="flex flex-col items-center">
              <div className="w-12 bg-gray-300 rounded-t animate-pulse mb-2" style={{ height: "150px" }}></div>
            </div>
            {/* Jun */}
            <div className="flex flex-col items-center">
              <div className="w-12 bg-gray-300 rounded-t animate-pulse mb-2" style={{ height: "145px" }}></div>
            </div>
            {/* Jul */}
            <div className="flex flex-col items-center">
              <div className="w-12 bg-gray-300 rounded-t animate-pulse mb-2" style={{ height: "155px" }}></div>
            </div>
            {/* Aug */}
            <div className="flex flex-col items-center">
              <div className="w-12 bg-gray-300 rounded-t animate-pulse mb-2" style={{ height: "180px" }}></div>
            </div>
            {/* Sep */}
            <div className="flex flex-col items-center">
              <div className="w-12 bg-gray-300 rounded-t animate-pulse mb-2" style={{ height: "135px" }}></div>
            </div>
            {/* Oct */}
            <div className="flex flex-col items-center">
              <div className="w-12 bg-gray-300 rounded-t animate-pulse mb-2" style={{ height: "210px" }}></div>
            </div>
            {/* Nov */}
            <div className="flex flex-col items-center">
              <div className="w-12 bg-gray-300 rounded-t animate-pulse mb-2" style={{ height: "185px" }}></div>
            </div>
            {/* Dec */}
            <div className="flex flex-col items-center">
              <div className="w-12 bg-gray-300 rounded-t animate-pulse mb-2" style={{ height: "230px" }}></div>
            </div>
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between px-4 pt-4">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month) => (
              <div key={month} className="h-4 w-6 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
