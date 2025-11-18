

export default function SingleProductLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images Skeleton */}
        <div className="space-y-4">
          {/* Main Image Skeleton */}
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-200 animate-pulse"></div>

          {/* Thumbnail Images Skeleton */}
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded-lg bg-gray-200 animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className="space-y-6">
          {/* Category Skeleton */}
          <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>

          {/* Product Name Skeleton */}
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse w-1/2"></div>
          </div>

          {/* Ratings Skeleton */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
          </div>

          {/* Price Skeleton */}
          <div className="flex items-center space-x-4">
            <div className="h-8 bg-gray-200 rounded animate-pulse w-20"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse w-16"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse w-16"></div>
          </div>

          {/* Stock Status Skeleton */}
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
          </div>

          {/* Introduction Skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          </div>

          {/* Color Selection Skeleton */}
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-12"></div>
            <div className="flex space-x-3">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              ))}
            </div>
          </div>

          {/* Size Selection Skeleton */}
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-8"></div>
            <div className="grid grid-cols-5 gap-2">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="h-10 bg-gray-200 rounded-md animate-pulse"></div>
              ))}
            </div>
          </div>

          {/* Quantity Skeleton */}
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="w-12 h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-10 h-10 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
          </div>

          {/* Action Buttons Skeleton */}
          <div className="space-y-4">
            <div className="w-full h-12 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="w-full h-12 bg-gray-200 rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Product Description Skeleton */}
      <div className="mt-16 border-t border-gray-200 pt-16">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-48 mb-6"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
        </div>
      </div>
    </div>
  )
}
