import PageMeta from "../components/common/PageMeta";
import { LanguageToggle } from "../components/common/LanguageToggle";
import { motion } from "framer-motion";




export default function Transaction() {
  return (<>
  <PageMeta
        title="Setting"
        description="Setting"
      />
    <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6"
>
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            System Setting
    <LanguageToggle/>
          </h3>
        </div>

      </div>
    </motion.div>
    </>)
}