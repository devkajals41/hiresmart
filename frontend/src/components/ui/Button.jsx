function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}) {
  const variants = {
    primary: `
      bg-emerald-700
      text-white
      shadow-md shadow-emerald-200/70
      hover:bg-emerald-800
      hover:-translate-y-0.5
      hover:shadow-xl hover:shadow-emerald-300/40
    `,

    secondary: `
      bg-white
      border border-slate-200
      text-slate-800
      hover:bg-slate-50
      hover:border-slate-300
      hover:-translate-y-0.5
      hover:shadow-lg
    `,
  };

  return (
    <button
      type={type}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2

        rounded-xl

        px-6
        py-3

        text-[15px]
        font-semibold

        transition-all
        duration-300
        ease-out

        focus:outline-none
        focus:ring-4
        focus:ring-emerald-200

        disabled:cursor-not-allowed
        disabled:opacity-60

        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
