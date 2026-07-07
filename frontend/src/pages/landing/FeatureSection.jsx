import Container from "../../components/layout/Container";
import {
  BrainCircuit,
  FileSearch,
  MessageSquareMore,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: FileSearch,
    title: "AI Resume Analysis",
    description:
      "Get detailed ATS scoring, keyword analysis, and actionable suggestions to improve your resume.",
  },
  {
    icon: BrainCircuit,
    title: "Personalized Career Coach",
    description:
      "Receive AI-powered recommendations tailored to your resume, skills, and career goals.",
  },
  {
    icon: MessageSquareMore,
    title: "AI Mock Interviews",
    description:
      "Practice realistic interview questions with instant feedback and improvement tips.",
  },
  {
    icon: TrendingUp,
    title: "Career Progress",
    description:
      "Track your growth, improve interview readiness, and stay focused on your goals.",
  },
];

function FeatureSection() {
  return (
    <section
      id="features"
      className="py-24 bg-white"
    >
      <Container>

        <div className="text-center">

          <h2 className="text-4xl font-bold text-gray-900">
            Why Students Choose HireSmart
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Everything you need to build a stronger resume,
            prepare smarter, and confidently crack interviews.
          </p>

        </div>

        <div className="grid gap-8 mt-16 md:grid-cols-2 lg:grid-cols-4">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="rounded-3xl border border-gray-200 bg-[#FAFAF8] p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">

                  <Icon
                    size={28}
                    className="text-emerald-700"
                  />

                </div>

                <h3 className="mt-6 text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-gray-600 leading-7">
                  {feature.description}
                </p>

              </div>
            );
          })}

        </div>

      </Container>
    </section>
  );
}

export default FeatureSection;