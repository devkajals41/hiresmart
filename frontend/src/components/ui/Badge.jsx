import { Sparkles } from "lucide-react";

function Badge({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        inline-flex
        items-center
        gap-2

        rounded-full

        border border-emerald-200

        bg-emerald-50

        px-4
        py-2

        text-xs
        font-semibold
        uppercase
        tracking-[0.18em]

        text-emerald-700

        ${className}
      `}
    >
      <Sparkles size={14} />

      {children}
    </div>
  );
}

export default Badge;