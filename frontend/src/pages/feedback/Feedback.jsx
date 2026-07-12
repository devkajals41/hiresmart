import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Download,
  Play,
  CheckCircle,
  Clock,
  AlertCircle,
  Code2,
  Users,
  Check,
  Target,
  Trophy,
  ThumbsUp,
  X,
  Sparkles,
  Info,
  Mic,
} from "lucide-react";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";

// Stagger variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

/* ──────────────────────────────────────────────
   Ambient Particle Field
   ────────────────────────────────────────────── */
function ParticleField() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const list = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 3,
      delay: Math.random() * 5,
      duration: Math.random() * 8 + 12,
    }));
    setParticles(list);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-emerald-500/10 blur-[1px]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -150 - Math.random() * 100],
            x: [0, (Math.random() - 0.5) * 60],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Circular Gauge Ring
   ────────────────────────────────────────────── */
function ScoreRing({ score, size = 160, strokeWidth = 12 }) {
  const [displayScore, setDisplayScore] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    let start = 0;
    const end = score;
    if (start === end) {
      setDisplayScore(end);
      return;
    }
    const duration = 1200;
    const stepTime = Math.abs(Math.floor(duration / end));

    const timer = setInterval(() => {
      start += 1;
      if (start >= end) {
        clearInterval(timer);
        setDisplayScore(end);
      } else {
        setDisplayScore(start);
      }
    }, Math.max(stepTime, 8));

    return () => clearInterval(timer);
  }, [score]);

  return (
    <div
      className="relative flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
    >
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-1 rounded-full"
        style={{ boxShadow: "0 0 45px 10px rgba(16,185,129,0.2)" }}
      />

      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#f1f5f9"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#10b981"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * (1 - score / 100) }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>

      <div className="absolute flex flex-col items-center">
        <span className="text-[38px] font-black leading-none text-slate-800 tracking-tight">
          {displayScore}
        </span>
        <span className="text-[10px] font-extrabold text-slate-400 mt-1 uppercase tracking-widest">
          / 100
        </span>
      </div>
    </div>
  );
}

export default function Feedback() {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [displayName, setDisplayName] = useState("Candidate");

  useEffect(() => {
    // Load dynamic user name
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const u = JSON.parse(storedUser);
        if (u.name) setDisplayName(u.name.split(" ")[0]);
      }
    } catch (e) {
      console.error(e);
    }

    // Load active session feedback from local storage
    try {
      const stored = localStorage.getItem("latest_feedback");
      if (stored) {
        setFeedback(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to load feedback data.");
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-[80vh] items-center justify-center bg-slate-50/10">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 border-4 border-slate-100 border-t-emerald-600 rounded-full animate-spin shadow-md" />
            <p className="text-slate-550 text-[14px] font-bold animate-pulse">
              Fetching AI evaluation matrix...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Fallback check if no interview was completed
  if (!feedback) {
    return (
      <DashboardLayout>
        <div className="relative min-h-full flex flex-col items-center justify-center overflow-x-hidden">
          <ParticleField />
          <div className="fixed top-24 left-64 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full bg-white rounded-3xl border border-slate-150 p-8 text-center shadow-xl space-y-5 relative z-10"
          >
            <div className="h-16 w-16 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <MessageSquare size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-[19px] font-black text-slate-805">No Feedback Report Yet</h3>
              <p className="text-[13px] text-slate-450 leading-relaxed">
                Take an AI-powered mock interview to generate automated feedback transcripts, overall ratings, and target model solutions.
              </p>
            </div>
            <button
              onClick={() => navigate("/interview")}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-[13.5px] rounded-xl shadow-lg shadow-emerald-700/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Mic size={15} />
              Take Mock Interview
            </button>
          </motion.div>
        </div>
      </DashboardLayout>
    );
  }

  // ── Map subscores from backend flat fields (with safe fallbacks) ──
  const overallScore  = feedback.overall_score  ?? 0;
  const techScore     = feedback.technical       ?? overallScore;
  const commScore     = feedback.communication   ?? overallScore;
  const confScore     = feedback.confidence      ?? overallScore;
  // Problem Solving: backend doesn't have a dedicated field, fall back to overall_score
  const probScore     = overallScore;

  const strengths   = feedback.strengths   ?? [];
  const weaknesses  = feedback.weaknesses  ?? [];
  const suggestions = feedback.suggestions ?? [];
  const breakdown   = feedback.breakdown   ?? [];

  return (
    <DashboardLayout>
      <div className="relative min-h-full flex flex-col gap-6 overflow-x-hidden">
        <ParticleField />
        
        {/* Background gradient rings */}
        <div className="fixed top-24 left-64 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-450/5 to-teal-400/5 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="fixed bottom-12 right-12 w-[400px] h-[400px] bg-gradient-to-br from-teal-400/5 to-emerald-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 relative z-10 flex-1 animate-fade-in"
        >
          {/* Header row */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200/80"
          >
            <div>
              <div className="flex items-center gap-2">
                <div className="p-1 bg-emerald-50 rounded-lg text-emerald-700">
                  <MessageSquare size={20} />
                </div>
                <span className="text-[12px] font-black uppercase text-emerald-800 tracking-wider">AI feedback</span>
              </div>
              <h2 className="text-[28px] font-black tracking-tight text-slate-805 mt-1">
                AI Feedback Report
              </h2>
              <p className="text-[13.5px] text-slate-500 font-medium mt-1">
                Review your core parameters, checklist milestones, and recommended optimization tracks.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsDetailsOpen(true)}
                className="flex items-center gap-2.5 px-4.5 py-2.5 rounded-xl border border-slate-200/80 bg-white/80 hover:bg-slate-50 text-[13px] font-extrabold text-slate-655 transition-all shadow-sm focus:outline-none"
              >
                <Play size={14} fill="currentColor" />
                View Full Interview
              </button>

              {/* Download button — disabled in V1, real PDF generation comes in V2 */}
              <button
                disabled
                title="PDF download coming in Version 2"
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-650 to-teal-650 text-white text-[13px] font-extrabold shadow-md shadow-emerald-700/10 transition-all duration-300 opacity-50 cursor-not-allowed focus:outline-none"
              >
                <Download size={14} />
                Download Report
              </button>
            </div>
          </motion.div>

          {/* 1. Overall Score Summary Banner Card */}
          <motion.div
            variants={itemVariants}
            className="rounded-3xl border border-white/60 bg-white/80 backdrop-blur-xl shadow-xl shadow-slate-100/50 overflow-hidden relative p-6 sm:p-7.5"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6.5 items-center">
              {/* Ring Left */}
              <div className="md:col-span-4 flex flex-col items-center border-r-0 md:border-r border-slate-150/70 pr-0 md:pr-8 border-dashed">
                <span className="text-[11.5px] font-extrabold text-slate-400 uppercase tracking-widest block mb-3.5">
                  Overall rating
                </span>
                <ScoreRing score={overallScore} />
              </div>

              {/* Center message */}
              <div className="md:col-span-5 text-center md:text-left space-y-3.5">
                <div className="space-y-1">
                  <h3 className="text-[22px] font-black text-slate-800 leading-tight">
                    {overallScore >= 85
                      ? `Exceptional Work, ${displayName}! 🏆`
                      : overallScore >= 75
                      ? `Great Job, ${displayName}! 🎉`
                      : `Keep Practicing, ${displayName}! 💪`}
                  </h3>
                  <p className="text-[13.5px] text-slate-500 font-medium leading-relaxed">
                    You demonstrated solid domain familiarity. Review your performance markers below to enhance your candidate rating index.
                  </p>
                </div>

                {/* AI Generated label — replaces fake ranking */}
                <div className="flex items-center justify-center md:justify-start gap-2.5">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-[11px] font-extrabold text-emerald-800 border border-emerald-150 rounded-lg">
                    <Sparkles size={11} className="animate-pulse" />
                    AI Generated Evaluation
                  </span>
                </div>
              </div>

              {/* Right drawing vector illustration */}
              <div className="md:col-span-3 flex justify-center md:justify-end pr-1 h-36">
                <svg className="w-full max-w-[200px] h-full overflow-visible" viewBox="0 0 200 140">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Grid lines */}
                  <line x1="10" y1="120" x2="190" y2="120" stroke="#f1f5f9" strokeWidth="1.5" />
                  <line x1="10" y1="90" x2="190" y2="90" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="10" y1="60" x2="190" y2="60" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="10" y1="30" x2="190" y2="30" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Gradient Area Chart */}
                  <motion.path
                    d="M 10,120 L 10,110 Q 40,90 70,85 T 130,55 Q 160,25 190,15 L 190,120 Z"
                    fill="url(#chartGrad)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1 }}
                  />

                  {/* Growth Line */}
                  <motion.path
                    d="M 10,110 Q 40,90 70,85 T 130,55 Q 160,25 190,15"
                    fill="transparent"
                    stroke="#10b981"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.4, duration: 1.5, ease: "easeOut" }}
                  />

                  {/* Pulse Dot */}
                  <motion.circle
                    cx="190"
                    cy="15"
                    r="5"
                    className="fill-emerald-500 stroke-white"
                    strokeWidth="1.5"
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />

                  {/* Success Flag banner */}
                  <g transform="translate(170, -10)">
                    <line x1="20" y1="25" x2="20" y2="5" stroke="#059669" strokeWidth="1.5" />
                    <polygon points="20,5 5,10 20,15" className="fill-emerald-600" />
                  </g>
                </svg>
              </div>
            </div>
          </motion.div>

          {/* 2. Performance Breakdown & What went well */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left Breakdown Circle Grid */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="rounded-3xl border border-white/60 bg-white/80 backdrop-blur-xl p-6.5 shadow-lg relative flex flex-col justify-between"
            >
              <div className="pb-3 border-b border-slate-150/70 mb-5">
                <h3 className="text-[15.5px] font-black text-slate-805">Performance Breakdown</h3>
                <p className="text-[11.5px] text-slate-400 font-bold mt-0.5">Rating markers out of 100</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 py-2">
                {/* Tech */}
                <div className="text-center space-y-3">
                  <div className="h-13 w-13 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center mx-auto shadow-sm shadow-emerald-50/20">
                    <Code2 size={20} />
                  </div>
                  <div>
                    <span className="text-[18px] font-black text-slate-800">{techScore}</span>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider mt-0.5">Technical</span>
                  </div>
                </div>

                {/* Communication */}
                <div className="text-center space-y-3">
                  <div className="h-13 w-13 rounded-full bg-purple-50 text-purple-750 border border-purple-100 flex items-center justify-center mx-auto shadow-sm shadow-purple-50/20">
                    <MessageSquare size={19} />
                  </div>
                  <div>
                    <span className="text-[18px] font-black text-slate-800">{commScore}</span>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider mt-0.5">Communication</span>
                  </div>
                </div>

                {/* Problem Solving — uses overall_score as proxy */}
                <div className="text-center space-y-3">
                  <div className="h-13 w-13 rounded-full bg-amber-50 text-amber-700 border border-amber-100 flex items-center justify-center mx-auto shadow-sm shadow-amber-50/20">
                    <Target size={19} />
                  </div>
                  <div>
                    <span className="text-[18px] font-black text-slate-800">{probScore}</span>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider mt-0.5">Problem Solving</span>
                  </div>
                </div>

                {/* Confidence */}
                <div className="text-center space-y-3">
                  <div className="h-13 w-13 rounded-full bg-blue-50 text-blue-700 border border-blue-100 flex items-center justify-center mx-auto shadow-sm shadow-blue-50/20">
                    <Users size={20} />
                  </div>
                  <div>
                    <span className="text-[18px] font-black text-slate-800">{confScore}</span>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider mt-0.5">Confidence</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-100 bg-slate-50/50 -mx-6.5 -mb-6.5 p-4 rounded-b-3xl flex items-start gap-2.5">
                <Info size={15} className="text-emerald-700 shrink-0 mt-0.5" />
                <p className="text-[12px] text-slate-500 leading-normal">
                  Values represent weighted semantic ratings calculated from your verbal clarity and tech depth benchmarks.
                </p>
              </div>
            </motion.div>

            {/* Right — What Went Well (from backend strengths) */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="rounded-3xl border border-white/60 bg-white/80 backdrop-blur-xl p-6.5 shadow-lg relative flex flex-col justify-between"
            >
              <div>
                <div className="pb-3 border-b border-slate-150/70 mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-[15.5px] font-black text-slate-805">What Went Well</h3>
                    <p className="text-[11.5px] text-slate-400 font-bold mt-0.5">Key diagnostic strengths</p>
                  </div>
                  <CheckCircle size={16} className="text-emerald-600" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 py-1 items-center">
                  <div className="sm:col-span-8 space-y-3">
                    {strengths.length > 0 ? (
                      strengths.map((s, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-[13px] font-semibold text-slate-650">
                          <Check size={14} className="text-emerald-500 stroke-[3.5] shrink-0 mt-1" />
                          <span>{s}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-[13px] text-slate-400 font-medium italic">No strengths data available.</p>
                    )}
                  </div>

                  {/* Thumbs up badge graphic */}
                  <div className="sm:col-span-4 flex justify-center sm:justify-end">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                      className="h-20 w-20 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-glow-emerald"
                    >
                      <ThumbsUp size={34} fill="currentColor" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 3. Areas to Improve & Suggestions */}
          <motion.div
            variants={itemVariants}
            className="rounded-3xl border border-white/60 bg-white/80 backdrop-blur-xl p-6.5 shadow-xl relative"
          >
            <div className="pb-3 border-b border-slate-150/70 mb-5 flex items-center gap-2">
              <div className="p-1 bg-amber-50 rounded-lg text-amber-600 border border-amber-100">
                <AlertCircle size={15} />
              </div>
              <h3 className="text-[15.5px] font-black text-slate-805">Areas to Improve</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4.5">
              {/* Weakness cards from backend */}
              {weaknesses.length > 0
                ? weaknesses.slice(0, 2).map((w, i) => {
                    const icons = [Clock, MessageSquare, Target];
                    const colors = [
                      { bg: "bg-amber-50", text: "text-amber-650", border: "border-amber-100", icon: Clock },
                      { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-100", icon: MessageSquare },
                      { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-100", icon: Target },
                    ];
                    const c = colors[i % colors.length];
                    const Icon = c.icon;
                    return (
                      <div
                        key={i}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-200/50 flex gap-3.5 items-start hover:bg-white hover:border-slate-300 transition-all duration-300"
                      >
                        <div className={`p-2.5 ${c.bg} ${c.text} border ${c.border} rounded-xl shrink-0`}>
                          <Icon size={16} />
                        </div>
                        <div>
                          <h4 className="text-[13px] font-black text-slate-800">Area {i + 1}</h4>
                          <p className="text-[12px] text-slate-500 mt-1 leading-normal font-semibold">{w}</p>
                        </div>
                      </div>
                    );
                  })
                : (
                  // Fallback if no weaknesses returned
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/50 flex gap-3.5 items-start lg:col-span-2">
                    <div className="p-2.5 bg-amber-50 text-amber-650 border border-amber-100 rounded-xl shrink-0">
                      <Clock size={16} />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-black text-slate-800">Keep Improving</h4>
                      <p className="text-[12px] text-slate-500 mt-1 leading-normal font-semibold">
                        Continue practising to sharpen your interview skills further.
                      </p>
                    </div>
                  </div>
                )
              }

              {/* Suggestion cards from backend (up to 2 suggestions shown) */}
              {suggestions.slice(0, 1).map((s, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/50 flex gap-3.5 items-start hover:bg-white hover:border-slate-300 transition-all duration-300"
                >
                  <div className="p-2.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-xl shrink-0">
                    <Target size={16} />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-black text-slate-800">Tip</h4>
                    <p className="text-[12px] text-slate-500 mt-1 leading-normal font-semibold">{s}</p>
                  </div>
                </div>
              ))}

              {/* Encouragement Banner — always shown */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex gap-3.5 items-start shadow-md relative overflow-hidden group">
                <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-xl" />
                <div className="p-2.5 bg-white/15 border border-white/20 rounded-xl shrink-0 text-white">
                  <Trophy size={16} className="group-hover:animate-bounce" />
                </div>
                <div>
                  <h4 className="text-[13.5px] font-black">Keep it up!</h4>
                  <p className="text-[12px] text-emerald-50 mt-1 leading-normal font-medium">
                    Consistency is the key to cracking your dream role.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Pop-up modal details view (View Full Interview) */}
      <AnimatePresence>
        {isDetailsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDetailsOpen(false)}
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-white rounded-3xl p-6.5 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative z-10 border border-slate-100"
            >
              <div className="flex items-center justify-between pb-4.5 border-b border-slate-150 mb-5">
                <div>
                  <h3 className="text-[17px] font-black text-slate-805">Interview Questions & Model Answers</h3>
                  <p className="text-[12px] text-slate-500 font-medium mt-0.5">Mock session feedback details</p>
                </div>
                <button
                  onClick={() => setIsDetailsOpen(false)}
                  className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                >
                  <X size={17} />
                </button>
              </div>

              <div className="space-y-4">
                {breakdown.length > 0 ? (
                  breakdown.map((item, idx) => (
                    <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-4.5 space-y-3.5">
                      {/* Question + Score header */}
                      <div className="flex items-start justify-between gap-3 pb-3.5 border-b border-slate-100">
                        <div className="flex items-start gap-2.5">
                          <span className="h-6 w-6 rounded-lg bg-slate-100 text-slate-700 font-black text-[12px] flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <p className="text-[13.5px] font-bold text-slate-800">{item.question ?? "—"}</p>
                        </div>
                        <span className="px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-[11px] font-black shrink-0">
                          Score: {item.score ?? "—"}%
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Candidate Answer */}
                        <div className="bg-slate-50/50 p-3.5 rounded-xl border border-slate-150/40">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Your response</span>
                          <p className="text-[12.5px] text-slate-600 leading-relaxed italic">
                            "{item.answer ?? "No answer recorded."}"
                          </p>
                        </div>

                        {/* AI Feedback + Model Answer */}
                        <div className="bg-emerald-50/15 p-3.5 rounded-xl border border-emerald-100/20 space-y-3">
                          <div>
                            <span className="text-[10px] font-black text-emerald-800 uppercase tracking-widest block mb-1">AI Feedback</span>
                            <p className="text-[12.5px] text-slate-655 leading-relaxed">
                              {item.comments ?? "No comments available."}
                            </p>
                          </div>

                          {item.model_answer && (
                            <div className="pt-3 border-t border-dashed border-emerald-100/50">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                                Model Answer
                              </span>
                              <p className="text-[12px] text-emerald-850 leading-relaxed font-semibold italic bg-emerald-50/40 p-2.5 rounded-lg border border-emerald-100/20">
                                {item.model_answer}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-slate-400">
                    <MessageSquare size={32} className="mx-auto mb-3 opacity-40" />
                    <p className="text-[13px] font-semibold">No breakdown data available.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
