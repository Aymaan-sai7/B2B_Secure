import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const overlay = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modal = {
  hidden: { y: 20, opacity: 0, scale: 0.98 },
  visible: { y: 0, opacity: 1, scale: 1 },
  exit: { y: 20, opacity: 0, scale: 0.98 },
};

export default function ModalShell({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    const original = document.body.style.overflow;

    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
          variants={overlay}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-2xl rounded-3xl bg-white dark:bg-gray-900 p-6 shadow-2xl overflow-y-auto max-h-[90vh]"
            variants={modal}
            onClick={(event) => event.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
