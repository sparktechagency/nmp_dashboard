export default function InformationLoading() {
  return (
    <div className="min-h-full">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column - Image Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-40"></div>
              <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Image Placeholder */}
            <div className="aspect-[4/4] bg-gray-200 rounded-lg animate-pulse"></div>
          </div>

          {/* Right Column - Information Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-32"></div>
              <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div className="space-y-6">
              {/* Title Section */}
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 bg-blue-100 rounded animate-pulse flex-shrink-0 mt-1"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                  <div className="h-5 bg-gray-200 rounded animate-pulse w-full"></div>
                </div>
              </div>

              {/* Sub Title Section */}
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 bg-blue-100 rounded animate-pulse flex-shrink-0 mt-1"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  </div>
                </div>
              </div>

              {/* Email Section */}
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 bg-gray-100 rounded animate-pulse flex-shrink-0 mt-1"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-12"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-48"></div>
                </div>
              </div>

              {/* Phone Section */}
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 bg-green-100 rounded animate-pulse flex-shrink-0 mt-1"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-14"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
                </div>
              </div>

              {/* Address Section */}
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 bg-red-100 rounded animate-pulse flex-shrink-0 mt-1"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-56"></div>
                </div>
              </div>

              {/* Instagram Link Section */}
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 bg-pink-100 rounded animate-pulse flex-shrink-0 mt-1"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
                  <div className="h-4 bg-blue-200 rounded animate-pulse w-20"></div>
                </div>
              </div>

              {/* Facebook Link Section */}
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 bg-blue-100 rounded animate-pulse flex-shrink-0 mt-1"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
                  <div className="h-4 bg-blue-200 rounded animate-pulse w-20"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
