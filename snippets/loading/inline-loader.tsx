interface InlineLoaderProps {
  label?: string;
}

export default function InlineLoader({ label = "Loading" }: InlineLoaderProps) {
  return (
    <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
      <span className="h-3.5 w-3.5 rounded-full border-2 border-[#12033A] border-t-transparent animate-spin" />
      {label}
    </div>
  );
}
