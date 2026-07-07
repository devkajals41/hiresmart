import Container from "../../components/layout/Container";
import Button from "../../components/ui/Button";
import {
  Sparkles,
  ArrowRight,
  FileText,
  BrainCircuit,
  Trophy,
} from "lucide-react";

function HeroSection() {
  return (
    <section className="bg-[#FAFAF8]">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center py-20">

          {/* LEFT */}

          <div>

            {/* Badge */}

            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 mb-6">

              <Sparkles
                size={15}
                className="text-emerald-700"
              />

              <span className="text-sm font-medium text-emerald-700">
                Your Personal AI Career Copilot
              </span>

            </div>

            {/* Heading */}

            <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900">

              Prepare Smarter.

              <br />

              Interview Better.

              <br />

              <span className="text-emerald-700">
                Get Hired.
              </span>

            </h1>

            {/* Description */}

            <p className="mt-6 max-w-lg text-base leading-8 text-gray-600">

              Analyze your resume, improve your ATS score,
              practice AI-powered mock interviews,
              and receive personalized career guidance—
              everything you need to land your dream job.

            </p>

            {/* Buttons */}

            <div className="mt-8 flex flex-wrap gap-4">

              <Button>
                Get Started Free
              </Button>

              <Button
                variant="secondary"
                className="flex items-center gap-2"
              >
                Watch Demo

                <ArrowRight size={18} />

              </Button>

            </div>

            {/* Quick Stats */}

            <div className="mt-10 flex flex-wrap gap-8">

              <div>

                <h3 className="text-2xl font-bold text-gray-900">
                  95%
                </h3>

                <p className="text-sm text-gray-500">
                  ATS Accuracy
                </p>

              </div>

              <div>

                <h3 className="text-2xl font-bold text-gray-900">
                  10K+
                </h3>

                <p className="text-sm text-gray-500">
                  Interview Questions
                </p>

              </div>

              <div>

                <h3 className="text-2xl font-bold text-gray-900">
                  AI
                </h3>

                <p className="text-sm text-gray-500">
                  Personalized Feedback
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative flex justify-center">

            {/* Main Card */}

            <div className="relative h-[430px] w-full max-w-md rounded-3xl border border-gray-200 bg-white shadow-xl overflow-hidden">

              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-emerald-100" />

              <div className="relative flex h-full items-center justify-center">

                <BrainCircuit
                  size={140}
                  className="text-emerald-700 opacity-90"
                />

              </div>

            </div>

            {/* ATS Card */}

            <div className="absolute top-6 -left-6 rounded-2xl bg-white shadow-lg border border-gray-100 p-4">

              <div className="flex items-center gap-3">

                <FileText
                  size={22}
                  className="text-emerald-700"
                />

                <div>

                  <p className="text-xs text-gray-500">
                    ATS Score
                  </p>

                  <h3 className="font-bold text-lg">
                    91%
                  </h3>

                </div>

              </div>

            </div>

            {/* Interview Card */}

            <div className="absolute bottom-8 -left-8 rounded-2xl bg-white shadow-lg border border-gray-100 p-4">

              <p className="text-xs text-gray-500">
                Interview Ready
              </p>

              <h3 className="font-bold text-lg text-emerald-700">
                89%
              </h3>

            </div>

            {/* Achievement Card */}

            <div className="absolute right-0 bottom-20 rounded-2xl bg-white shadow-lg border border-gray-100 p-4">

              <div className="flex items-center gap-3">

                <Trophy
                  size={22}
                  className="text-amber-500"
                />

                <div>

                  <p className="text-xs text-gray-500">
                    Career Progress
                  </p>

                  <h3 className="font-bold">
                    +12 Skills
                  </h3>

                </div>

              </div>

            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}

export default HeroSection;