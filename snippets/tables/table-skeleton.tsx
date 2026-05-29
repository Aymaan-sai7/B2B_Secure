const TableSkeleton = () => {
  return (
    <div className="animate-pulse p-4 bg-white dark:bg-gray-900 rounded-3xl shadow-sm">
      <div className="grid grid-cols-6 gap-4 mb-6">
        <div className="h-3 w-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>

      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="grid grid-cols-6 gap-4 items-center">
            <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-6 w-20 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="flex gap-2">
              <div className="h-6 w-6 rounded bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-6 w-6 rounded bg-gray-200 dark:bg-gray-700"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
