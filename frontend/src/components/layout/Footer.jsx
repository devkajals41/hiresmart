import { BrainCircuit } from "lucide-react";
import Container from "./Container";

function Footer() {
	return (
		<footer className="border-t border-gray-200 bg-white">
			<Container>
				<div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
					{/* Brand */}

					<div className="lg:col-span-2">
						<div className="flex items-center gap-3">
							<BrainCircuit size={34} className="text-emerald-700" />

							<h2 className="text-3xl font-bold">HireSmart</h2>
						</div>

						<p className="mt-5 max-w-sm leading-7 text-gray-600">
							Your Personal AI Career Copilot. Build stronger resumes, practice
							interviews, and land your dream job with confidence.
						</p>
					</div>

					{/* Product */}

					<div>
						<h3 className="font-semibold text-gray-900">Product</h3>

						<ul className="mt-5 space-y-3 text-gray-600">
							<li>Features</li>
							<li>Dashboard</li>
							<li>Pricing</li>
							<li>Roadmap</li>
						</ul>
					</div>

					{/* Resources */}

					<div>
						<h3 className="font-semibold text-gray-900">Resources</h3>

						<ul className="mt-5 space-y-3 text-gray-600">
							<li>Blog</li>
							<li>FAQ</li>
							<li>Documentation</li>
							<li>Support</li>
						</ul>
					</div>

					{/* Company */}

					<div>
						<h3 className="font-semibold text-gray-900">Company</h3>

						<ul className="mt-5 space-y-3 text-gray-600">
							<li>About</li>
							<li>Contact</li>
							<li>Privacy Policy</li>
							<li>Terms</li>
						</ul>
					</div>
				</div>

				<div className="border-t border-gray-200 py-8 text-center text-sm text-gray-500">
					© 2026 HireSmart. All rights reserved.
				</div>
			</Container>
		</footer>
	);
}

export default Footer;
