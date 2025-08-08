export default function SingleBlogLoading () {
  return (
    <div className="w-full mx-auto p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
      </div>

      {/* Blog Image Skeleton */}
      <div className="w-full h-64 md:h-80 lg:h-96 bg-gray-200 rounded-lg animate-pulse mb-6 flex items-center justify-center">
        <div className="text-gray-400 text-sm">blog_img</div>
      </div>

      {/* Metadata (Tag and Date) */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="h-6 bg-blue-100 rounded-full w-28 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
      </div>

      {/* Title Skeleton */}
      <div className="mb-6">
        <div className="h-8 md:h-10 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
        <div className="h-8 md:h-10 bg-gray-200 rounded w-3/4 animate-pulse"></div>
      </div>

      {/* Content Paragraphs Skeleton */}
      <div className="space-y-4">
        {/* First paragraph */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        </div>

        {/* Second paragraph */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
        </div>

        {/* Third paragraph */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
        </div>

        {/* Fourth paragraph */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
        </div>

        {/* Fifth paragraph */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>

        {/* Sixth paragraph */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-3/5 animate-pulse"></div>
        </div>

        {/* Seventh paragraph */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
