import Container from "../../components/layout/Container";
import {
  Shield,
  Brain,
  MessageSquare,
  Mic,
  Star,
  TrendingUp
} from "lucide-react";

import resumeana1 from "../../assets/illustrations/resumeana1.png";
import image2interviewgraphic from "../../assets/illustrations/image2interviewgraphic.png";
import mockinterviewgraphic from "../../assets/illustrations/mockinterviewgraphic.png";
import feedbackdashboardgraphic from "../../assets/illustrations/feedbackdashboardgraphic.png";
import linechartgraphic from "../../assets/illustrations/linechartgraphic.png";

const features = [
  {
    icon: Shield,
    iconColor: "text-emerald-700",
    bgColor: "bg-emerald-50",
    title: "AI Resume Analysis",
    description: "Get ATS score, keyword match, strengths, weaknesses and improvement tips.",
    hasTags: false,
    illustration: resumeana1
  },
  {
    icon: Brain,
    iconColor: "text-emerald-700",
    bgColor: "bg-emerald-50",
    title: "NLP Skill Extraction",
    description: "Extract programming languages, frameworks, tools and soft skills using advanced NLP.",
    hasTags: true,
    tags: [
      { name: "Python", style: "bg-emerald-50 text-emerald-800 border border-emerald-100" },
      { name: "SQL", style: "bg-blue-50 text-blue-800 border border-blue-100" },
      { name: "JavaScript", style: "bg-emerald-50 text-emerald-800 border border-emerald-100" },
      { name: "Docker", style: "bg-slate-50 text-slate-800 border border-slate-100" }
    ]
  },
  {
    icon: MessageSquare,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
    title: "AI Interview Prep",
    description: "Generate role-specific interview questions tailored to your resume and target role.",
    hasTags: false,
    illustration: image2interviewgraphic
  },
  {
    icon: Mic,
    iconColor: "text-pink-600",
    bgColor: "bg-pink-50",
    title: "Mock Interviews",
    description: "Practice real interviews with AI and improve your confidence and communication.",
    hasTags: false,
    illustration: mockinterviewgraphic
  },
  {
    icon: Star,
    iconColor: "text-orange-500",
    bgColor: "bg-orange-50",
    title: "AI Feedback",
    description: "Get detailed feedback on your answers, communication and technical approach.",
    hasTags: false,
    illustration: feedbackdashboardgraphic
  },
  {
    icon: TrendingUp,
    iconColor: "text-violet-600",
    bgColor: "bg-violet-50",
    title: "Career Dashboard",
    description: "Track your progress, interview history, ATS history and skill growth over time.",
    hasTags: false,
    illustration: linechartgraphic
  }
];

function JourneySection() {
  return (
    <section id="journey" className="relative bg-[#FAFAF8]/50 py-16 overflow-hidden">
      {/* Subtle Dotted Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(15,118,110,0.03)_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

      {/* Decorative Glow Blobs */}
      <div className="absolute -left-20 top-20 h-[300px] w-[300px] rounded-full bg-emerald-50/20 blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute -right-20 bottom-10 h-[320px] w-[320px] rounded-full bg-indigo-50/20 blur-3xl pointer-events-none animate-pulse-slow-reverse" />

      <Container className="relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#064e3b]">
            Powerful Features
          </span>
        </div>

        {/* 6 Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="flex flex-col justify-between rounded-[24px] border border-slate-100 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div>
                  {/* Icon Circle */}
                  <div className={`flex h-11 w-11 items-center justify-center rounded-full ${feature.bgColor} ${feature.iconColor}`}>
                    <Icon size={20} />
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 text-sm font-bold text-slate-800 leading-tight">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2.5 text-xs text-slate-500 font-medium leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom Graphic / Tags Space */}
                <div className="mt-6">
                  {feature.hasTags ? (
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {feature.tags.map((tag, tIdx) => (
                        <div
                          key={tIdx}
                          className={`rounded-lg py-1.5 text-center text-[10px] font-bold ${tag.style}`}
                        >
                          {tag.name}
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Illustration Image rendering */
                    <div className="w-full flex items-center justify-center">
                      <img
                        src={feature.illustration}
                        alt={feature.title}
                        className="w-full h-24 object-contain rounded-xl transition-transform duration-300 hover:scale-[1.03]"
                      />
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </Container>
    </section>
  );
}

export default JourneySection;