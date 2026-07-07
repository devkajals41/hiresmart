import Container from "../../components/layout/Container";
import {
  Upload,
  FileSearch,
  BrainCircuit,
  MessageSquareText,
  BarChart3,
  Briefcase,
} from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Resume",
    description: "Upload your latest resume in PDF format.",
  },
  {
    icon: FileSearch,
    title: "ATS Analysis",
    description: "Receive an ATS score and keyword insights.",
  },
  {
    icon: BrainCircuit,
    title: "Skill Extraction",
    description: "AI identifies your technical and soft skills.",
  },
  {
    icon: MessageSquareText,
    title: "AI Interview",
    description: "Practice personalized interview questions.",
  },
  {
    icon: BarChart3,
    title: "AI Feedback",
    description: "Improve with detailed performance analysis.",
  },
  {
    icon: Briefcase,
    title: "Land Your Job",
    description: "Apply confidently with an optimized profile.",
  },
];

function JourneySection() {
  return (
    <section
      id="journey"
      className="bg-[#FAFAF8] py-24"
    >
      <Container>

        <div className="text-center">

          <span className="inline-block rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
            YOUR JOURNEY
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            Your Journey to Success
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            HireSmart guides you through every stage of interview preparation,
            from uploading your resume to landing your dream job.
          </p>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={index}
                className="relative rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="absolute -top-4 left-8 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">
                  {index + 1}
                </div>

                <div className="mt-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">
                  <Icon
                    size={30}
                    className="text-emerald-700"
                  />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-gray-900">
                  {step.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {step.description}
                </p>
              </div>
            );
          })}

        </div>

      </Container>
    </section>
  );
}

export default JourneySection;