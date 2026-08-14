import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Lock, ShieldCheck } from "lucide-react";
import AuthIllustration from "../../features/auth/AuthIllustration";
import AuthLayout from "../../features/auth/AuthLayout";
import { resetPassword } from "../../services/authService";

export default function ResetPassword() {
	const { token } = useParams();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		password: "",
		confirmPassword: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	const handleChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			setError("Passwords do not match.");
			return;
		}

		try {
			setLoading(true);
			setError("");
			setSuccessMessage("");

			const response = await resetPassword({
				token,
				password: formData.password,
			});

			setSuccessMessage(response.message);
			setTimeout(() => navigate("/login"), 1600);
		} catch (err) {
			setError(err.response?.data?.detail || "Unable to reset password.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<AuthLayout illustration={<AuthIllustration />}>
			<form onSubmit={handleSubmit}>
				<div className="mb-10 flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 shadow-md shadow-emerald-700/20">
						<ShieldCheck size={20} className="text-white" />
					</div>

					<div>
						<h1 className="auth-brand text-[22px]">HireSmart</h1>
						<p className="text-[11px] font-medium tracking-wide text-slate-400">
							Set a new secure password
						</p>
					</div>
				</div>

				<div className="mb-8">
					<h2 className="auth-heading text-[36px]">Reset password</h2>
					<p className="auth-subheading mt-2 text-[16px]">
						Choose a new password for your account.
					</p>
				</div>

				{error && (
					<div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
						{error}
					</div>
				)}

				{successMessage && (
					<div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
						{successMessage}
					</div>
				)}

				<div className="mb-4">
					<label className="auth-label">New password</label>
					<div className="auth-input-group">
						<Lock size={18} className="shrink-0 text-slate-400" />
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							placeholder="Enter a new password"
							required
						/>
					</div>
				</div>

				<div className="mb-6">
					<label className="auth-label">Confirm password</label>
					<div className="auth-input-group">
						<Lock size={18} className="shrink-0 text-slate-400" />
						<input
							type="password"
							name="confirmPassword"
							value={formData.confirmPassword}
							onChange={handleChange}
							placeholder="Confirm your new password"
							required
						/>
					</div>
				</div>

				<button type="submit" disabled={loading} className="auth-btn-primary">
					{loading ? (
						"Updating password..."
					) : (
						<>
							Reset password
							<ArrowRight size={18} />
						</>
					)}
				</button>

				<div className="mt-6 text-center">
					<Link
						to="/login"
						className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline"
					>
						<ArrowLeft size={16} />
						Back to login
					</Link>
				</div>
			</form>
		</AuthLayout>
	);
}