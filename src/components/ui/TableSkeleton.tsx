const TableSkeleton = () => {
  return (
    <div className="animate-pulse p-4">
      
      {/* Header */}
      <div className="grid grid-cols-6 gap-4 mb-6">
        <div className="h-3 w-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>

      {/* Rows */}
      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="grid grid-cols-6 gap-4 items-center">
            
            {/* ID */}
            <div className="h-3 w-24 rounded skeleton"></div>

            {/* Company 1 */}
            <div className="h-3 w-24 rounded skeleton"></div>

            {/* Company 2 */}
            <div className="h-3 w-24 rounded skeleton"></div>

            {/* Date */}
            <div className="h-3 w-24 rounded skeleton"></div>

            {/* Status (pill) */}
            <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>

            {/* Actions (2 icons) */}
            <div className="flex gap-2">
              <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;