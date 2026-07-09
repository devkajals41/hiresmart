function Container({ children, className = "" }) {
  return (
    <div
      className={`
        mx-auto
        w-full
        max-w-[1180px]

        px-5
        sm:px-6
        lg:px-8
        xl:px-10

        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Container;
