
export default function UserListSkeleton() {
    const skeletonCount = 5;
  
    return (
      <div className="space-y-4">
        {[...Array(skeletonCount)].map((_, index) => (
          <div
            key={index}
            className="flex items-center p-4 bg-white rounded-xl shadow animate-pulse"
          >
            <div className="w-12 h-12 bg-gray-300 rounded-full mr-4" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  