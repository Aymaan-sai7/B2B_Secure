import { motion, AnimatePresence } from "framer-motion";
import { overlay, modal } from "../../../components/animations/animation";
import useCompanyReport from "../UseReport/CompanyUseReport";
import ReportSections from "../ReportSections/CompanyReportSection";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}



export default function CompanyReportModal({ isOpen, onClose }: Props) {
  const {rows,loading,stats,handleDownloadCSV,handleDownloadPDF,
  } = useCompanyReport(isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          variants={overlay}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            variants={modal}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FFFFFF] dark:bg-[#1E1E1E] border border-[#E7E6EB] dark:border-[#5C5C5C] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 no-scrollbar"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-semibold text-[#12033A] dark:text-[#F3F4F6]">Companies Report</h2>
                <p className="text-xs text-[#9B9B9F] mt-0.5">Full overview of all registered companies</p>
              </div>
              <button
                title="close"
                onClick={onClose}
                className="text-[#9B9B9F] hover:text-[#12033A] dark:hover:text-[#F3F4F6] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-12 bg-[#F1F3FA] dark:bg-white/5 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : (
              <>
  <ReportSections
  rows={rows}
  stats={stats}
  handleDownloadCSV={handleDownloadCSV}
  handleDownloadPDF={handleDownloadPDF}
/>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}