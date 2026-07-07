import Container from "../../components/layout/Container";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Aarav Mehta",
    college: "NIT Jalandhar",
    review:
      "HireSmart completely changed the way I prepared for interviews. The ATS suggestions and AI mock interviews helped me improve my confidence tremendously.",
  },
  {
    name: "Priya Sharma",
    college: "IIIT Delhi",
    review:
      "The personalized feedback felt like having a mentor available 24/7. My resume became much stronger after just a few improvements.",
  },
  {
    name: "Rahul Verma",
    college: "DTU",
    review:
      "Instead of preparing random interview questions, I practiced questions generated specifically from my resume. It made a huge difference.",
  },
];

function TestimonialSection() {
  return (
    <section id="testimonials" className="bg-white py-24">
      <Container>

        {/* Heading */}

        <div className="text-center">

          <span className="inline-block rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
            TESTIMONIALS
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            Success Stories from Students
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Join thousands of students improving their resumes,
            interview skills, and career confidence with HireSmart.
          </p>

        </div>

        {/* Cards */}

        <div className="mt-16 grid gap-8 lg:grid-cols-3">

          {testimonials.map((item, index) => (

            <div
              key={index}
              className="rounded-3xl border border-gray-200 bg-[#FAFAF8] p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              {/* Stars */}

              <div className="flex gap-1">

                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}

              </div>

              {/* Review */}

              <p className="mt-6 leading-8 text-gray-600">
                "{item.review}"
              </p>

              {/* User */}

              <div className="mt-8 flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-700">

                  {item.name.charAt(0)}

                </div>

                <div>

                  <h4 className="font-semibold text-gray-900">
                    {item.name}
                  </h4>

                  <p className="text-sm text-gray-500">
                    {item.college}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </Container>
    </section>
  );
}

export default TestimonialSection;