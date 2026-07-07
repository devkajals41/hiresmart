function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const styles = {
    primary:
      "bg-emerald-700 hover:bg-emerald-800 text-white",

    secondary:
      "bg-white border border-gray-300 text-gray-800 hover:bg-gray-100",
  };

  return (
    <button
      className={`
        px-6 py-3
        rounded-xl
        font-medium
        transition-all
        duration-300
        ${styles[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;