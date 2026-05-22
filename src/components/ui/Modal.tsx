import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { overlay, modal } from "../animations/animation";
interface Props {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ isOpen, children, onClose }: Props) {


  useEffect(() => {
    const body = document.body;
    const original = body.style.overflow;

    if (isOpen) {
      body.style.overflow = "hidden";
    }

    return () => {
      body.style.overflow = original;
    };
  }, [isOpen]);


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
          variants={overlay}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-900 rounded-xl w-[500px] max-h-[90vh] overflow-y-auto p-6 shadow-2xl no-scrollbar"
            variants={modal}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}