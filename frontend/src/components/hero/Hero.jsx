import {
	CheckCircle2,
	ClipboardList,
	FileText,
	Home,
	MessageCircle,
	MessageSquare,
	Play,
	Settings,
	Sparkles,
	Target,
	TrendingUp,
	Upload,
} from "lucide-react";
import robo from "../../assets/illustrations/robo.png";
import Container from "../layout/Container";

function Hero() {
	return (
		<section className="relative overflow-hidden bg-[#FAFAF8] py-8 lg:py-12 animate-fade-in">
			{/* Dotted Grid Pattern */}
			<div className="absolute inset-0 bg-[radial-gradient(rgba(15,118,110,0.03)_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

			{/* Background Blur Top Left */}
			<div className="absolute -left-40 -top-40 h-[360px] w-[360px] rounded-full bg-emerald-100/35 blur-3xl pointer-events-none animate-pulse-slow" />

			{/* Background Blur Bottom Right */}
			<div className="absolute -right-40 -bottom-40 h-[320px] w-[320px] rounded-full bg-cyan-100/20 blur-3xl pointer-events-none animate-pulse-slow-reverse" />

			<Container>
				<div className="grid items-center gap-8 lg:grid-cols-[1fr_1.22fr] lg:gap-6">
					{/* LEFT SIDE */}
					<div className="flex flex-col justify-center">
						{/* Badge */}
						<div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-800 shadow-sm">
							<Sparkles
								size={12}
								className="text-emerald-700 fill-emerald-700/10"
							/>
							AI-Powered Career Platform
						</div>

						{/* Heading */}
						<h1 className="mt-5 max-w-xl text-4xl lg:text-[48px] font-bold font-serif leading-[1.15] tracking-tight text-slate-900">
							Your Personal
							<br />
							<span className="text-[#064e3b]">AI Career</span> Copilot.
						</h1>

						{/* Description */}
						<p className="mt-4 max-w-lg text-sm lg:text-base leading-6 lg:leading-7 text-slate-500 font-medium">
							Upload your resume once. HireSmart analyzes, optimizes and
							prepares you for interviews with personalized guidance from AI.
						</p>

						{/* Buttons */}
						<div className="mt-6 flex flex-wrap gap-3">
							<button className="flex items-center gap-1.5 rounded-xl bg-[#064e3b] px-5 py-3 text-sm font-bold text-white transition-all hover:bg-[#043d2e] hover:translate-y-[-1px] shadow-sm shadow-emerald-950/10 cursor-pointer">
								Get Started Free →
							</button>

							<button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4.5 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-50 transition-all hover:translate-y-[-1px] shadow-xs cursor-pointer">
								<Play size={14} className="fill-emerald-800 text-emerald-800" />
								Watch Demo
							</button>
						</div>

						{/* Feature row */}
						<div className="mt-8 flex items-center gap-x-3 lg:gap-x-4 whitespace-nowrap overflow-x-auto scrollbar-none py-1">
							<div className="flex items-center gap-1 text-[11px] lg:text-xs font-semibold text-slate-500 shrink-0">
								<FileText size={13} className="text-emerald-700 shrink-0" />
								<span>AI Resume Analysis</span>
							</div>
							<div className="flex items-center gap-1 text-[11px] lg:text-xs font-semibold text-slate-500 shrink-0">
								<CheckCircle2 size={13} className="text-emerald-700 shrink-0" />
								<span>ATS Optimization</span>
							</div>
							<div className="flex items-center gap-1 text-[11px] lg:text-xs font-semibold text-slate-500 shrink-0">
								<MessageCircle
									size={13}
									className="text-emerald-700 shrink-0"
								/>
								<span>Interview Prep</span>
							</div>
							<div className="flex items-center gap-1 text-[11px] lg:text-xs font-semibold text-slate-500 shrink-0">
								<Sparkles size={13} className="text-emerald-700 shrink-0" />
								<span>Smart Feedback</span>
							</div>
						</div>
					</div>

					{/* RIGHT SIDE */}
					<div className="relative">
						<div className="rounded-[28px] border border-slate-100 bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.04)] backdrop-blur-xl">
							<div className="flex gap-5">
								{/* Sidebar */}
								<div className="hidden sm:flex flex-col items-center gap-4.5 border-r border-slate-100 pr-4 pt-1 shrink-0">
									<div className="flex h-8.5 w-8.5 items-center justify-center rounded-lg bg-[#064e3b] text-white shadow-sm shadow-emerald-950/20">
										<Home size={16} />
									</div>
									{[
										{ Icon: FileText },
										{ Icon: ClipboardList },
										{ Icon: TrendingUp },
										{ Icon: MessageSquare },
										{ Icon: Target },
										{ Icon: Settings },
									].map((item, idx) => (
										<button
											key={idx}
											className="flex h-8.5 w-8.5 items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
										>
											<item.Icon size={16} />
										</button>
									))}
								</div>

								{/* Main Content Area */}
								<div className="flex-1 flex flex-col gap-4.5">
									{/* Header */}
									<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
										<div>
											<h3 className="text-lg lg:text-xl font-bold text-slate-800">
												Welcome back!
											</h3>
											<p className="text-xs font-medium text-slate-400">
												Let's continue your career journey today.
											</p>
										</div>
										<button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs self-start sm:self-auto cursor-pointer">
											<Upload
												size={14}
												className="text-emerald-700 stroke-[2.5]"
											/>
											Upload New Resume
										</button>
									</div>

									{/* Dashboard Grid */}
									<div className="grid gap-4.5">
										{/* TOP SECTION: Resume Analysis & ATS Score */}
										<div className="grid grid-cols-1 sm:grid-cols-[1.5fr_1fr] gap-4.5">
											{/* Resume Analysis */}
											<div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_4px_20px_rgba(15,23,42,.01)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(15,23,42,.03)]">
												<div className="flex items-start gap-3">
													<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
														<FileText size={18} />
													</div>
													<div>
														<h4 className="font-bold text-slate-800 text-sm">
															Resume Analysis
														</h4>
														<p className="mt-0.5 text-xs font-semibold text-slate-500">
															Software Engineer Resume.pdf
														</p>
														<p className="mt-2 text-[10px] font-medium text-slate-400">
															Uploaded on 2 Jun 2025
														</p>
													</div>
												</div>
											</div>

											{/* ATS Score */}
											<div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_4px_20px_rgba(15,23,42,.01)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(15,23,42,.03)]">
												<div className="flex h-full flex-col items-center justify-center py-0.5">
													<span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
														ATS Score
													</span>
													<div className="relative mt-2 flex items-center justify-center">
														<svg className="h-20 w-20" viewBox="0 0 100 100">
															<circle
																cx="50"
																cy="50"
																r="41"
																fill="none"
																stroke="#F1F5F9"
																strokeWidth="7"
															/>
															<circle
																cx="50"
																cy="50"
																r="41"
																fill="none"
																stroke="#059669"
																strokeWidth="7"
																strokeDasharray="257.6"
																strokeDashoffset={257.6 - (257.6 * 91) / 100}
																strokeLinecap="round"
																transform="rotate(-90 50 50)"
															/>
														</svg>
														<div className="absolute flex flex-col items-center justify-center">
															<span className="text-xl font-extrabold text-slate-800 leading-none">
																91%
															</span>
															<span className="text-[8px] font-bold text-emerald-600 uppercase tracking-wider mt-0.5">
																Excellent
															</span>
														</div>
													</div>
												</div>
											</div>
										</div>

										{/* MIDDLE SECTION: 3 Cards */}
										<div className="grid grid-cols-3 gap-4">
											{[
												{
													value: "84%",
													title: "Skill Match",
													status: "Good Match",
													sparkPath: "M3 15 C10 13, 18 5, 30 10 S42 2, 50 4",
												},
												{
													value: "89%",
													title: "Interview Ready",
													status: "Very Good",
													sparkPath: "M3 18 C10 15, 18 10, 30 8 S42 2, 50 3",
												},
												{
													value: "92%",
													title: "Overall Strength",
													status: "Excellent",
													sparkPath: "M3 16 C10 18, 18 8, 30 11 S42 3, 50 4",
												},
											].map(({ value, title, status, sparkPath }) => (
												<div
													key={title}
													className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-3.5 shadow-[0_4px_20px_rgba(15,23,42,.01)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(15,23,42,.03)]"
												>
													<div>
														<p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
															{title}
														</p>
														<h3 className="mt-1 text-xl font-extrabold text-slate-800 leading-none">
															{value}
														</h3>
														<p className="mt-1.5 text-[9px] font-bold text-[#059669]">
															{status}
														</p>
													</div>

													{/* Mini Sparkline Graph */}
													<div className="w-10 h-6 flex items-center shrink-0">
														<svg
															className="w-full h-full text-emerald-500"
															viewBox="0 0 55 20"
															fill="none"
														>
															<path
																d={sparkPath}
																stroke="currentColor"
																strokeWidth="2"
																strokeLinecap="round"
																strokeLinejoin="round"
															/>
														</svg>
													</div>
												</div>
											))}
										</div>

										{/* BOTTOM SECTION: Top Improvement & Robot */}
										<div className="grid grid-cols-[1.5fr_1fr] gap-4 items-end">
											{/* Top Improvement */}
											<div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_4px_20px_rgba(15,23,42,.01)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(15,23,42,.03)]">
												<h4 className="text-xs lg:text-sm font-bold text-slate-800">
													Top Improvement
												</h4>
												<p className="mt-1.5 text-xs font-semibold text-slate-500 leading-relaxed">
													Add more measurable achievements in your work
													experience.
												</p>
												<button className="mt-3 inline-flex items-center gap-1 rounded-lg bg-emerald-50/70 px-3 py-1.5 text-[10px] font-bold text-emerald-800 hover:bg-emerald-100 transition-colors cursor-pointer">
													View Suggestions →
												</button>
											</div>

											{/* Robot Container */}
											<div className="relative flex items-end justify-center h-full min-h-[120px]">
												<div className="absolute bottom-1 right-2 h-28 w-28 rounded-full bg-emerald-100/25 blur-2xl -z-10" />
												<img
													src={robo}
													alt="HireSmart AI Assistant"
													className="w-36 lg:w-40 object-contain drop-shadow-lg transition-all duration-500 hover:scale-105"
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* BOTTOM STATS BAR */}
				<div className="mt-10 rounded-[20px] border border-slate-100 bg-white p-4.5 shadow-[0_10px_40px_rgba(15,23,42,0.02)]">
					<div className="grid grid-cols-2 gap-y-4 gap-x-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-2">
						{/* Stat 1 */}
						<div className="flex items-center gap-2.5">
							<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
								<svg
									className="h-5 w-5 stroke-[2]"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
								>
									<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
									<polygon
										points="12 8 13.5 11 16.5 11.5 14 13.5 15 16.5 12 15 9 16.5 10 13.5 7.5 11.5 10.5 11"
										fill="currentColor"
										className="text-emerald-700/20"
									/>
								</svg>
							</div>
							<div>
								<div className="text-base font-bold text-slate-800 leading-tight">
									95%
								</div>
								<div className="text-[11px] text-slate-400 font-semibold leading-tight mt-0.5">
									Resume Parsing Accuracy
								</div>
							</div>
						</div>

						{/* Stat 2 */}
						<div className="flex items-center gap-2.5">
							<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
								<svg
									className="h-5 w-5 stroke-[2]"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
								>
									<circle cx="12" cy="7" r="4" />
									<path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
									<circle cx="19" cy="5" r="1.5" fill="currentColor" />
									<circle cx="5" cy="5" r="1.5" fill="currentColor" />
									<line x1="8" y1="6" x2="10" y2="6.5" />
									<line x1="16" y1="6" x2="14" y2="6.5" />
								</svg>
							</div>
							<div>
								<div className="text-base font-bold text-slate-800 leading-tight">
									500+
								</div>
								<div className="text-[11px] text-slate-400 font-semibold leading-tight mt-0.5">
									Interview Questions Generated
								</div>
							</div>
						</div>

						{/* Stat 3 */}
						<div className="flex items-center gap-2.5">
							<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
								<svg
									className="h-5 w-5 stroke-[2]"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
								>
									<rect x="4" y="4" width="16" height="16" rx="2" />
									<line x1="9" y1="9" x2="15" y2="15" />
									<line x1="15" y1="9" x2="9" y2="15" />
									<circle cx="9" cy="9" r="1" fill="currentColor" />
									<circle cx="15" cy="9" r="1" fill="currentColor" />
									<circle cx="9" cy="15" r="1" fill="currentColor" />
									<circle cx="15" cy="15" r="1" fill="currentColor" />
								</svg>
							</div>
							<div>
								<div className="text-base font-bold text-slate-800 leading-tight">
									50+
								</div>
								<div className="text-[11px] text-slate-400 font-semibold leading-tight mt-0.5">
									Skills Extracted Using NLP
								</div>
							</div>
						</div>

						{/* Stat 4 */}
						<div className="flex items-center gap-2.5">
							<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
								<svg
									className="h-5 w-5 stroke-[2]"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
								>
									<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
									<polyline points="22 4 12 14.01 9 11.01" />
								</svg>
							</div>
							<div>
								<div className="text-base font-bold text-slate-800 leading-tight">
									5
								</div>
								<div className="text-[11px] text-slate-400 font-semibold leading-tight mt-0.5">
									AI Modules Integrated
								</div>
							</div>
						</div>

						{/* Stat 5 */}
						<div className="flex items-center gap-2.5">
							<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
								<svg
									className="h-5 w-5 stroke-[2]"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
								>
									<circle cx="11" cy="11" r="8" />
									<line x1="21" y1="21" x2="16.65" y2="16.65" />
									<line x1="8" y1="11" x2="14" y2="11" />
								</svg>
							</div>
							<div>
								<div className="text-base font-bold text-[#0F172A] leading-tight">
									End-to-End
								</div>
								<div className="text-[11px] text-slate-400 font-semibold leading-tight mt-0.5">
									Career Preparation
								</div>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
}

export default Hero;
