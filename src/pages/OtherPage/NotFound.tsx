import { Link } from "react-router";
import PageMeta from "../../components/common/PageMeta";

export default function NotFound() {
  return (
    <>
      <PageMeta title="404 - Not Found" description="" />

      <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden">

        <div className="absolute w-[400px] h-[400px] rounded-full bg-[#12033A]/5 dark:bg-[#12033A]/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 mx-auto w-full max-w-[480px] text-center">

          <h1 className="text-[120px] sm:text-[160px] font-bold leading-none text-[#12033A]/10 dark:text-white/5 select-none">
            404
          </h1>
          <div className="w-16 h-16 rounded-2xl bg-[#12033A] flex items-center justify-center mx-auto -mt-8 mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            Page not found
          </h2>
          <p className="text-sm text-gray-400 dark:text-gray-500 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#12033A] text-white text-sm font-medium hover:bg-[#1e0a5e] transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            Back to dashboard
          </Link>

        </div>
      </div>
    </>
  );
}