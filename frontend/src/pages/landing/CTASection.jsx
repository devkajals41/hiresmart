import Container from "../../components/layout/Container";
import Button from "../../components/ui/Button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function CTASection() {
  return (
    <section className="bg-[#FAFAF8] py-24">
      <Container>

        <div className="overflow-hidden rounded-[32px] bg-gradient-to-r from-emerald-700 to-emerald-600 px-10 py-16 text-center shadow-xl">

          <h2 className="text-4xl font-bold text-white">
            Ready to Land Your Dream Job?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-emerald-50">
            Build a stronger resume, practice AI-powered interviews,
            and track your career progress—all in one platform.
          </p>

          <Link to="/register">

            <Button
              variant="secondary"
              className="mt-10 inline-flex items-center gap-2 bg-white text-emerald-700 hover:bg-gray-100"
            >
              Get Started Free

              <ArrowRight size={18} />

            </Button>

          </Link>

        </div>

      </Container>
    </section>
  );
}

export default CTASection;