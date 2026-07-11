import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  ArrowRight,
  Sparkles,
  Award,
  BookOpen,
  CheckCircle,
  HelpCircle,
  Clock,
  Lightbulb,
  AlertCircle,
  ChevronDown,
  Lock,
  MessageSquare,
  ShieldCheck,
  Play,
  RotateCcw,
  Code2,
  Users,
  Check,
  Layers,
  Cpu,
  Globe,
  Database,
  Brain,
  Laptop,
  Cloud,
  ChevronRight,
  Volume2,
  Square,
  CornerDownRight,
  FileText,
  X,
  Briefcase,
  Trophy,
} from "lucide-react";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { generateInterview, evaluateInterview } from "../../services/interviewService";

// default/fallback interview questions based on tech topic
const TOPIC_QUESTIONS = {
  "Data Structures & Algorithms": [
    "How does a Hash Map handle collisions under the hood, and what are the time complexities of basic operations?",
    "Explain the difference between depth-first search (DFS) and breadth-first search (BFS) on graphs, and when to use each.",
    "Describe the concept of Dynamic Programming and how it differs from a simple divide-and-conquer strategy.",
  ],
  "System Design": [
    "How would you design a rate limiter for a distributed API service with high throughput requirements?",
    "Explain horizontal vs vertical database scaling, and details like Sharding, Replication, and CAP theorem.",
    "What is the role of a message queue (like Kafka or RabbitMQ) in decoupling microservices architectures?",
  ],
  "Object-Oriented Programming": [
    "What are the SOLID principles of object-oriented design? Explain with a quick conceptual summary.",
    "Explain polymorphism in programming and the difference between method overloading and method overriding.",
    "How does composition compare to class inheritance, and why do design patterns favor the former?",
  ],
  "Computer Networks": [
    "Explain the TCP three-way handshake protocol and how it differs from UDP connectionless streaming.",
    "What occurs behind the scenes when a browser resolves a domain name via DNS lookup to retrieve content?",
    "Describe the key security enhancements introduced by HTTPS compared to standard raw HTTP headers.",
  ],
  "Database Management Systems": [
    "What are ACID properties in database transactions, and how do database engines guarantee isolation levels?",
    "Compare SQL database transactions to NoSQL document structures. In what business scenarios would you favor NoSQL?",
    "How do database indices speed up search operations, and what are the computational trade-offs of excessive index creation?",
  ],
  "Machine Learning & AI": [
    "Explain the difference between supervised and unsupervised learning, and how gradient descent updates models.",
    "What is the self-attention mechanism in modern Transformer architectures, and how did it change NLP processing?",
    "How do generative AI models differ from traditional discriminative models during training cycles?",
  ],
  "Web Development": [
    "What is the DOM tree, and how does React's Virtual DOM reconciliation engine improve layout performance?",
    "Explain cross-site scripting (XSS) vulnerabilities in web apps and how security policies block data injection.",
    "Compare server-side rendering (SSR) vs static site generation (SSG) in terms of SEO benefits and page loading speeds.",
  ],
  "DevOps & Cloud": [
    "What is Infrastructure as Code (IaC), and how does it ensure consistency across multiple cloud environments?",
    "Explain the differences between containerization (Docker) and hardware virtual machine instances (VMs).",
    "Describe the role of CI/CD pipelines in automated testing and staging deployments.",
  ],
};

const TECH_TOPICS = [
  { id: "dsa", name: "Data Structures & Algorithms", icon: Code2, color: "hover:border-emerald-500 hover:shadow-glow-emerald", iconColor: "text-emerald-700 bg-emerald-50 border border-emerald-100" },
  { id: "system-design", name: "System Design", icon: Layers, color: "hover:border-blue-500 hover:shadow-glow-blue", iconColor: "text-blue-700 bg-blue-50 border border-blue-100" },
  { id: "oop", name: "Object-Oriented Programming", icon: Cpu, color: "hover:border-amber-500 hover:shadow-glow-amber", iconColor: "text-amber-700 bg-amber-50 border border-amber-100" },
  { id: "cn", name: "Computer Networks", icon: Globe, color: "hover:border-purple-500 hover:shadow-glow-purple", iconColor: "text-purple-700 bg-purple-50 border border-purple-100" },
  { id: "dbms", name: "Database Management Systems", icon: Database, color: "hover:border-cyan-500 hover:shadow-glow-teal", iconColor: "text-cyan-700 bg-cyan-50 border border-cyan-100" },
  { id: "ml-ai", name: "Machine Learning & AI", icon: Brain, color: "hover:border-pink-500 hover:shadow-glow-rose", iconColor: "text-pink-700 bg-pink-50 border border-pink-100" },
  { id: "web-dev", name: "Web Development", icon: Laptop, color: "hover:border-rose-500 hover:shadow-glow-rose", iconColor: "text-rose-700 bg-rose-50 border border-rose-100" },
  { id: "devops-cloud", name: "DevOps & Cloud", icon: Cloud, color: "hover:border-indigo-500 hover:shadow-glow-blue", iconColor: "text-indigo-700 bg-indigo-50 border border-indigo-100" },
];

const DICTATED_ANSWERS = {
  "Data Structures & Algorithms": "To optimize runtime search, we implement a balanced binary search tree or hash table. Under hash maps, key collision resolutions can be handled by chaining using linked lists. This achieves an average O(1) complexity for write and lookup methods, significantly beating nested loops which scale quadratic at O(N^2) in execution cost.",
  "System Design": "For high-traffic distributed services, we enforce stateless gateway layouts. Session caches are distributed across Redis pools, and active APIs are throttled using a token bucket rate limiter. Writes are routed to a master transactional database, while read query weights are balanced dynamically across multiple read replicas.",
  "Object-Oriented Programming": "OOP architectures rely on dependency inversion principles, allowing high-level modules to interact via abstractions rather than concrete structures. By satisfying the single responsibility guideline, we separate logical domains, using object composition instead of fragile base class extensions to maintain decoupling.",
  "Computer Networks": "TCP connections establish reliable streams by implementing a three-way state handshake: sending a SYN flag, receiving a SYN-ACK validation, and responding with an ACK token. This state handshake tracks sequence numbers and handles packet retransmission, preventing network package dropouts unlike connectionless UDP streaming.",
  "Database Management Systems": "Database engines satisfy transactional ACID consistency by implementing write-ahead logs and isolation levels. To optimize indexing costs, we create indexes on query foreign filters. We partition heavy data sets using horizontal range sharding, distributing indexing sizes and search times.",
  "Machine Learning & AI": "Model parameters adjust their weights using backward propagation, computing the derivative loss gradient. Under text sequences, attention values weigh relationships in parallel across tokens, allowing modern transformers to parse contextual variables far better than older sequential models.",
  "Web Development": "Web rendering engines calculate visual tree elements sequentially. React bypasses redundant recalculation costs by computing tree variations in a Virtual memory DOM. It compares the changed node states against previous models and batches minimum repaint changes, keeping browser thread layouts fast.",
  "DevOps & Cloud": "DevOps pipelines treat environment servers as immutable infrastructure templates. We deploy containers using Docker to establish identical execution paths. Staging images are compiled automatically via CI configuration runners and deployed to Amazon ECS instances once unit tests complete.",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } },
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

// Helper to resolve checklist criteria based on topic/question content
const getHintsForQuestion = (question, topic) => {
  const qLower = question.toLowerCase();
  const tLower = topic.toLowerCase();
  
  if (tLower.includes("dsa") || qLower.includes("complexity") || qLower.includes("tree") || qLower.includes("hash")) {
    return [
      "Time complexity analysis (Big O notation)",
      "Memory space utilization (Space complexity)",
      "Edge cases handling (Null inputs, sizes)",
    ];
  }
  if (tLower.includes("system design") || qLower.includes("scale") || qLower.includes("distributed")) {
    return [
      "Preventing single points of failure",
      "Caching strategies & response latency",
      "Database read replicas or query sharding",
    ];
  }
  if (tLower.includes("oop") || qLower.includes("solid") || qLower.includes("class")) {
    return [
      "Encapsulation & separation of concerns",
      "Programmatic interfaces vs base extensions",
      "SOLID guidelines matching criteria",
    ];
  }
  if (tLower.includes("network") || qLower.includes("tcp") || qLower.includes("dns")) {
    return [
      "OSI layer mapping protocols",
      "TCP handshake sequences (SYN/ACK)",
      "DNS caching resolutions",
    ];
  }
  return [
    "Logical structured sequence breakdown",
    "Real-world application implementation sample",
    "Design trade-offs & optimization compromises",
  ];
};

export default function MockInterview() {
  const navigate = useNavigate();

  // config parameters
  const [role, setRole] = useState("Frontend Developer");
  const [type, setType] = useState("Technical");
  const [difficulty, setDifficulty] = useState("Medium");
  const [questionCount, setQuestionCount] = useState(3);
  const [selectedTopic, setSelectedTopic] = useState("Data Structures & Algorithms");

  // modal active toggle
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);

  // dropdown visual toggles
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showQuestionsDropdown, setShowQuestionsDropdown] = useState(false);
  const [showTips, setShowTips] = useState(true);

  // interview running states
  const [isInterviewing, setIsInterviewing] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  
  // Timer states
  const [timeRemaining, setTimeRemaining] = useState(300);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);

  // Notes scratchpad state
  const [notes, setNotes] = useState("");

  // simulated speech recorder states
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordingInterval, setRecordingInterval] = useState(null);

  // grading evaluation states
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evalStep, setEvalStep] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const rolesList = ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Mobile Engineer", "DevOps Engineer", "Data Scientist"];
  const questionOptions = [3, 5, 8];

  const activeTopicObj = TECH_TOPICS.find((t) => t.name === selectedTopic) || TECH_TOPICS[0];
  const TopicIcon = activeTopicObj.icon;

  const handleStartInterview = async () => {
    setIsEvaluating(false);
    setFeedback(null);
    setAnswers([]);
    setCurrentIdx(0);
    setTimeElapsed(0);
    setNotes("");
    const initialSecs = questionCount * 120; // 2 mins per question
    setTimeRemaining(initialSecs);

    // Fallback questions in case backend is unavailable
    const pool = TOPIC_QUESTIONS[selectedTopic] || TOPIC_QUESTIONS["Data Structures & Algorithms"];
    const activeQuestions = [...pool].slice(0, questionCount);

    try {
      // Token is auto-attached by api.js interceptor — no need to pass manually
      const data = await generateInterview({
        role,
        difficulty,
        question_count: questionCount,
        topic: selectedTopic,
      });
      // Backend returns { questions: [...] } — each item can be a string or { question, type }
      const rawQuestions = data.questions || activeQuestions;
      setQuestions(rawQuestions.map((q) => (typeof q === "object" ? q.question : q)));
    } catch {
      // Graceful fallback to local demo questions
      setQuestions(activeQuestions);
    }

    setIsInterviewing(true);
    startTimer(initialSecs);
  };

  const startTimer = (initialSecs) => {
    if (timerInterval) clearInterval(timerInterval);
    let rem = initialSecs;
    const interval = setInterval(() => {
      rem -= 1;
      setTimeRemaining(rem);
      setTimeElapsed((prev) => prev + 1);
      if (rem <= 0) {
        clearInterval(interval);
        handleSubmitInterview();
      }
    }, 1000);
    setTimerInterval(interval);
  };

  const handleToggleVoice = () => {
    if (isRecording) {
      if (recordingInterval) clearInterval(recordingInterval);
      setIsRecording(false);
      setRecordingSeconds(0);

      const simulatedText = DICTATED_ANSWERS[selectedTopic] || "Sample dynamic answer recorded.";
      const newAnswers = [...answers];
      newAnswers[currentIdx] = simulatedText;
      setAnswers(newAnswers);

      toast.success("Voice transcript synthesized successfully!", { icon: "🎤" });
    } else {
      setIsRecording(true);
      setRecordingSeconds(0);
      toast.success("Recording answer... Speak clearly into microphone.", { icon: "🎙️" });

      const interval = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
      setRecordingInterval(interval);
    }
  };

  const handleEndInterview = () => {
    if (window.confirm("Are you sure you want to end the session? You will be evaluated on the answers provided so far.")) {
      handleSubmitInterview();
    }
  };

  useEffect(() => {
    return () => {
      if (timerInterval) clearInterval(timerInterval);
      if (recordingInterval) clearInterval(recordingInterval);
    };
  }, [timerInterval, recordingInterval]);

  const handleSubmitInterview = async () => {
    if (timerInterval) clearInterval(timerInterval);
    if (recordingInterval) clearInterval(recordingInterval);
    setIsEvaluating(true);
    setIsInterviewing(false);
    setEvalStep(0);

    // Animate evaluation steps while waiting for the API response
    const interval = setInterval(() => {
      setEvalStep((prev) => {
        if (prev >= 4) { clearInterval(interval); return 4; }
        return prev + 1;
      });
    }, 1100);

    // Helper: persist feedback to localStorage then navigate to /feedback page
    const finishWithFeedback = (data) => {
      localStorage.setItem("latest_feedback", JSON.stringify(data));
      setTimeout(() => {
        setIsEvaluating(false);
        navigate("/feedback");
      }, 5000);
    };

    try {
      // Token is auto-attached by api.js interceptor
      const data = await evaluateInterview({
        questions,
        answers,
        topic: selectedTopic,
        role,
      });
      finishWithFeedback(data);
    } catch {
      // ── Demo fallback: generate realistic mock feedback locally ──
      const scoresPool = [84, 88, 79, 91, 76];
      const overall = scoresPool[Math.floor(Math.random() * scoresPool.length)];

      const demoFeedback = {
        overall_score: overall,
        general_feedback: `Great performance! You showed excellent grasp of ${selectedTopic} principles. Your answers are clear and structurally sound.`,
        metrics: {
          "Technical Depth": Math.min(overall - 3, 100),
          "Communication": Math.min(overall + 5, 100),
          "Vocabulary Relevance": Math.min(overall - 1, 100),
          "Structure Clarity": Math.min(overall + 2, 100),
        },
        breakdown: questions.map((q, idx) => ({
          question: q,
          answer: answers[idx] || "No answer was recorded.",
          score: Math.min(overall - 5 + Math.floor(Math.random() * 10), 100),
          comments: "Accurate definition. Try adding specific real-world implementation examples for maximum scoring.",
          model_answer: DICTATED_ANSWERS[selectedTopic] || "Sample model answer.",
        })),
      };

      finishWithFeedback(demoFeedback);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Completion calculation percentage
  const percentageCompleted = questions.length > 0 ? Math.round((answers.filter(Boolean).length / questions.length) * 100) : 0;

  return (
    <DashboardLayout>
      <div className="relative min-h-full flex flex-col gap-6 overflow-x-hidden">
        <ParticleField />
        
        <div className="fixed top-24 right-12 w-[450px] h-[450px] bg-gradient-to-tr from-emerald-450/5 to-teal-400/5 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="fixed bottom-12 left-64 w-[400px] h-[400px] bg-gradient-to-br from-teal-400/5 to-emerald-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 relative z-10 flex-1"
        >
          {/* ────────────────── Setup View Header ────────────────── */}
          {!isInterviewing && (
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200/80"
            >
              <div>
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-emerald-50 rounded-lg text-emerald-700">
                    <Mic size={20} />
                  </div>
                  <span className="text-[12px] font-black uppercase text-emerald-800 tracking-wider">AI Coach</span>
                </div>
                <h2 className="text-[28px] font-black tracking-tight text-slate-800 mt-1">
                  Interactive Mock Interview
                </h2>
                <p className="text-[13.5px] text-slate-550 font-medium mt-1">
                  Establish parameters, choose a focus topic, and analyze diagnostics side-by-side.
                </p>
              </div>

              <button
                onClick={() => navigate("/ats")}
                className="flex items-center gap-2 px-4.5 py-2.5 rounded-xl border border-slate-200/80 bg-white/80 hover:bg-slate-50 text-[13px] font-extrabold text-slate-655 transition-all shadow-sm group"
              >
                <FileText size={15} />
                View ATS Score
                <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}

          {/* ────────────────── Active Session Layout (Matches Screenshot) ────────────────── */}
          {isInterviewing && questions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Header row with End Interview button */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/60">
                <div>
                  <h2 className="text-[24px] font-black text-slate-850 tracking-tight">Interview Session</h2>
                  <p className="text-[13px] text-slate-450 font-semibold mt-0.5">
                    Answer the question to the best of your ability. Be clear, concise and confident.
                  </p>
                </div>
                <button
                  onClick={handleEndInterview}
                  className="flex items-center gap-2 px-4.5 py-2 rounded-xl border border-red-200 text-red-650 hover:bg-red-50 text-[12.5px] font-black transition-all shadow-sm focus:outline-none"
                >
                  <X size={14} />
                  End Interview
                </button>
              </div>

              {/* Horizontal Meta Info Bar */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4.5 rounded-2xl bg-white border border-slate-200/70 shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center shrink-0">
                    <Code2 size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase block tracking-wider">Interview Type</span>
                    <span className="text-[12.5px] font-black text-slate-700 block">{type} Interview</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 flex items-center justify-center shrink-0">
                    <Briefcase size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase block tracking-wider">Role</span>
                    <span className="text-[12.5px] font-black text-slate-700 block truncate max-w-[120px]">{role}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-purple-50 text-purple-700 border border-purple-100 flex items-center justify-center shrink-0">
                    <Layers size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase block tracking-wider">Difficulty</span>
                    <span className="text-[12.5px] font-black text-slate-700 block">{difficulty}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-amber-50 text-amber-700 border border-amber-100 flex items-center justify-center shrink-0">
                    <Trophy size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase block tracking-wider">Questions</span>
                    <span className="text-[12.5px] font-black text-slate-700 block">{questions.length}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-cyan-50 text-cyan-700 border border-cyan-100 flex items-center justify-center shrink-0">
                    <Clock size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase block tracking-wider">Time Elapsed</span>
                    <span className="text-[12.5px] font-black text-slate-700 block font-mono">{formatTime(timeElapsed)}</span>
                  </div>
                </div>
              </div>

              {/* Main two columns viewport */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left panel: active question & editor */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="rounded-3xl border border-white/60 bg-white/85 backdrop-blur-xl p-6 shadow-xl shadow-slate-100/50 space-y-5">
                    
                    {/* Questionnaire progress */}
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[13px] font-black text-slate-800">
                        Question {currentIdx + 1} / {questions.length}
                      </span>
                      <span className="text-[12.5px] text-slate-450 font-bold">
                        {percentageCompleted}% Completed
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/30">
                      <div
                        className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                        style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                      />
                    </div>

                    {/* Tag pill */}
                    <span className="inline-block px-3.5 py-1 text-[11.5px] font-black text-emerald-800 bg-emerald-50 border border-emerald-100 rounded-lg">
                      {type}
                    </span>

                    {/* Question Title */}
                    <h3 className="text-[19px] font-black text-slate-850 leading-tight">
                      {questions[currentIdx]}
                    </h3>

                    {/* Try to include hints checklist */}
                    <div className="space-y-2 pt-1 pb-3">
                      <span className="text-[11.5px] font-black text-slate-400 uppercase tracking-widest block mb-2.5">
                        Try to include:
                      </span>
                      {getHintsForQuestion(questions[currentIdx], selectedTopic).map((hint, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-[13px] font-bold text-slate-600">
                          <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                          <span>{hint}</span>
                        </div>
                      ))}
                    </div>

                    {/* Answer area */}
                    <div className="relative">
                      <textarea
                        value={answers[currentIdx] || ""}
                        onChange={(e) => {
                          const newAnswers = [...answers];
                          newAnswers[currentIdx] = e.target.value;
                          setAnswers(newAnswers);
                        }}
                        placeholder="Type your answer here..."
                        className="w-full h-52 bg-slate-50/50 border border-slate-200 rounded-2xl p-4 text-[13.5px] text-slate-750 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all resize-none"
                      />

                      {/* Microphone wave modal */}
                      <AnimatePresence>
                        {isRecording && (
                          <div className="absolute inset-0 bg-slate-900/95 rounded-2xl flex flex-col items-center justify-center text-white p-5 backdrop-blur-sm">
                            <div className="flex items-center gap-1.5 h-8.5 mb-3.5">
                              {[...Array(6)].map((_, i) => (
                                <div
                                  key={i}
                                  className="w-1 bg-emerald-400 rounded-full animate-soundwave"
                                  style={{
                                    height: `${30 + Math.random() * 40}%`,
                                    animationDelay: `${i * 0.15}s`,
                                  }}
                                />
                              ))}
                            </div>
                            <p className="text-[13px] font-bold text-slate-100">Microphone Active — Dictating Response</p>
                            <span className="text-[11px] text-emerald-400 font-mono mt-0.5">Recording: {recordingSeconds}s</span>
                            <button
                              onClick={handleToggleVoice}
                              className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-red-650 text-[12px] font-black text-white hover:bg-red-700 transition-all"
                            >
                              <Square size={11} fill="currentColor" /> Stop
                            </button>
                          </div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Textarea footer bar */}
                    <div className="flex justify-between items-center text-[12.5px] text-slate-400 font-bold border-t border-slate-100 pt-3">
                      <div className="flex items-center gap-1.5 text-emerald-700">
                        <Check size={14} className="stroke-[3]" />
                        <span>Your answer is autosaved</span>
                      </div>
                      <span>
                        Word count: {answers[currentIdx]?.trim() ? answers[currentIdx].trim().split(/\s+/).length : 0}
                      </span>
                    </div>

                    {/* Navigation Buttons row */}
                    <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                      <button
                        disabled={currentIdx === 0}
                        onClick={() => setCurrentIdx((prev) => prev - 1)}
                        className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[13px] font-black text-slate-600 disabled:opacity-40 transition-all"
                      >
                        ← Previous
                      </button>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={handleToggleVoice}
                          className="flex items-center gap-2 px-4.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[13px] font-black text-slate-655 transition-all"
                        >
                          <Mic size={14} />
                          Simulate Speech
                        </button>

                        <button
                          onClick={() => {
                            const newAnswers = [...answers];
                            newAnswers[currentIdx] = "";
                            setAnswers(newAnswers);
                            setCurrentIdx((prev) => (prev < questions.length - 1 ? prev + 1 : prev));
                            toast.success("Question skipped!");
                          }}
                          className="px-5 py-2.5 rounded-xl border border-slate-250 bg-white hover:bg-slate-50 text-[13px] font-black text-slate-600 transition-all"
                        >
                          Skip Question
                        </button>

                        {currentIdx < questions.length - 1 ? (
                          <button
                            onClick={() => setCurrentIdx((prev) => prev + 1)}
                            className="px-5 py-2.5 rounded-xl bg-emerald-650 hover:bg-emerald-700 text-white text-[13px] font-black flex items-center gap-1 transition-all"
                          >
                            Next Question →
                          </button>
                        ) : (
                          <button
                            onClick={handleSubmitInterview}
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-650 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-[13px] font-black transition-all shadow-md shadow-emerald-700/10"
                          >
                            Submit Interview
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right panel: widgets */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Widget 1: Time remaining countdown */}
                  <div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm text-center">
                    <h4 className="text-[12px] font-extrabold text-slate-450 uppercase tracking-widest flex items-center justify-center gap-1.5 mb-3.5">
                      <Clock size={13} />
                      Time Remaining
                    </h4>
                    <span className="text-[34px] font-black text-emerald-750 font-mono tracking-tight">
                      {formatTime(timeRemaining)}
                    </span>
                    <p className="text-[11px] text-slate-400 font-bold mt-1">Estimated Time Left</p>
                  </div>

                  {/* Widget 2: Tips panel */}
                  <div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm space-y-4">
                    <h4 className="text-[12px] font-extrabold text-slate-450 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 pb-2.5">
                      <Lightbulb size={13} className="text-amber-500" />
                      Tips
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2.5 text-[12.5px] font-semibold text-slate-600 leading-normal">
                        <Check size={13} className="text-emerald-600 mt-1 shrink-0" />
                        <span>Think out loud while formulating answers.</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-[12.5px] font-semibold text-slate-600 leading-normal">
                        <Check size={13} className="text-emerald-600 mt-1 shrink-0" />
                        <span>Structure your reply logically (Intro, Body, Conclusion).</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-[12.5px] font-semibold text-slate-600 leading-normal">
                        <Check size={13} className="text-emerald-600 mt-1 shrink-0" />
                        <span>Be concise and target technical specifications.</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-[12.5px] font-semibold text-slate-600 leading-normal">
                        <Check size={13} className="text-emerald-600 mt-1 shrink-0" />
                        <span>Illustrate designs with realistic code samples.</span>
                      </div>
                    </div>
                  </div>

                  {/* Widget 3: Scratchpad Notes */}
                  <div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm space-y-3.5">
                    <h4 className="text-[12px] font-extrabold text-slate-455 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 pb-2.5">
                      <FileText size={13} className="text-amber-600" />
                      Notes
                    </h4>
                    <p className="text-[11.5px] text-slate-400 font-bold leading-normal">
                      You can jot down important points here.
                    </p>
                    <textarea
                      value={notes}
                      onChange={(e) => {
                        if (e.target.value.length <= 500) {
                          setNotes(e.target.value);
                        }
                      }}
                      placeholder="Write your notes..."
                      className="w-full h-28 bg-slate-50/50 border border-slate-200 rounded-xl p-3 text-[12.5px] text-slate-700 focus:outline-none focus:bg-white resize-none"
                    />
                    <div className="text-right text-[11px] text-slate-400 font-bold">
                      {notes.length} / 500
                    </div>
                  </div>
                </div>

                {/* Bottom Row Navigator (Question navigator) */}
                <div className="lg:col-span-12 rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm space-y-4">
                  <h4 className="text-[12px] font-extrabold text-slate-450 uppercase tracking-widest border-b border-slate-100 pb-2.5">
                    Question Navigator
                  </h4>

                  <div className="flex flex-wrap items-center justify-between gap-5">
                    <div className="flex items-center gap-2.5">
                      {questions.map((_, index) => {
                        const isCurrent = currentIdx === index;
                        const isCompleted = answers[index] && answers[index].trim() !== "";
                        
                        return (
                          <div key={index} className="flex flex-col items-center gap-1 min-w-[40px]">
                            <button
                              onClick={() => setCurrentIdx(index)}
                              className={`h-9 w-9 rounded-full font-black text-[13px] flex items-center justify-center transition-all ${
                                isCurrent
                                  ? "bg-white border-2 border-emerald-600 text-emerald-800 shadow"
                                  : isCompleted
                                  ? "bg-emerald-600 text-white"
                                  : "bg-slate-50 border border-slate-200 text-slate-500 hover:border-slate-350"
                              }`}
                            >
                              {index + 1}
                            </button>
                            <span className="text-[9.5px] text-slate-400 font-bold font-mono">
                              {isCurrent ? "Current" : isCompleted ? "✓" : ""}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Legend */}
                    <div className="flex items-center gap-4 text-[11px] text-slate-450 font-bold shrink-0">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-600" />
                        <span>Completed</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full border-2 border-emerald-600 bg-white" />
                        <span>Current</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-slate-200 border border-slate-300" />
                        <span>Unanswered</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* Configuration Form Dashboard */}
          {!isInterviewing && !feedback && !isEvaluating && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
                <motion.div
                  variants={itemVariants}
                  className="lg:col-span-3 rounded-3xl border border-white/60 bg-white/85 backdrop-blur-xl p-6.5 shadow-xl shadow-slate-100/50 flex flex-col justify-between gap-6"
                >
                  <div className="space-y-5">
                    <div className="flex items-center gap-2.5 pb-3 border-b border-slate-150">
                      <div className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
                      <h3 className="text-[15.5px] font-black text-slate-850">1. Interview Preferences</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative">
                        <label className="text-[12px] font-extrabold text-slate-450 uppercase tracking-widest block mb-2">Target Job Role</label>
                        <button
                          onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                          className="w-full flex items-center justify-between bg-slate-50/60 border border-slate-200 text-slate-700 font-bold text-[13.5px] rounded-xl px-4 py-3 hover:bg-slate-50 transition-all focus:outline-none"
                        >
                          <span>{role}</span>
                          <ChevronDown size={15} className={`text-slate-455 transition-transform ${showRoleDropdown ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {showRoleDropdown && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute z-20 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden"
                            >
                              {rolesList.map((r) => (
                                <button
                                  key={r}
                                  onClick={() => {
                                    setRole(r);
                                    setShowRoleDropdown(false);
                                  }}
                                  className="w-full flex items-center justify-between px-4 py-3 text-left text-[13px] font-bold text-slate-650 hover:bg-slate-50 hover:text-emerald-700 transition-all border-b border-slate-100 last:border-0"
                                >
                                  <span>{r}</span>
                                  {role === r && <Check size={14} className="text-emerald-600" />}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="relative">
                        <label className="text-[12px] font-extrabold text-slate-455 uppercase tracking-widest block mb-2">Question Count</label>
                        <button
                          onClick={() => setShowQuestionsDropdown(!showQuestionsDropdown)}
                          className="w-full flex items-center justify-between bg-slate-50/60 border border-slate-200 text-slate-700 font-bold text-[13.5px] rounded-xl px-4 py-3 hover:bg-slate-50 transition-all focus:outline-none"
                        >
                          <span>{questionCount} Questions</span>
                          <ChevronDown size={15} className={`text-slate-450 transition-transform ${showQuestionsDropdown ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {showQuestionsDropdown && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute z-20 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden"
                            >
                              {questionOptions.map((q) => (
                                <button
                                  key={q}
                                  onClick={() => {
                                    setQuestionCount(q);
                                    setShowQuestionsDropdown(false);
                                  }}
                                  className="w-full flex items-center justify-between px-4 py-3 text-left text-[13px] font-bold text-slate-650 hover:bg-slate-50 hover:text-emerald-700 transition-all border-b border-slate-100 last:border-0"
                                >
                                  <span>{q} Questions</span>
                                  {questionCount === q && <Check size={14} className="text-emerald-600" />}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[12px] font-extrabold text-slate-450 uppercase tracking-widest block mb-2">Method Type</label>
                        <div className="flex gap-2">
                          {["Technical", "Behavioral"].map((t) => (
                            <button
                              key={t}
                              onClick={() => setType(t)}
                              className={`flex-1 py-3 rounded-xl border text-[13px] font-black transition-all ${
                                type === t
                                  ? "border-emerald-500 bg-emerald-50/50 text-emerald-800 shadow-sm"
                                  : "border-slate-200 bg-white/50 text-slate-600 hover:bg-slate-50"
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-[12px] font-extrabold text-slate-450 uppercase tracking-widest block mb-2">Difficulty</label>
                        <div className="flex gap-1.5">
                          {["Easy", "Medium", "Hard"].map((lvl) => (
                            <button
                              key={lvl}
                              onClick={() => setDifficulty(lvl)}
                              className={`flex-1 py-3 rounded-xl border text-[12.5px] font-black transition-all ${
                                difficulty === lvl
                                  ? "border-emerald-500 bg-emerald-50/50 text-emerald-800 shadow-sm"
                                  : "border-slate-200 bg-white/50 text-slate-600 hover:bg-slate-50"
                              }`}
                            >
                              {lvl}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleStartInterview}
                      className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl bg-gradient-to-r from-emerald-650 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-[14px] shadow-lg shadow-emerald-700/10 transition-all duration-300"
                    >
                      <Play size={15} fill="currentColor" />
                      Begin Interview Session
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="lg:col-span-2 rounded-3xl border border-white/60 bg-white/85 backdrop-blur-xl p-6 shadow-xl shadow-slate-100/50 flex flex-col justify-between gap-5 relative overflow-hidden"
                >
                  <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />

                  <div>
                    <div className="flex items-center gap-2.5 pb-3 border-b border-slate-150 mb-5.5">
                      <div className="h-2 w-2 rounded-full bg-teal-650" />
                      <h3 className="text-[15.5px] font-black text-slate-850">2. Active Domain Focus</h3>
                    </div>

                    <div className="flex flex-col items-center justify-center text-center p-4 bg-slate-50/60 rounded-2xl border border-slate-200/50">
                      <div className={`p-3 rounded-2xl ${activeTopicObj.iconColor} shadow-sm shrink-0 mb-3`}>
                        <TopicIcon size={28} />
                      </div>
                      <span className="text-[11px] font-black uppercase text-slate-400 tracking-widest block">Selected Topic</span>
                      <h4 className="text-[16px] font-black text-slate-805 leading-tight mt-1.5">{selectedTopic}</h4>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => setIsTopicModalOpen(true)}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-emerald-250 bg-emerald-50/50 text-emerald-800 hover:bg-emerald-100/80 font-black text-[13px] transition-all"
                    >
                      <Layers size={14} />
                      Choose Topic Focus
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          {/* Modal popup selector dialog */}
          <AnimatePresence>
            {isTopicModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsTopicModalOpen(false)}
                  className="absolute inset-0 bg-slate-900/50 backdrop-blur-md"
                />

                <motion.div
                  initial={{ scale: 0.95, opacity: 0, y: 15 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: 15 }}
                  transition={{ type: "spring", duration: 0.4 }}
                  className="bg-white rounded-3xl p-6.5 max-w-xl w-full shadow-2xl relative z-10 border border-slate-100 overflow-hidden"
                >
                  <div className="absolute -top-10 -left-10 w-24 h-24 bg-emerald-50/80 rounded-full blur-xl pointer-events-none" />

                  <div className="flex items-center justify-between pb-4.5 border-b border-slate-155 mb-5 relative">
                    <div>
                      <h3 className="text-[17px] font-black text-slate-800">Select Interview Domain</h3>
                      <p className="text-[12px] text-slate-500 font-medium mt-0.5">Toggle tech-related categories</p>
                    </div>
                    <button
                      onClick={() => setIsTopicModalOpen(false)}
                      className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                    >
                      <X size={17} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative">
                    {TECH_TOPICS.map((top) => {
                      const Icon = top.icon;
                      const isSelected = selectedTopic === top.name;
                      return (
                        <div
                          key={top.id}
                          onClick={() => {
                            setSelectedTopic(top.name);
                            setIsTopicModalOpen(false);
                            toast.success(`Domain focus set: "${top.name}"`, { icon: "🎯" });
                          }}
                          className={`rounded-2xl p-4.5 border transition-all cursor-pointer flex items-center gap-3.5 group select-none ${
                            isSelected
                              ? "border-emerald-500 bg-emerald-50/20 shadow-sm"
                              : "border-slate-150/80 bg-slate-50/20 hover:border-slate-350 hover:bg-white"
                          }`}
                        >
                          <div className={`p-2 rounded-xl shrink-0 transition-colors ${
                            isSelected ? "text-emerald-700 bg-emerald-50" : "text-slate-500 bg-slate-100"
                          }`}>
                            <Icon size={17} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-[13px] font-bold text-slate-800 leading-tight truncate group-hover:text-emerald-750 transition-colors">
                              {top.name}
                            </h4>
                          </div>
                          {isSelected && (
                            <div className="h-4 w-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                              <Check size={9} className="stroke-[3]" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* AI evaluating neural network loader screen */}
          {isEvaluating && (
            <div className="max-w-xl mx-auto rounded-3xl border border-slate-200/80 bg-white p-8 text-center h-[52vh] flex flex-col justify-center items-center shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-0 w-full h-[2px] bg-emerald-500 opacity-60 shadow-[0_0_10px_2px_#10b981] animate-scanning" />
              </div>

              <div className="relative mb-6 flex items-center justify-center">
                <div className="h-16 w-16 border-4 border-emerald-100 border-t-emerald-650 rounded-full animate-spin" />
                <Sparkles size={20} className="text-emerald-650 absolute animate-pulse" />
              </div>

              <h3 className="text-[17.5px] font-black text-slate-800 tracking-tight">AI Evaluation Pipeline Active</h3>
              <p className="text-[12.5px] text-slate-450 mt-1 max-w-xs">
                Analyzing grammatical syntax, technical keyword counts, and answer semantics.
              </p>

              <div className="mt-8 bg-slate-50 border border-slate-150 rounded-2xl p-4 w-72 h-14 flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={evalStep}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-[11.5px] font-extrabold text-slate-500 uppercase tracking-widest font-mono text-center leading-tight"
                  >
                    {[
                      "Checking context matches...",
                      "Calculating solution technical depth...",
                      "Assessing vocabulary relevance...",
                      "Synthesizing optimization tips...",
                      "Mapping breakdown subscores..."
                    ][evalStep]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Detailed Diagnostic Results page */}
          {feedback && !isEvaluating && (
            <div className="max-w-3xl mx-auto space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl border border-white/60 bg-white/80 backdrop-blur-xl shadow-xl overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-44 h-full opacity-[0.03] bg-gradient-to-tr from-emerald-500 to-teal-500 pointer-events-none" />

                <div className="p-6.5 flex flex-col sm:flex-row items-center gap-6.5">
                  <div className="h-24 w-24 rounded-full bg-emerald-50 border-4 border-emerald-150 flex flex-col items-center justify-center shrink-0 shadow-inner">
                    <span className="text-[32px] font-black text-emerald-855 leading-none">{feedback.overall_score}</span>
                    <span className="text-[10px] text-emerald-650 font-black uppercase tracking-wider mt-1">Grade</span>
                  </div>
                  <div>
                    <h3 className="text-[18px] font-black text-slate-800 flex items-center gap-2 justify-center sm:justify-start">
                      <Award size={18} className="text-emerald-700 animate-bounce" />
                      Interview Diagnostic Completed
                    </h3>
                    <p className="text-[13px] text-slate-550 leading-relaxed mt-2.5 text-center sm:text-left">
                      {feedback.general_feedback}
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-150 bg-slate-50/40 px-6.5 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {Object.entries(feedback.metrics).map(([metric, score]) => (
                    <div key={metric} className="text-center sm:text-left">
                      <span className="text-[10.5px] font-black text-slate-450 uppercase tracking-widest block">
                        {metric}
                      </span>
                      <div className="flex items-center gap-2 mt-1 justify-center sm:justify-start">
                        <span className="text-[15px] font-black text-slate-800">{score}%</span>
                        <div className="h-1.5 w-16 bg-slate-200 rounded-full overflow-hidden shrink-0 hidden sm:block">
                          <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${score}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <div className="space-y-4.5">
                <h4 className="text-[12px] font-black text-slate-400 uppercase tracking-widest">
                  Side-by-side Technical Diagnostics
                </h4>

                {feedback.breakdown.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden"
                  >
                    <div className="bg-slate-50/50 border-b border-slate-100 p-4.5 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className="h-6.5 w-6.5 rounded-xl bg-slate-200 text-slate-700 font-black text-[12px] flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <p className="text-[13.5px] font-black text-slate-850 leading-normal">{item.question}</p>
                      </div>
                      <span className="px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-[11.5px] font-black shrink-0 w-fit">
                        Match Index: {item.score}%
                      </span>
                    </div>

                    <div className="p-4.5 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-50/30 border border-slate-150/60 rounded-xl p-4 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                            User Draft / Speech Transcript
                          </span>
                          <p className="text-[13px] text-slate-655 leading-relaxed italic">
                            "{item.answer}"
                          </p>
                        </div>
                      </div>

                      <div className="bg-emerald-50/15 border border-emerald-100/50 rounded-xl p-4 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-black text-emerald-800 uppercase tracking-widest block mb-2 flex items-center gap-1.5">
                            <Sparkles size={11} className="text-emerald-700 animate-pulse" />
                            AI Review Suggestions
                          </span>
                          <p className="text-[12.5px] text-slate-655 leading-relaxed">
                            {item.comments}
                          </p>
                        </div>

                        <div className="mt-3.5 pt-3.5 border-t border-dashed border-emerald-100/70">
                          <span className="text-[10.5px] font-bold text-slate-400 block mb-1 flex items-center gap-1">
                            <CornerDownRight size={10} /> Target Model Solution
                          </span>
                          <p className="text-[12px] text-emerald-850 leading-relaxed font-semibold italic bg-emerald-50/40 p-2.5 rounded-lg border border-emerald-100/20">
                            {item.model_answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setFeedback(null);
                    setIsInterviewing(false);
                  }}
                  className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[13px] font-black text-slate-650 transition shadow shadow-slate-100"
                >
                  <RotateCcw size={14} />
                  Configure Another Session
                </button>
              </div>
            </div>
          )}

          {/* Bottom features bar */}
          {!isInterviewing && !isEvaluating && !feedback && (
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-5 border-t border-slate-200/50">
              <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/50 border border-white/60 hover:bg-white hover:shadow transition-all duration-300">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-blue-600 shadow-sm shrink-0">
                  <MessageSquare size={15} />
                </div>
                <div className="leading-tight">
                  <h6 className="text-[12.5px] font-black text-slate-750">Speech Synthesis</h6>
                  <p className="text-[11px] text-slate-400 mt-1">Translate audio notes</p>
                </div>
              </div>
              <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/50 border border-white/60 hover:bg-white hover:shadow transition-all duration-300">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 border border-purple-100 text-purple-600 shadow-sm shrink-0">
                  <Sparkles size={15} />
                </div>
                <div className="leading-tight">
                  <h6 className="text-[12.5px] font-black text-slate-750">Adaptive Query</h6>
                  <p className="text-[11px] text-slate-400 mt-1">Custom levels and contexts</p>
                </div>
              </div>
              <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/50 border border-white/60 hover:bg-white hover:shadow transition-all duration-300">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 border border-amber-100 text-amber-600 shadow-sm shrink-0">
                  <Lock size={15} />
                </div>
                <div className="leading-tight">
                  <h6 className="text-[12.5px] font-black text-slate-750">Secure Profiles</h6>
                  <p className="text-[11px] text-slate-400 mt-1">Data remains 100% private</p>
                </div>
              </div>
              <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/50 border border-white/60 hover:bg-white hover:shadow transition-all duration-300">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 shadow-sm shrink-0">
                  <ShieldCheck size={15} />
                </div>
                <div className="leading-tight">
                  <h6 className="text-[12.5px] font-black text-slate-750">Skill Alignment</h6>
                  <p className="text-[11px] text-slate-400 mt-1">Improve ATS match indexes</p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
