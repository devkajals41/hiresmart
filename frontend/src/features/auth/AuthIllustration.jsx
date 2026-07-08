import { FileText, MessageSquare, TrendingUp } from "lucide-react";
import loginImage from "../../assets/illustrations/loginimage.png";
import "./auth.css";

export default function AuthIllustration() {
  return (
    <div className="relative flex flex-1 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50">

      {/* Background Blur */}
      <div className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-emerald-100 blur-3xl opacity-50" />

      <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-cyan-100 blur-3xl opacity-50" />

      {/* Dots */}
      <div className="absolute right-16 top-16 grid grid-cols-4 gap-3 opacity-30">
        {[...Array(16)].map((_, i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-emerald-400"
          />
        ))}
      </div>

      <div className="relative z-10 flex w-full flex-col justify-between px-12 py-10">

        {/* Heading */}
        <div className="max-w-lg">

          <h2 className="illustration-heading text-[38px] xl:text-[44px]">

            Analyze your resume.

            <br />

            Practice interviews.

            <br />

            <span className="text-emerald-700">
              Improve
            </span>{" "}
            yourself.

          </h2>

          <p className="auth-subheading mt-5 text-[15px] leading-7">

            All the tools you need to evaluate,
            practice and grow —
            in one place.

          </p>

        </div>

        {/* Illustration */}
        <div className="mt-4 flex flex-1 items-end justify-center min-h-[300px]">

          <img
            src={loginImage}
            alt="HireSmart Dashboard"
            className="w-full max-w-[520px] object-contain drop-shadow-2xl"
          />

        </div>

        {/* Features row */}
        <div className="mt-8 grid grid-cols-3 gap-6 border-t border-slate-100/80 pt-8">
          
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <FileText size={18} />
            </div>
            <div>
              <h4 className="text-[14px] font-bold text-slate-800 leading-tight">Analyze</h4>
              <p className="text-[12px] text-slate-400 mt-1 leading-normal">
                Get AI-powered resume analysis and score.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <MessageSquare size={18} />
            </div>
            <div>
              <h4 className="text-[14px] font-bold text-slate-800 leading-tight">Practice</h4>
              <p className="text-[12px] text-slate-400 mt-1 leading-normal">
                Answer AI-generated interview questions.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <TrendingUp size={18} />
            </div>
            <div>
              <h4 className="text-[14px] font-bold text-slate-800 leading-tight">Improve</h4>
              <p className="text-[12px] text-slate-400 mt-1 leading-normal">
                Track your progress and become interview ready.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}