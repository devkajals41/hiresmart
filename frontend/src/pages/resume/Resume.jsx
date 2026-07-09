import DashboardLayout from "../../components/layout/DashboardLayout";

import ResumeUploadCard from "./ResumeUploadCard";
import ResumeFeaturesCard from "./ResumeFeaturesCard";
import ResumeTipsCard from "./ResumeTipsCard";

import resumeBanner from "../../assets/illustrations/resumebanner.png";

import { FileText, Star, Rocket, Zap } from "lucide-react";

const floatKeyframes = `
@keyframes float1 {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-18px) rotate(8deg); }
}
@keyframes float2 {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-14px) rotate(-6deg); }
}
@keyframes float3 {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-10px) scale(1.15); }
}
@keyframes pulse-ring {
  0% { transform: scale(0.8); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 0.2; }
  100% { transform: scale(0.8); opacity: 0.5; }
}
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
`;

export default function Resume() {
  return (
    <DashboardLayout>
      <style>{floatKeyframes}</style>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-2">
          <div>
            <div className="mb-2 flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100">
                <FileText size={24} className="text-emerald-700" />
              </div>

              <h1 className="text-[44px] font-extrabold tracking-tight text-slate-900">
                My Resume
              </h1>
            </div>

            <p className="mt-2 text-[17px] leading-7 text-slate-500">
              Upload your resume to get AI-powered analysis and improve your
              profile.
            </p>
          </div>

          <img
            src={resumeBanner}
            alt="Resume Banner"
            className="h-[170px] object-contain select-none"
          />
        </div>

        {/* Main Grid */}

        <div className="grid grid-cols-12 gap-6">
          {/* Upload */}

          <div className="col-span-8 h-full">
            <ResumeUploadCard />
          </div>

          {/* Right Card */}

          <div className="col-span-4 h-full">
            <ResumeFeaturesCard />
          </div>

          {/* Bottom Left */}

          <div className="col-span-8 h-full">
            <ResumeTipsCard />
          </div>

          {/* Bottom Right - Decorative Animated Card */}

          <div className="col-span-4 h-full">
            <div
              className="relative h-full min-h-[430px] overflow-hidden rounded-3xl shadow-[0_8px_40px_rgba(15,23,42,0.06)]"
              style={{
                background:
                  "linear-gradient(135deg, #065f46 0%, #059669 40%, #34d399 70%, #a7f3d0 100%)",
              }}
            >
              {/* Animated background shapes */}
              <div
                className="absolute top-4 right-5 h-20 w-20 rounded-full opacity-20"
                style={{
                  background:
                    "radial-gradient(circle, #ffffff 0%, transparent 70%)",
                  animation: "pulse-ring 3s ease-in-out infinite",
                }}
              />
              <div
                className="absolute bottom-12 left-4 h-16 w-16 rounded-full opacity-15"
                style={{
                  background:
                    "radial-gradient(circle, #ffffff 0%, transparent 70%)",
                  animation: "pulse-ring 4s ease-in-out infinite 1s",
                }}
              />
              <div
                className="absolute top-1/2 right-1/3 h-24 w-24 rounded-full opacity-10"
                style={{
                  background:
                    "radial-gradient(circle, #ffffff 0%, transparent 70%)",
                  animation: "pulse-ring 5s ease-in-out infinite 0.5s",
                }}
              />

              {/* Content */}
              <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 py-10 text-center">
                {/* Floating icons */}
                <div className="mb-6 flex items-center gap-5">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm"
                    style={{ animation: "float1 3s ease-in-out infinite" }}
                  >
                    <Star size={20} className="text-white" />
                  </div>
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/25 backdrop-blur-sm"
                    style={{ animation: "float3 4s ease-in-out infinite 0.3s" }}
                  >
                    <Rocket size={28} className="text-white" />
                  </div>
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm"
                    style={{
                      animation: "float2 3.5s ease-in-out infinite 0.6s",
                    }}
                  >
                    <Zap size={20} className="text-white" />
                  </div>
                </div>

                {/* Text */}
                <h3 className="text-xl font-bold text-white">
                  Land Your Dream Job
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-emerald-100">
                  Your journey to a standout career starts with a great resume.
                </p>

                {/* Shimmer bar */}
                <div
                  className="mt-6 h-1.5 w-24 rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 2.5s linear infinite",
                  }}
                />

                {/* Stats row */}
                <div className="mt-6 flex gap-4">
                  <div className="rounded-xl bg-white/15 px-4 py-2.5 backdrop-blur-sm">
                    <p className="text-lg font-bold text-white">95%</p>
                    <p className="text-[10px] text-emerald-100">
                      ATS Pass Rate
                    </p>
                  </div>
                  <div className="rounded-xl bg-white/15 px-4 py-2.5 backdrop-blur-sm">
                    <p className="text-lg font-bold text-white">3x</p>
                    <p className="text-[10px] text-emerald-100">
                      More Interviews
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
