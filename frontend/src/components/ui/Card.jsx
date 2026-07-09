function Card({ children, className = "", hover = true }) {
  return (
    <div
      className={`
        rounded-[var(--radius-lg)]
        bg-[var(--surface)]
        border border-[var(--border)]
        shadow-[var(--shadow-sm)]
        transition-all duration-300

        ${hover ? "hover:-translate-y-1 hover:shadow-[var(--shadow-md)]" : ""}

        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;
