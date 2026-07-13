import {
	BarChart3,
	FileText,
	Home,
	LayoutDashboard,
	LogOut,
	MessageSquare,
	Mic,
	User,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";

// Shared sidebar navigation used across all user pages
export default function Sidebar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout());
		navigate("/login");
	};

	const menuItems = [
		{ name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
		{ name: "Resume", path: "/resume", icon: FileText },
		{ name: "ATS Score", path: "/ats", icon: BarChart3 },
		{ name: "Mock Interview", path: "/interview", icon: Mic },
		{ name: "AI Feedback", path: "/feedback", icon: MessageSquare },
		{ name: "Profile", path: "/profile", icon: User },
	];

	return (
		<aside className="w-64 border-r border-slate-200/80 bg-white flex flex-col justify-between p-6 shrink-0 h-full">
			{/* Upper navigation */}
			<div>
				{/* Brand header */}
				<div className="mb-8 flex items-center gap-3 px-2">
					<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 shadow-md shadow-emerald-700/20">
						<Home size={20} className="text-white" />
					</div>
					<div>
						<h1 className="auth-brand text-[21px] leading-tight">HireSmart</h1>
						<p className="text-[10px] font-medium tracking-wide text-slate-400">
							Analyze. Practice. Improve.
						</p>
					</div>
				</div>

				{/* Navigation list */}
				<nav className="space-y-1.5">
					{menuItems.map((item) => {
						const Icon = item.icon;
						return (
							<NavLink
								key={item.path}
								to={item.path}
								className={({ isActive }) =>
									`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-semibold transition-all duration-200 ${
										isActive
											? "bg-emerald-50 text-emerald-800"
											: "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
									}`
								}
							>
								<Icon size={18} />
								<span>{item.name}</span>
							</NavLink>
						);
					})}
				</nav>
			</div>

			{/* Logout at the bottom */}
			<div className="border-t border-slate-100 pt-4">
				<button
					onClick={handleLogout}
					className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-semibold text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
				>
					<LogOut size={18} />
					<span>Logout</span>
				</button>
			</div>
		</aside>
	);
}
