export default function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full border-4 border-[#12033A] border-t-transparent animate-spin" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Loading...</span>
      </div>
    </div>
  );
}
