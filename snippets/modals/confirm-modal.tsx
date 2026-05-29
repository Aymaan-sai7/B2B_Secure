import ModalShell from "./modal-shell";

interface ConfirmModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
}

export default function ConfirmModal({
  title,
  description,
  isOpen,
  onClose,
  onConfirm,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
}: ConfirmModalProps) {
  return (
    <ModalShell isOpen={isOpen} onClose={onClose}>
      <div className="space-y-5">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>

        <div className="flex flex-wrap gap-3 justify-end">
          <button
            type="button"
            className="rounded-xl border border-gray-200 px-5 py-3 text-sm text-gray-600 transition hover:border-gray-300 dark:border-gray-700 dark:text-gray-300"
            onClick={onClose}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className="rounded-xl bg-[#12033A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0e0b31]"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
