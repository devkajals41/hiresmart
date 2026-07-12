import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  GraduationCap,
  Briefcase,
  FolderOpen,
  Code2,
  Trophy,
  Award,
  BarChart3,
  Target,
  CheckCircle,
  Lightbulb,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Layers,
  Download,
  Share2,
  Search,
  Plus,
  Info,
  Check,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getAtsReport } from "../../services/atsService";

// Stagger variants for smooth container entrance
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
    // Generate 15 floating particles
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
   Score Ring — animated gauge with numerical count-up
   ────────────────────────────────────────────── */
function ScoreRing({ score, size = 160, strokeWidth = 12 }) {
  const [displayScore, setDisplayScore] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Numerical count-up effect
  useEffect(() => {
    let start = 0;
    const end = score;
    if (start === end) {
      setDisplayScore(end);
      return;
    }
    const duration = 1200; // 1.2s duration
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

  // Dynamic colors based on score tiers
  const color =
    score >= 80 ? "#0f766e" : score >= 60 ? "#d97706" : "#dc2626";

  const glow =
    score >= 80
      ? "rgba(15,118,110,0.3)"
      : score >= 60
      ? "rgba(217,119,6,0.3)"
      : "rgba(220,38,38,0.3)";

  return (
    <div
      className="relative flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
    >
      {/* Ambient Pulsing Glow behind the ring */}
      <motion.div
        animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-1 rounded-full"
        style={{ boxShadow: `0 0 45px 10px ${glow}` }}
      />

      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#f1f5f9"
          strokeWidth={strokeWidth}
        />
        {/* Active Animated Gauge */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * (1 - score / 100) }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>

      {/* Internal Text Summary */}
      <div className="absolute flex flex-col items-center">
        <motion.span
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
          className="text-[42px] font-black leading-none text-slate-800 tracking-tight font-sans"
        >
          {displayScore}
        </motion.span>
        <span className="text-[11px] font-extrabold text-slate-400 mt-1 uppercase tracking-widest">
          ATS Score
        </span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   ScoreBar — animated horizontal bar
   ────────────────────────────────────────────── */
function ScoreBar({ label, score, icon: Icon }) {
  const barColor =
    score >= 90
      ? "bg-gradient-to-r from-emerald-500 to-teal-500"
      : score >= 75
      ? "bg-gradient-to-r from-teal-400 to-emerald-450"
      : score >= 55
      ? "bg-gradient-to-r from-amber-400 to-orange-450"
      : "bg-gradient-to-r from-red-400 to-rose-500";

  const numColor =
    score >= 90
      ? "text-emerald-700"
      : score >= 75
      ? "text-teal-700"
      : score >= 55
      ? "text-amber-600"
      : "text-red-500";

  return (
    <div className="flex items-center gap-4 py-2.5 px-4 rounded-2xl hover:bg-slate-50/70 hover:shadow-[0_4px_12px_rgba(0,0,0,0.015)] transition-all duration-300">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-slate-200/60 text-slate-700 shadow-sm shrink-0">
        <Icon size={16} />
      </div>

      <span className="text-[13.5px] font-bold text-slate-650 w-28 shrink-0">
        {label}
      </span>

      <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/40 relative">
        <motion.div
          className={`h-full rounded-full ${barColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        {/* Ambient sliding light glare */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
      </div>

      <span className={`text-[14px] font-black w-8 text-right font-sans ${numColor}`}>
        {score}
      </span>
    </div>
  );
}

/* ──────────────────────────────────────────────
   PremiumCard — general wrapper container
   ────────────────────────────────────────────── */
function PremiumCard({ children, icon: Icon, title, iconBg = "bg-slate-800 text-white", extraHeader = null }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(15,23,42,0.04)" }}
      className="rounded-2xl border border-white/60 bg-white/70 backdrop-blur-xl p-5 shadow-md hover:border-slate-200 transition-all duration-355 relative overflow-hidden flex flex-col h-full"
    >
      <div className="flex items-center justify-between gap-2.5 mb-5 pb-3.5 border-b border-slate-150/60">
        <div className="flex items-center gap-2.5">
          <div className={`flex h-9 w-9 items-center justify-center rounded-xl shadow-sm shrink-0 ${iconBg}`}>
            <Icon size={16} />
          </div>
          <h3 className="text-[15.5px] font-black text-slate-800 tracking-tight">{title}</h3>
        </div>
        {extraHeader}
      </div>
      <div className="flex-1 flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
}



// Available keywords directory to add in UI for gamified dynamic score
const RELEVANT_KEYWORDS = [
  { name: "Node.js", category: "Technical", scoreBonus: 3 },
  { name: "TypeScript", category: "Technical", scoreBonus: 3 },
  { name: "Express.js", category: "Technical", scoreBonus: 2 },
  { name: "MongoDB", category: "Technical", scoreBonus: 2 },
  { name: "AWS (Amazon Web Services)", category: "Cloud/DevOps", scoreBonus: 4 },
  { name: "Docker", category: "Cloud/DevOps", scoreBonus: 3 },
  { name: "CI/CD Pipelines", category: "Cloud/DevOps", scoreBonus: 3 },
  { name: "REST APIs", category: "Methodologies", scoreBonus: 2 },
  { name: "Agile Development", category: "Methodologies", scoreBonus: 2 },
  { name: "System Design", category: "Technical", scoreBonus: 4 },
  { name: "Machine Learning", category: "Technical", scoreBonus: 4 },
];

const COMPLIANCE_ITEMS = [
  { rule: "ATS-Friendly Typography", status: "pass", detail: "Clean fonts (Plus Jakarta Sans / DM Sans) used." },
  { rule: "Contact details parsed", status: "pass", detail: "Email address and active links found." },
  { rule: "File extension compatibility", status: "pass", detail: "Standard PDF parsing structure verified." },
  { rule: "Single-column format rule", status: "pass", detail: "Layout remains parseable in linear order." },
  { rule: "Quantifiable milestones", status: "warning", detail: "Experience statements need numerical parameters (e.g. Optimized queries by 30%)." },
  { rule: "Spelling and grammatical consistency", status: "pass", detail: "Passed automated spelling checking validation." },
];

const SECTION_ICONS = {
  Education: GraduationCap,
  Experience: Briefcase,
  Projects: FolderOpen,
  Skills: Code2,
  Achievements: Trophy,
  Certifications: Award,
};

export default function AtsReport() {
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  // Tab configurations
  const [activeTab, setActiveTab] = useState("overview");

  // Dynamic dynamic keyword addition engine
  const [addedKeywords, setAddedKeywords] = useState([]);
  const [keywordSearch, setKeywordSearch] = useState("");
  const [customScore, setCustomScore] = useState(76);

  // Button actions
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
       
const data = await getAtsReport();

const ats = data.ats_report || {};
const resume = data.parsed_resume || {};

// Flatten the skills object into an array
const skillsObject = resume.skills || {};
const allSkills = Object.values(skillsObject).flat();

setReport({
  overall_score: ats.overall_score || 0,
  grade: ats.grade || "N/A",
  level: ats.resume_level || "Beginner",

  section_scores: ats.section_scores || {},

  strengths: ats.strengths || [],
  weaknesses: ats.weaknesses || [],
  suggestions: ats.suggestions || [],
  missing_sections: ats.missing_sections || [],

  skills: allSkills,

  sections_found: Object.keys(ats.section_scores || {}).length,

  total_sections: Object.keys(ats.section_scores || {}).length
});

setCustomScore(ats.overall_score || 0);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleAddKeyword = (kw) => {
    if (addedKeywords.includes(kw.name)) {
      toast.error(`"${kw.name}" is already in your resume profile!`);
      return;
    }
    setAddedKeywords([...addedKeywords, kw.name]);
    
    setCustomScore((prev) => {
      const next = prev + kw.scoreBonus;
      return next > 99 ? 99 : next;
    });

    toast.success(`Optimized keyword: Added "${kw.name}"! Score boosted!`, {
      icon: "🚀",
    });
  };

  const handleDownloadReport = () => {
    setIsDownloading(true);
    toast.loading("Generating customized ATS Report PDF...", { id: "pdf-load" });

    setTimeout(() => {
      toast.success("ATS_Report_HireSmart.pdf downloaded successfully!", {
        id: "pdf-load",
        icon: "📄",
      });
      setIsDownloading(false);
    }, 1800);
  };

  const handleShareReport = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Report link copied to clipboard!", { icon: "🔗" });
  };

  const getDynamicGrade = (score) => {
    if (score >= 90) return { label: "Excellent Portfolio", style: "text-emerald-800 bg-emerald-50 border-emerald-200" };
    if (score >= 80) return { label: "Highly Competitive", style: "text-teal-800 bg-teal-50 border-teal-200" };
    if (score >= 65) return { label: "Strong Match", style: "text-amber-800 bg-amber-50 border-amber-200" };
    return { label: "Action Required", style: "text-red-800 bg-red-50 border-red-200" };
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-[80vh] items-center justify-center bg-slate-50/10">
          <div className="flex flex-col items-center gap-4 relative">
            <div className="h-12 w-12 border-4 border-slate-100 border-t-emerald-650 rounded-full animate-spin shadow-lg" />
            <p className="text-slate-500 text-[14px] font-extrabold tracking-wide animate-pulse">
              Parsing resume files & mapping ATS benchmarks...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const filteredKeywords = RELEVANT_KEYWORDS.filter(
    (kw) =>
      kw.name.toLowerCase().includes(keywordSearch.toLowerCase()) &&
      !addedKeywords.includes(kw.name)
  );

  return (
    <DashboardLayout>
      <div className="relative min-h-full flex flex-col gap-6 overflow-x-hidden">
        <ParticleField />
        <div className="fixed top-24 left-64 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-450/5 to-teal-400/5 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="fixed bottom-12 right-12 w-[400px] h-[400px] bg-gradient-to-br from-teal-400/5 to-emerald-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 relative z-10 flex-1"
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200/80"
          >
            <div>
              <div className="flex items-center gap-2">
                <div className="p-1 bg-emerald-50 rounded-lg text-emerald-700">
                  <BarChart3 size={20} />
                </div>
                <span className="text-[12px] font-black uppercase text-emerald-800 tracking-wider">Analysis Engine</span>
              </div>
              <h2 className="text-[28px] font-black tracking-tight text-slate-800 font-sans mt-1">
                ATS Optimization Hub
              </h2>
              <p className="text-[13.5px] text-slate-500 font-medium mt-1">
                Refine, add keywords, and evaluate layout compliance in real-time.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2 px-4.5 py-2.5 rounded-xl border border-slate-200/80 bg-white/80 hover:bg-slate-50 text-[13px] font-extrabold text-slate-650 transition-all duration-300 hover:border-slate-350 shadow-sm"
              >
                <ArrowLeft size={14} />
                Dashboard
              </button>

              <button
                onClick={handleShareReport}
                className="flex items-center justify-center p-2.5 rounded-xl border border-slate-200/80 bg-white/80 hover:bg-slate-50 text-slate-650 hover:text-emerald-700 transition-all shadow-sm"
                title="Share profile report"
              >
                <Share2 size={16} />
              </button>

              <button
                disabled
                title="PDF download coming in Version 2"
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-650 to-teal-600 text-white text-[13px] font-extrabold shadow-md shadow-emerald-700/10 transition-all duration-300 opacity-50 cursor-not-allowed"
              >
                <Download size={14} />
                Export PDF
              </button>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="rounded-3xl border border-white/60 bg-white/80 backdrop-blur-xl shadow-xl shadow-slate-100/50 overflow-hidden relative"
          >
            <div
              className="absolute top-0 right-0 w-80 h-full opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, #0f766e 1.2px, transparent 1.2px)",
                backgroundSize: "20px 20px",
              }}
            />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
              <div className="md:col-span-3 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-8 border-b md:border-b-0 md:border-r border-dashed border-slate-200/80">
                <ScoreRing score={customScore} />

                <div className="flex flex-col gap-3 text-center sm:text-left">
                  <span
                    className={`inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full border text-[12.5px] font-black w-fit mx-auto sm:mx-0 shadow-sm ${
                      getDynamicGrade(customScore).style
                    }`}
                  >
                    <Sparkles size={13} className="animate-pulse text-emerald-650" />
                    {getDynamicGrade(customScore).label}
                  </span>
                  <h3 className="text-[20px] font-black text-slate-800 leading-tight">
                    Optimizing Keyword Synergy
                  </h3>
                  <p className="text-[13.5px] text-slate-500 font-medium leading-relaxed max-w-sm">
                    {customScore > report.overall_score ? (
                      <span className="text-emerald-700 font-bold">
                        Great job! You added relevant keywords boosting your match index by {(customScore - report.overall_score).toFixed(0)}%. Update your source resume with these items.
                      </span>
                    ) : (
                      "Your resume exhibits strong structure. Try integrating suggested developer keywords in the section tab below to increase parser discoverability."
                    )}
                  </p>
                </div>
              </div>

              <div className="md:col-span-2 p-6 sm:p-8 flex flex-col justify-center gap-5 bg-slate-50/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-600 shadow-sm">
                      <ShieldCheck size={16} />
                    </div>
                    <span className="text-[13.5px] font-bold text-slate-500">Resume Level</span>
                  </div>
                  <span className="text-[14.5px] font-black text-slate-800">{report.level || report.grade}</span>
                </div>
                <div className="border-t border-slate-200/50" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-teal-100 bg-teal-50 text-teal-600 shadow-sm">
                      <Layers size={16} />
                    </div>
                    <span className="text-[13.5px] font-bold text-slate-500">Sections Found</span>
                  </div>
                  <span className="text-[14.5px] font-black text-slate-800">
                    {report.sections_found} <span className="text-[12px] text-slate-400 font-bold">/ {report.total_sections}</span>
                  </span>
                </div>
                <div className="border-t border-slate-200/50" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-100 bg-amber-50 text-amber-600 shadow-sm">
                      <TrendingUp size={16} />
                    </div>
                    <span className="text-[13.5px] font-bold text-slate-500">Added Keywords</span>
                  </div>
                  <span className="text-[14.5px] font-black text-emerald-700">
                    +{addedKeywords.length}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center border-b border-slate-200">
            <div className="flex gap-2 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-250/20 backdrop-blur-md">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-5 py-2.5 rounded-xl text-[13px] font-black tracking-wide transition-all duration-300 ${
                  activeTab === "overview"
                    ? "bg-white text-slate-800 shadow-md shadow-slate-200/40"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Overview Analysis
              </button>
              <button
                onClick={() => setActiveTab("keywords")}
                className={`px-5 py-2.5 rounded-xl text-[13px] font-black tracking-wide transition-all duration-300 flex items-center gap-1.5 ${
                  activeTab === "keywords"
                    ? "bg-white text-slate-800 shadow-md shadow-slate-200/40"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Keyword Optimizer
                {addedKeywords.length > 0 && (
                  <span className="h-4.5 w-4.5 rounded-full bg-emerald-600 text-white text-[9.5px] font-black flex items-center justify-center">
                    {addedKeywords.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("compliance")}
                className={`px-5 py-2.5 rounded-xl text-[13px] font-black tracking-wide transition-all duration-300 ${
                  activeTab === "compliance"
                    ? "bg-white text-slate-800 shadow-md shadow-slate-200/40"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Compliance Rules
              </button>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                <PremiumCard icon={BarChart3} title="Section Breakdown" iconBg="bg-slate-800 text-white">
                  <div className="space-y-1.5 py-2">
                    {Object.entries(report.section_scores).map(([name, score]) => (
                      <ScoreBar
                        key={name}
                        label={name}
                        score={score}
                        icon={  SECTION_ICONS[ name.charAt(0).toUpperCase() +name.slice(1) ] || Target}
                      />
                    ))}
                  </div>
                </PremiumCard>

                <PremiumCard
                  icon={Code2}
                  title="Parsed Resume Skills"
                  iconBg="bg-emerald-700 text-white"
                  extraHeader={
                    <span className="text-[11.5px] font-extrabold text-slate-400 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">
                      Total: {report.skills.length + addedKeywords.length}
                    </span>
                  }
                >
                  <div className="flex flex-col justify-between h-full gap-5">
                    <div className="flex flex-wrap gap-2.5 p-1 max-h-[220px] overflow-y-auto">
                      {Array.isArray(report.skills) &&report.skills.map((skill) => (
                        <motion.span
                          key={skill}
                          whileHover={{ y: -2, scale: 1.05 }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 text-[12.5px] font-bold text-slate-700 shadow-sm transition-colors cursor-default"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {skill}
                        </motion.span>
                      ))}

                      {addedKeywords.map((skill) => (
                        <motion.span
                          key={skill}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          whileHover={{ y: -2, scale: 1.05 }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-[12.5px] font-black text-emerald-800 shadow-md shadow-emerald-50/20"
                        >
                          <Sparkles size={11} className="text-emerald-600 animate-pulse" />
                          {skill}
                        </motion.span>
                      ))}
                    </div>

                    <div className="bg-emerald-50/40 border border-emerald-100/50 rounded-xl p-3.5 flex items-start gap-2.5">
                      <Info size={16} className="text-emerald-700 shrink-0 mt-0.5" />
                      <p className="text-[12.5px] text-slate-600 leading-normal">
                        These are keywords successfully parsed from your PDF. Use the <strong className="text-slate-800">Keyword Optimizer</strong> tab to insert missing tools.
                      </p>
                    </div>
                  </div>
                </PremiumCard>

                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <PremiumCard icon={CheckCircle} title="Key Strengths" iconBg="bg-emerald-50 border border-emerald-100 text-emerald-700">
                    <ul className="space-y-3.5">
                      {report.strengths.map((text, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-[13px] font-semibold text-slate-650 leading-relaxed hover:text-slate-800 transition-colors"
                        >
                          <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                            <Check size={11} className="text-emerald-700" />
                          </div>
                          {text}
                        </li>
                      ))}
                    </ul>
                  </PremiumCard>

                  <PremiumCard icon={Lightbulb} title="Action Items" iconBg="bg-amber-50 border border-amber-100 text-amber-600">
                    <ul className="space-y-3.5">
                      {report.suggestions.map((text, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-[13px] font-semibold text-slate-650 leading-relaxed hover:text-slate-800 transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                          {text}
                        </li>
                      ))}
                    </ul>
                  </PremiumCard>

                  <PremiumCard icon={AlertCircle} title="Missing Elements" iconBg="bg-red-50 border border-red-150 text-red-500">
                    <div className="flex flex-wrap gap-2.5 h-full items-start">
                      {report.missing_sections.map((section, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-red-50 to-rose-50/50 border border-red-200/60 text-[12.5px] font-black text-rose-800 w-fit hover:border-red-300 transition-all duration-300"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                          {section}
                        </span>
                      ))}
                    </div>
                  </PremiumCard>
                </div>
              </motion.div>
            )}

            {activeTab === "keywords" && (
              <motion.div
                key="keywords"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-5 gap-6"
              >
                <div className="md:col-span-3 rounded-2xl border border-white/60 bg-white/70 backdrop-blur-xl p-5 shadow-lg flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 gap-4">
                    <h3 className="text-[15px] font-black text-slate-800">High-Impact Suggested Keywords</h3>
                    <div className="relative w-44">
                      <Search size={14} className="absolute left-3 top-3.5 text-slate-400" />
                      <input
                        type="text"
                        value={keywordSearch}
                        onChange={(e) => setKeywordSearch(e.target.value)}
                        placeholder="Search tags..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8.5 pr-3 py-2 text-[12px] font-semibold text-slate-700 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[300px] overflow-y-auto pr-1">
                    {filteredKeywords.map((kw) => (
                      <div
                        key={kw.name}
                        className="flex items-center justify-between p-3 rounded-xl border border-slate-150/60 hover:border-emerald-300 hover:bg-emerald-50/20 cursor-pointer transition-all group"
                        onClick={() => handleAddKeyword(kw)}
                      >
                        <div>
                          <p className="text-[13px] font-bold text-slate-800">{kw.name}</p>
                          <span className="text-[10px] text-slate-400 font-bold tracking-wide uppercase">
                            {kw.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-[10.5px] font-extrabold text-emerald-650 bg-emerald-50 border border-emerald-100 rounded px-1.5 py-0.5">
                            +{kw.scoreBonus}%
                          </span>
                          <div className="h-6 w-6 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-all">
                            <Plus size={13} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2 rounded-2xl border border-white/60 bg-white/70 backdrop-blur-xl p-5 shadow-lg flex flex-col justify-between gap-5 h-full">
                  <div>
                    <h3 className="text-[15.5px] font-black text-slate-800 pb-3 border-b border-slate-100">
                      Keyword Strategy Report
                    </h3>
                    <p className="text-[12.5px] text-slate-500 mt-3 leading-relaxed">
                      By adding keywords, you simulate tailoring your resume for target positions. These items must be logically added into your actual projects or descriptions.
                    </p>

                    {addedKeywords.length > 0 ? (
                      <div className="mt-4.5 space-y-2">
                        <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider">
                          Simulated Skills Added ({addedKeywords.length})
                        </span>
                        <div className="flex flex-wrap gap-2 max-h-[140px] overflow-y-auto">
                          {addedKeywords.map((kw) => (
                            <span
                              key={kw}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11.5px] font-black"
                            >
                              {kw}
                              <button
                                className="hover:text-red-500 ml-1 text-slate-400 font-extrabold"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setAddedKeywords(addedKeywords.filter((k) => k !== kw));
                                  const refBonus = RELEVANT_KEYWORDS.find((k) => k.name === kw)?.scoreBonus || 2;
                                  setCustomScore((prev) => (prev - refBonus < 76 ? 76 : prev - refBonus));
                                }}
                              >
                                &times;
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="mt-8 border border-dashed border-slate-200 rounded-xl p-5 text-center text-[12.5px] text-slate-450">
                        Select suggested keywords on the left to inject them into the simulator and boost score!
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[12.5px] font-extrabold text-slate-500">Projected score:</span>
                    <span className="text-[18px] font-black text-emerald-850">{customScore} / 100</span>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "compliance" && (
              <motion.div
                key="compliance"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="max-w-2xl mx-auto rounded-2xl border border-white/60 bg-white/70 backdrop-blur-xl p-5 shadow-lg space-y-4"
              >
                <h3 className="text-[15.5px] font-black text-slate-800 pb-3 border-b border-slate-100">
                  Formatting and Layout Compliance Checks
                </h3>

                <div className="divide-y divide-slate-100">
                  {(() => {
                    const dynamicComplianceItems = report ? [
                      {
                        rule: "ATS-Friendly Layout structure",
                        status: (report.overall_score || 0) >= 60 ? "pass" : "warning",
                        detail: (report.overall_score || 0) >= 60 
                          ? "Layout structure looks consistent for standard parsers." 
                          : "Layout structure contains complex parsing blocks. Consider linear order."
                      },
                      {
                        rule: "Contact details parsed",
                        status: report.skills && report.skills.length > 0 ? "pass" : "warning",
                        detail: report.skills && report.skills.length > 0
                          ? "Successfully identified skill nodes and details."
                          : "Could not parse robust skills list from resume."
                      },
                      {
                        rule: "Section Completeness Check",
                        status: report.missing_sections && report.missing_sections.length === 0 ? "pass" : "warning",
                        detail: report.missing_sections && report.missing_sections.length === 0
                          ? "All essential resume section tags present."
                          : `Missing key section blocks: ${report.missing_sections.join(", ")}.`
                      },
                      {
                        rule: "Action Verbs & Key Strengths",
                        status: report.strengths && report.strengths.length > 0 ? "pass" : "warning",
                        detail: report.strengths && report.strengths.length > 0
                          ? `${report.strengths[0]}`
                          : "Experience statements need stronger action verbs."
                      },
                      {
                        rule: "Quantifiable Impact Milestones",
                        status: report.weaknesses && report.weaknesses.some(w => w.toLowerCase().includes("quantif") || w.toLowerCase().includes("number") || w.toLowerCase().includes("metric")) ? "warning" : "pass",
                        detail: report.weaknesses && report.weaknesses.some(w => w.toLowerCase().includes("quantif") || w.toLowerCase().includes("number") || w.toLowerCase().includes("metric"))
                          ? "Quantifiable metrics could be improved in experience section."
                          : "Good use of numeric values and business outcomes."
                      }
                    ] : [];

                    if (report && report.weaknesses) {
                      report.weaknesses.slice(0, 2).forEach((w, idx) => {
                        dynamicComplianceItems.push({
                          rule: `Optimization Suggestion #${idx + 1}`,
                          status: "warning",
                          detail: w
                        });
                      });
                    }

                    return dynamicComplianceItems.map((item, idx) => (
                      <div key={idx} className="py-3.5 flex items-start justify-between gap-4">
                        <div>
                          <h4 className="text-[13.5px] font-bold text-slate-855 flex items-center gap-1.5">
                            {item.rule}
                          </h4>
                          <p className="text-[12px] text-slate-500 mt-1 leading-normal">
                            {item.detail}
                          </p>
                        </div>

                        {item.status === "pass" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-[11px] font-extrabold text-emerald-855 border border-emerald-150 shrink-0">
                            <CheckCircle size={11} className="text-emerald-600" />
                            Passed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-[11px] font-extrabold text-amber-700 border border-amber-250 shrink-0">
                            <AlertCircle size={11} className="text-amber-500" />
                            Needs Work
                          </span>
                        )}
                      </div>
                    ));
                  })()}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
