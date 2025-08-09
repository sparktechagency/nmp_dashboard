
const ProfileLoading = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-md">
      {/* Admin Profile Header */}
      <div className="flex items-center mb-6">
        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Profile Image Placeholder */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-24 h-24 rounded-full bg-gray-200 animate-pulse">
          {/* Placeholder for edit icon */}
          <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-gray-300 animate-pulse"></div>
        </div>
        <div className="h-4 w-24 bg-gray-200 rounded mt-4 animate-pulse"></div>
      </div>

      {/* Form Fields Skeleton */}
      <div className="space-y-6">
        {/* Name Field */}
        <div>
          <div className="h-4 w-20 bg-gray-200 rounded mb-2 animate-pulse"></div>
          <div className="h-10 w-full bg-gray-200 rounded-md animate-pulse"></div>
        </div>

        {/* Email Field */}
        <div>
          <div className="h-4 w-24 bg-gray-200 rounded mb-2 animate-pulse"></div>
          <div className="h-10 w-full bg-gray-200 rounded-md animate-pulse"></div>
        </div>

        {/* Phone Number Field */}
        <div>
          <div className="h-4 w-32 bg-gray-200 rounded mb-2 animate-pulse"></div>
          <div className="h-10 w-full bg-gray-200 rounded-md animate-pulse"></div>
        </div>
      </div>

      {/* Save Changes Button Skeleton */}
      <div className="mt-8 flex justify-center">
        <div className="h-10 w-48 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
};

export default ProfileLoading;