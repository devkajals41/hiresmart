import { ArrowRight, BrainCircuit } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Container from "./Container";

const navLinks = [
	{ name: "Features", href: "#features" },
	{ name: "Journey", href: "#journey" },
	{ name: "Reviews", href: "#testimonials" },
];

function Navbar() {
	return (
		<nav className="sticky top-5 z-50">
			<Container>
				<div className="mx-auto flex h-[72px] items-center justify-between rounded-full border border-slate-200/80 bg-white/80 px-8 shadow-lg shadow-emerald-100/40 backdrop-blur-xl transition-all duration-300">
					{/* Logo */}
					<Link to="/" className="group flex items-center gap-3">
						<BrainCircuit
							size={30}
							strokeWidth={2.2}
							className="text-emerald-700 transition-transform duration-300 group-hover:rotate-6"
						/>

						<div className="flex flex-col leading-none">
							<span className="text-[30px] font-bold tracking-tight text-slate-900">
								HireSmart
							</span>

							<span className="text-xs font-medium text-slate-500">
								Your AI Career Copilot
							</span>
						</div>
					</Link>

					{/* Navigation */}
					<div className="hidden items-center gap-10 lg:flex">
						{navLinks.map((link) => (
							<a
								key={link.name}
								href={link.href}
								className="relative text-[15px] font-medium text-slate-600 transition-all duration-300 hover:text-emerald-700 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-emerald-700 after:transition-all after:duration-300 hover:after:w-full"
							>
								{link.name}
							</a>
						))}

						<Link
							to="/login"
							className="text-[15px] font-medium text-slate-700 transition-colors duration-300 hover:text-emerald-700"
						>
							Login
						</Link>

						<Link to="/register">
							<Button className="group">
								Get Started
								<ArrowRight
									size={18}
									className="transition-transform duration-300 group-hover:translate-x-1"
								/>
							</Button>
						</Link>
					</div>
				</div>
			</Container>
		</nav>
	);
}

export default Navbar;
