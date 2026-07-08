export default function AuthLayout({ children, illustration }) {
  return (
    <div className="min-h-screen bg-[#FCFCFB] flex">

      {/* LEFT — Form */}
      <div className="flex w-full lg:w-[45%] items-start justify-center bg-white">

        <div className="w-full max-w-md px-10 py-8 lg:py-10">

          {children}

        </div>

      </div>

      {/* RIGHT — Illustration */}
      <div className="hidden lg:flex w-[55%]">
        {illustration}
      </div>

    </div>
  );
}