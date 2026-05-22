interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
  variant?: "danger" | "warning" | "success";
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  onClose,
  onConfirm,
  variant = "danger",
}: ConfirmModalProps) {

  const variantStyles = {
    danger:  "bg-[#FF4951] hover:bg-[#E63B44]",
    warning: "bg-[#E2AE21] hover:bg-[#C99B1E]",
    success: "bg-[#04BE7B] hover:bg-[#03A86E]",
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

      {/* Modal */}
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-[#161616] p-6 shadow-xl border border-[#E7E6EB] dark:border-[#5C5C5C]">

        {/* Title */}
        <h2 className="text-lg font-semibold text-[#12033A] dark:text-white">
          {title}
        </h2>

        {/* Message */}
        <p className="mt-2 text-sm text-[#9B9B9F]">
          {message}
        </p>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">

          {/* Cancel */}
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-[#E7E6EB] dark:border-[#5C5C5C] text-sm font-medium hover:bg-[#F1F3FA] dark:hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>

          {/* Confirm */}
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-xl text-white text-sm font-medium transition-colors ${variantStyles[variant]}`}
          >
            Confirm
          </button>

        </div>
      </div>
    </div>
  );
}