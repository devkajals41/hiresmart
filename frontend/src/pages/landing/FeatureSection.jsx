import {
	FileText,
	Grid,
	MessageSquare,
	Target,
	Trophy,
	UploadCloud,
} from "lucide-react";
import Container from "../../components/layout/Container";

const steps = [
	{
		number: 1,
		title: "Upload Resume",
		descriptionLine1: "Upload your resume",
		descriptionLine2: "in PDF or DOCX.",
		icon: UploadCloud,
	},
	{
		number: 2,
		title: "AI Parsing",
		descriptionLine1: "We extract your details",
		descriptionLine2: "and key information.",
		icon: FileText,
	},
	{
		number: 3,
		title: "ATS Analysis",
		descriptionLine1: "Get your ATS score &",
		descriptionLine2: "improvement insights.",
		icon: Target,
	},
	{
		number: 4,
		title: "Skill Extraction",
		descriptionLine1: "NLP extracts skills,",
		descriptionLine2: "tech & soft skills.",
		icon: Grid,
	},
	{
		number: 5,
		title: "AI Interview",
		descriptionLine1: "Practice with AI-generated",
		descriptionLine2: "interview questions.",
		icon: MessageSquare,
	},
	{
		number: 6,
		title: "Feedback & Improve",
		descriptionLine1: "Get feedback and track",
		descriptionLine2: "your improvement.",
		icon: Trophy,
	},
];

function FeatureSection() {
	return (
		<section id="features" className="relative py-16 bg-white overflow-hidden">
			{/* Subtle Dotted Grid Pattern */}
			<div className="absolute inset-0 bg-[radial-gradient(rgba(15,118,110,0.025)_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

			{/* Decorative Glow Blob */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[500px] rounded-full bg-emerald-50/10 blur-3xl pointer-events-none animate-pulse-slow" />

			<Container>
				<div className="flex flex-col relative z-10">
					{/* Header */}
					<div>
						<span className="text-xs font-bold uppercase tracking-widest text-[#064e3b]">
							How HireSmart Works
						</span>
						<h2 className="text-3xl lg:text-[40px] font-bold font-serif leading-[1.2] text-slate-900 mt-2">
							Your journey to <span className="text-[#059669]">success</span>
							<br />
							in 6 simple steps
						</h2>
					</div>

					{/* Workflow steps */}
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-10 gap-x-4 lg:gap-x-2 mt-12">
						{steps.map((step, idx) => {
							const Icon = step.icon;
							return (
								<div
									key={idx}
									className="flex flex-col items-center text-center relative group"
								>
									{/* Circle containing Icon */}
									<div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white border border-slate-100 shadow-md group-hover:scale-105 transition-all duration-300">
										<Icon
											size={24}
											className={
												idx === 5 ? "text-violet-600" : "text-emerald-700"
											}
										/>
									</div>

									{/* Step Number Badge */}
									<div
										className={`mt-4 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-sm ${idx === 5 ? "bg-violet-600" : "bg-[#064e3b]"}`}
									>
										{step.number}
									</div>

									{/* Title */}
									<h4 className="mt-3 text-xs lg:text-sm font-bold text-slate-800 tracking-tight">
										{step.title}
									</h4>

									{/* Description */}
									<p className="mt-1.5 text-[11px] text-slate-500 font-medium leading-relaxed max-w-[155px]">
										{step.descriptionLine1}
										<br />
										{step.descriptionLine2}
									</p>

									{/* Dotted Arrow Connector (visible on lg screens, hidden for the last item) */}
									{idx < 5 && (
										<div className="hidden lg:block absolute top-7 left-[calc(50%+28px)] w-[calc(100%-56px)] pointer-events-none translate-y-[-50%]">
											<svg
												className="w-full text-emerald-600/30"
												viewBox="0 0 100 20"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeDasharray="3,3"
											>
												<path d="M0 10 H90" />
												<path d="M85 5 L90 10 L85 15" strokeDasharray="none" />
											</svg>
										</div>
									)}
								</div>
							);
						})}
					</div>
				</div>
			</Container>
		</section>
	);
}

export default FeatureSection;
