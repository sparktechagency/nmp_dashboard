export default function InformationLoading() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="h-6 bg-gray-200 rounded animate-pulse w-40"></div>
        <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Contact Items */}
      <div className="space-y-6">
        {/* Email */}
        <div className="flex items-start space-x-3">
          <div className="h-5 w-5 bg-blue-200 rounded animate-pulse mt-0.5"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-12"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-48"></div>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start space-x-3">
          <div className="h-5 w-5 bg-green-200 rounded animate-pulse mt-0.5"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-12"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start space-x-3">
          <div className="h-5 w-5 bg-red-200 rounded animate-pulse mt-0.5"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-44"></div>
          </div>
        </div>
        {/* Address */}
        <div className="flex items-start space-x-3">
          <div className="h-5 w-5 bg-red-200 rounded animate-pulse mt-0.5"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-44"></div>
          </div>
        </div>
        {/* Address */}
        <div className="flex items-start space-x-3">
          <div className="h-5 w-5 bg-red-200 rounded animate-pulse mt-0.5"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-44"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
