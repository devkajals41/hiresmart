import { Link } from "react-router-dom";
import { BrainCircuit } from "lucide-react";
import Button from "../ui/Button";
import Container from "./Container";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <Container>
        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <BrainCircuit
              className="text-emerald-700"
              size={28}
            />

            <span className="text-2xl font-bold text-gray-900">
              HireSmart
            </span>
          </Link>

          {/* Navigation */}
          <div className="hidden items-center gap-8 md:flex">

            <a href="#features" className="text-gray-600 hover:text-black">
              Features
            </a>

            <a href="#journey" className="text-gray-600 hover:text-black">
              Journey
            </a>

            <a href="#testimonials" className="text-gray-600 hover:text-black">
              Reviews
            </a>

            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              <Button>
                Get Started
              </Button>
            </Link>

          </div>

        </div>
      </Container>
    </nav>
  );
}

export default Navbar;