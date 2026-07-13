import { Code2, MessageSquare, Mic, TrendingUp } from "lucide-react";

const features = [
	{
		icon: TrendingUp,
		title: "ATS Score",
		description: "Get your resume scored based on ATS compatibility.",
	},
	{
		icon: Code2,
		title: "Skill Analysis",
		description: "Extracted skills and match percentage with the job role.",
	},
	{
		icon: MessageSquare,
		title: "AI Feedback",
		description: "Personalized suggestions to improve your resume.",
	},
	{
		icon: Mic,
		title: "Interview Readiness",
		description: "Get better prepared with AI-powered interview practice.",
	},
];

export default function ResumeFeaturesCard() {
	return (
		<div className="h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_8px_40px_rgba(15,23,42,0.06)]">
			<h2 className="mb-6 text-lg font-bold text-slate-900">What you'll get</h2>

			<div className="space-y-4">
				{features.map((feature, index) => {
					const Icon = feature.icon;

					return (
						<div
							key={index}
							className={`flex items-start gap-4 pb-4 ${
								index !== features.length - 1 ? "border-b border-slate-100" : ""
							}`}
						>
							<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
								<Icon size={20} className="text-emerald-700" />
							</div>

							<div>
								<h3 className="text-[15px] font-semibold text-slate-900">
									{feature.title}
								</h3>

								<p className="mt-0.5 text-sm leading-5 text-slate-500">
									{feature.description}
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
