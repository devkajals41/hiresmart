import { useSelector } from "react-redux";
import {
  Upload,
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingUp,
  FileText,
  MessageSquare,
  Mic,
  Target,
  CheckCircle,
} from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { selectUser } from "../../features/auth/authSelectors";

// Main illustrations from assets
import topIllustration from "../../assets/illustrations/topillusdash.png";
import bottomIllustration from "../../assets/illustrations/bottomillusdash.png";

export default function Dashboard() {
  const reduxUser = useSelector(selectUser);

  // Parse active user name from localStorage
  let localUser = null;
  try {
    const stored = localStorage.getItem("user");
    if (stored) localUser = JSON.parse(stored);
  } catch (error) {
    console.error("Error reading user details:", error);
  }

  const displayName = localUser?.name || reduxUser?.name || localUser?.username || reduxUser?.username || "Kajal Sharma";


  return (
    <DashboardLayout>
      {/* 1. Header greeting area with illustration */}
      <div className="bg-gradient-to-r from-emerald-50/50 to-teal-50/20 border border-slate-100 rounded-2xl p-5 flex items-center justify-between h-[105px] shrink-0 overflow-hidden relative shadow-sm">
        <div className="shrink-0">
          <h2 className="auth-heading text-[26px] leading-tight">
            Welcome back, {displayName}!
          </h2>
          <p className="auth-subheading text-[13.5px] mt-0.5">
            Let's continue improving your profile.
          </p>
        </div>

        {/* Top greeting illustration banner */}
        <img
          src={topIllustration}
          alt="Welcome illustration"
          className="h-[105px] object-contain self-end shrink-0 select-none pointer-events-none"
        />
      </div>

      {/* 2. Top row metrics cards */}
      <div className="grid grid-cols-4 gap-4 h-[115px] shrink-0">
        {/* Card 1: ATS Score */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex flex-col justify-between h-full">
            <div className="flex items-center gap-2 text-slate-400">
              <TrendingUp size={16} className="text-emerald-600" />
              <span className="text-[12px] font-semibold tracking-wide">ATS Score</span>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-[28px] font-extrabold text-slate-800 leading-none">78</span>
                <span className="text-[14px] font-semibold text-slate-400">/ 100</span>
              </div>
              <span className="inline-block mt-2 px-2 py-0.5 text-[10px] font-bold text-emerald-800 bg-emerald-50 rounded-full">
                ● Good Score
              </span>
            </div>
          </div>

          <div className="relative h-16 w-16 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="26"
                className="stroke-slate-100"
                strokeWidth="5.5"
                fill="transparent"
              />
              <circle
                cx="32"
                cy="32"
                r="26"
                className="stroke-emerald-600"
                strokeWidth="5.5"
                fill="transparent"
                strokeDasharray={163.3}
                strokeDashoffset={163.3 * (1 - 0.78)}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-[12px] font-bold text-slate-700">78%</span>
          </div>
        </div>

        {/* Card 2: Resume Uploaded */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex flex-col justify-between h-full">
            <div className="flex items-center gap-2 text-slate-400">
              <FileText size={16} className="text-teal-600" />
              <span className="text-[12px] font-semibold tracking-wide">Resume Uploaded</span>
            </div>
            <div>
              <span className="text-[28px] font-extrabold text-slate-800 leading-none block mt-1">1</span>
              <div className="flex items-center gap-1.5 mt-2.5">
                <span className="text-[10px] text-slate-400 font-medium">Last updated 2 days ago</span>
                <CheckCircle size={12} className="text-emerald-500 fill-emerald-50" />
              </div>
            </div>
          </div>

          <div className="h-14 w-12 border border-slate-100 bg-slate-50/50 rounded-lg flex items-center justify-center shadow-inner relative shrink-0">
            <FileText size={20} className="text-slate-300" />
            <div className="absolute -bottom-1 -right-1 h-4.5 w-4.5 bg-emerald-500 rounded-full flex items-center justify-center border border-white">
              <CheckCircle size={10} className="text-white" />
            </div>
          </div>
        </div>

        {/* Card 3: Mock Interviews */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex flex-col justify-between h-full">
            <div className="flex items-center gap-2 text-slate-400">
              <Mic size={16} className="text-orange-500" />
              <span className="text-[12px] font-semibold tracking-wide">Mock Interviews</span>
            </div>
            <div>
              <span className="text-[28px] font-extrabold text-slate-800 leading-none block mt-1">2</span>
              <span className="text-[10px] text-slate-400 font-medium block mt-2.5">Interviews taken</span>
            </div>
          </div>

          <div className="w-16 h-10 self-end mb-1 shrink-0">
            <svg className="w-full h-full">
              <path
                d="M 5,30 Q 20,20 35,28 T 65,10"
                fill="transparent"
                stroke="#f97316"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="65" cy="10" r="3.5" className="fill-orange-500 stroke-white" strokeWidth="1" />
            </svg>
          </div>
        </div>

        {/* Card 4: AI Feedback */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex flex-col justify-between h-full">
            <div className="flex items-center gap-2 text-slate-400">
              <MessageSquare size={16} className="text-cyan-500" />
              <span className="text-[12px] font-semibold tracking-wide">AI Feedback</span>
            </div>
            <div>
              <span className="text-[28px] font-extrabold text-slate-800 leading-none block mt-1">1</span>
              <span className="text-[10px] text-slate-400 font-medium block mt-2.5">Feedback received</span>
            </div>
          </div>

          <div className="w-16 h-10 self-end mb-1 shrink-0">
            <svg className="w-full h-full">
              <path
                d="M 5,30 Q 18,28 32,18 T 65,12"
                fill="transparent"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="65" cy="12" r="3.5" className="fill-emerald-500 stroke-white" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </div>

      {/* 3. Middle split columns */}
      <div className="grid grid-cols-5 gap-4">
        {/* Left Column: Recent Activity (Grid cols: 3) */}
        <div className="col-span-3 bg-white rounded-2xl border border-slate-100 p-4 flex flex-col justify-between shadow-sm min-h-0">
          <div>
            <div className="flex items-center gap-2 mb-3 border-b border-slate-50 pb-2.5">
              <Calendar size={18} className="text-emerald-700" />
              <h3 className="text-[15px] font-bold text-slate-800">Recent Activity</h3>
            </div>

            {/* List entries (Shows last 4-5 items as per mockups) */}
            <div className="space-y-3">
              {/* Item 1 */}
              <div className="flex items-center justify-between text-[13px] hover:bg-slate-50/50 p-1.5 rounded-lg transition">
                <div className="flex items-center gap-3">
                  <div className="flex h-8.5 w-8.5 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 shrink-0">
                    <Upload size={15} />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-700 leading-none">Resume uploaded</h5>
                    <p className="text-[11px] text-slate-400 mt-1">Frontend Developer Resume.pdf</p>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-slate-400 mr-1">2 days ago</span>
              </div>

              {/* Item 2 */}
              <div className="flex items-center justify-between text-[13px] hover:bg-slate-50/50 p-1.5 rounded-lg transition">
                <div className="flex items-center gap-3">
                  <div className="flex h-8.5 w-8.5 items-center justify-center rounded-xl bg-purple-50 text-purple-600 shrink-0">
                    <Sparkles size={15} />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-700 leading-none">AI feedback generated</h5>
                    <p className="text-[11px] text-slate-400 mt-1">Resume review completed</p>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-slate-400 mr-1">2 days ago</span>
              </div>

              {/* Item 3 */}
              <div className="flex items-center justify-between text-[13px] hover:bg-slate-50/50 p-1.5 rounded-lg transition">
                <div className="flex items-center gap-3">
                  <div className="flex h-8.5 w-8.5 items-center justify-center rounded-xl bg-orange-50 text-orange-600 shrink-0">
                    <Mic size={15} />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-700 leading-none">Mock interview completed</h5>
                    <p className="text-[11px] text-slate-400 mt-1">System Design Round</p>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-slate-400 mr-1">3 days ago</span>
              </div>

              {/* Item 4 */}
              <div className="flex items-center justify-between text-[13px] hover:bg-slate-50/50 p-1.5 rounded-lg transition">
                <div className="flex items-center gap-3">
                  <div className="flex h-8.5 w-8.5 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 shrink-0">
                    <TrendingUp size={15} />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-700 leading-none">ATS score improved</h5>
                    <p className="text-[11px] text-slate-400 mt-1">Previous score: 72 → New score: 78</p>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-slate-400 mr-1">3 days ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Next Steps (Grid cols: 2) */}
        <div className="col-span-2 bg-white rounded-2xl border border-slate-100 p-4 flex flex-col justify-between shadow-sm min-h-0">
          <div className="flex items-center gap-2 mb-3 border-b border-slate-50 pb-2.5">
            <Target size={18} className="text-emerald-700" />
            <h3 className="text-[15px] font-bold text-slate-800">Next Steps</h3>
          </div>

          {/* Action cards list */}
          <div className="space-y-3 flex-1 flex flex-col justify-around">
            {/* Step 1: Improve Resume */}
            <div className="bg-slate-50/60 hover:bg-slate-50 border border-slate-100 rounded-xl p-2.5 flex items-center justify-between gap-4 transition duration-200">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 shrink-0">
                  <FileText size={15} />
                </div>
                <div>
                  <h6 className="text-[12.5px] font-bold text-slate-700">Improve Your Resume</h6>
                  <p className="text-[10px] text-slate-400 leading-tight">Get AI suggestions to make your resume stronger.</p>
                </div>
              </div>
              <button className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-white border border-slate-200 hover:bg-emerald-50 rounded-lg px-2 py-1.5 transition whitespace-nowrap">
                <span>Get Feedback</span>
                <ArrowRight size={12} />
              </button>
            </div>

            {/* Step 2: Practice Interviews */}
            <div className="bg-slate-50/60 hover:bg-slate-50 border border-slate-100 rounded-xl p-2.5 flex items-center justify-between gap-4 transition duration-200">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 shrink-0">
                  <Mic size={15} />
                </div>
                <div>
                  <h6 className="text-[12.5px] font-bold text-slate-700">Practice Interviews</h6>
                  <p className="text-[10px] text-slate-400 leading-tight">Take mock interviews and improve confidence.</p>
                </div>
              </div>
              <button className="flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-white border border-slate-200 hover:bg-amber-50 rounded-lg px-2 py-1.5 transition whitespace-nowrap">
                <span>Start Practice</span>
                <ArrowRight size={12} />
              </button>
            </div>

            {/* Step 3: Track Progress */}
            <div className="bg-slate-50/60 hover:bg-slate-50 border border-slate-100 rounded-xl p-2.5 flex items-center justify-between gap-4 transition duration-200">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 shrink-0">
                  <TrendingUp size={15} />
                </div>
                <div>
                  <h6 className="text-[12.5px] font-bold text-slate-700">Track Your Progress</h6>
                  <p className="text-[10px] text-slate-400 leading-tight">Keep improving and boost your placement rates.</p>
                </div>
              </div>
              <button className="flex items-center gap-1 text-[11px] font-bold text-indigo-800 bg-white border border-slate-200 hover:bg-indigo-50 rounded-lg px-2 py-1.5 transition whitespace-nowrap">
                <span>View Progress</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom illustration banner image */}
      <img
        src={bottomIllustration}
        alt="Small improvements today lead to big opportunities tomorrow"
        className="w-full h-[90px] rounded-2xl object-cover object-center select-none shadow-sm pointer-events-none"
      />
    </DashboardLayout>
  );
}
