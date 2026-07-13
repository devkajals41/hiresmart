import {
	CircleCheck,
	FileText,
	Sparkles,
	Target,
	WandSparkles,
} from "lucide-react";

import resumeBottom from "../../assets/illustrations/resumebottom.png";

const tips = [
	{
		icon: Target,
		title: "Tailor to the Role",
		description:
			"Customize your resume for each job to match key requirements.",
	},
	{
		icon: FileText,
		title: "Use Strong Keywords",
		description: "Include relevant skills and keywords to pass ATS filters.",
	},
	{
		icon: Sparkles,
		title: "Quantify Achievements",
		description: "Add numbers and metrics to showcase your impact.",
	},
	{
		icon: WandSparkles,
		title: "Keep it Clear",
		description:
			"Use clean formatting and bullet points for better readability.",
	},
	{
		icon: CircleCheck,
		title: "Proofread Carefully",
		description: "Eliminate errors and ensure a professional presentation.",
	},
];

export default function ResumeTipsCard() {
	return (
		<div className="h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_8px_40px_rgba(15,23,42,0.06)] flex flex-col justify-between">
			<div>
				<h2
					className="mb-6 text-xl font-bold tracking-tight text-slate-900"
					style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
				>
					Resume Tips & Best Practices
				</h2>

				<div className="grid grid-cols-5">
					{tips.map((tip, index) => {
						const Icon = tip.icon;

						return (
							<div
								key={index}
								className={`flex flex-col items-center px-4 text-center ${
									index !== tips.length - 1 ? "border-r border-slate-200" : ""
								}`}
							>
								<div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
									<Icon size={20} className="text-emerald-700" />
								</div>

								<h3
									className="text-[13px] font-bold leading-tight text-slate-900"
									style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
								>
									{tip.title}
								</h3>

								<p
									className="mt-1.5 text-[11px] leading-4 text-slate-500"
									style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
								>
									{tip.description}
								</p>
							</div>
						);
					})}
				</div>
			</div>

			{/* Bottom Banner - just the illustration image filling the width */}

			<div className="mt-6 overflow-hidden rounded-2xl w-full">
				<img
					src={resumeBottom}
					alt="A great resume opens doors. Make yours stand out!"
					className="w-full h-auto block"
				/>
			</div>
		</div>
	);
}
