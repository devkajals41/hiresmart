import Container from "../../components/layout/Container";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import CTAillustration from "../../assets/illustrations/CTAillustration.png";

function CTASection() {
  return (
    <section className="relative bg-[#FAFAF8] py-16 overflow-hidden">
      {/* Subtle Dotted Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(15,118,110,0.03)_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

      {/* Decorative Glow Blobs */}
      <div className="absolute top-1/2 left-1/4 h-[250px] w-[350px] rounded-full bg-emerald-100/10 blur-3xl pointer-events-none animate-pulse-slow" />

      <Container className="relative z-10">
        <div className="overflow-hidden rounded-[32px] bg-gradient-to-br from-white to-emerald-50/40 border border-slate-100 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_1fr] items-center">
            {/* LEFT: Illustration */}
            <div className="flex items-center justify-center p-8 lg:p-10 shrink-0">
              <img
                src={CTAillustration}
                alt="Dream Job Rocket"
                className="w-full max-w-[280px] h-auto object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>

            {/* RIGHT: Text & CTA */}
            <div className="flex flex-col items-start justify-center px-8 py-10 lg:pr-14 lg:pl-0">
              <h2 className="text-3xl lg:text-[36px] font-bold font-serif leading-[1.2] text-slate-900">
                Your dream job is closer
                <br />
                than you think.
              </h2>

              <p className="mt-3 text-base text-slate-500 font-medium">
                Start your journey with HireSmart today.
              </p>

              <Link to="/register">
                <button className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#064e3b] px-7 py-4 text-sm font-bold text-white transition-all hover:bg-[#043d2e] hover:translate-y-[-1px] shadow-md shadow-emerald-950/10 cursor-pointer">
                  Start Your Journey for Free
                  <ArrowRight size={16} />
                </button>
              </Link>

              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                <CheckCircle2
                  size={14}
                  className="text-emerald-600 fill-emerald-600/10"
                />
                No credit card required
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default CTASection;
