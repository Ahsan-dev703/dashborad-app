import { motion } from "framer-motion";
import { X } from "lucide-react";

const Modal = ({
  open,
  title,
  description,
  children,
  onClose,
  footer,
  className = "",
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6">
      <motion.div
        className={`w-full max-w-2xl rounded-3xl bg-slate-900 border border-gray-700 p-6 shadow-2xl ${className}`}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h3 className="text-2xl font-semibold text-white">{title}</h3>
            {description && (
              <p className="text-sm text-gray-400">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-gray-700 bg-gray-800 p-2 text-gray-300 hover:border-white hover:text-white"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div>{children}</div>

        {footer && (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            {footer}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Modal;
