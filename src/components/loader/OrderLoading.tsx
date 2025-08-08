const OrderLoading = () => {
  return (
    <div className="bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto">
        {/* Header Section */}
        <div className="mb-6">
          {/* Back to Orders */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Order Title and Status */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="w-40 h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="w-56 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex gap-2">
              <div className="w-20 h-6 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-16 h-6 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Status and Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status Card */}
            <div className="bg-white rounded-lg border p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-24 h-5 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Status Timeline */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse flex-shrink-0 mt-1"></div>
                  <div className="flex-1">
                    <div className="w-32 h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                    <div className="w-40 h-3 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse flex-shrink-0 mt-1"></div>
                  <div className="flex-1">
                    <div className="w-20 h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                    <div className="w-28 h-3 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items Card */}
            <div className="bg-white rounded-lg border p-6">
              <div className="w-28 h-5 bg-gray-200 rounded animate-pulse mb-6"></div>

              {/* Item 1 */}
              <div className="flex items-center gap-4 p-4 border-b">
                <div className="w-16 h-16 bg-gray-200 rounded animate-pulse flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="w-20 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="w-12 h-3 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="text-right">
                  <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-center gap-4 p-4">
                <div className="w-16 h-16 bg-gray-200 rounded animate-pulse flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="w-28 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-10 h-3 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-3 h-3 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="w-8 h-3 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="w-12 h-3 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="text-right">
                  <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary and Information */}
          <div className="space-y-6">
            {/* Order Summary Card */}
            <div className="bg-white rounded-lg border p-6">
              <div className="w-28 h-5 bg-gray-200 rounded animate-pulse mb-6"></div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="flex justify-between">
                  <div className="w-14 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-8 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="flex justify-between">
                  <div className="w-6 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-10 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <div className="w-10 h-5 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-16 h-5 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Information Card */}
            <div className="bg-white rounded-lg border p-6">
              <div className="w-36 h-5 bg-gray-200 rounded animate-pulse mb-6"></div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 bg-gray-200 rounded animate-pulse mt-1 flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="w-16 h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                    <div className="w-48 h-3 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 bg-gray-200 rounded animate-pulse mt-1 flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="w-20 h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                    <div className="w-40 h-3 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 bg-gray-200 rounded animate-pulse mt-1 flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="w-24 h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                    <div className="w-12 h-3 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Card */}
            {/* <div className="bg-white rounded-lg border p-6">
              <div className="w-14 h-5 bg-gray-200 rounded animate-pulse mb-6"></div>

              <div className="space-y-3">
                <div className="w-full h-10 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-full h-10 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-full h-10 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}


export default OrderLoading;