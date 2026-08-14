import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Mail, ShieldCheck } from "lucide-react";
import AuthIllustration from "../../features/auth/AuthIllustration";
import AuthLayout from "../../features/auth/AuthLayout";
import { requestPasswordReset } from "../../services/authService";

export default function ForgotPassword() {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [resetLink, setResetLink] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			setLoading(true);
			setError("");
			setSuccessMessage("");
			setResetLink("");

			const response = await requestPasswordReset({ email });
			setSuccessMessage(response.message);
			if (response.reset_link) {
				setResetLink(response.reset_link);
			}
		} catch (err) {
			setError(err.response?.data?.detail || "Unable to request password reset.");
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
							Reset your password securely
						</p>
					</div>
				</div>

				<div className="mb-8">
					<h2 className="auth-heading text-[36px]">Forgot password?</h2>
					<p className="auth-subheading mt-2 text-[16px]">
						Enter your email and we’ll send a reset link.
					</p>
				</div>

				{error && (
					<div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
						{error}
					</div>
				)}

				{successMessage && (
					<div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
						<p>{successMessage}</p>
						{resetLink && (
							<p className="mt-2 break-all text-xs text-slate-500">
								Dev link: <span className="font-medium">{resetLink}</span>
							</p>
						)}
					</div>
				)}

				<div className="mb-6">
					<label className="auth-label">Email address</label>
					<div className="auth-input-group">
						<Mail size={18} className="shrink-0 text-slate-400" />
						<input
							type="email"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							placeholder="Enter your account email"
							required
						/>
					</div>
				</div>

				<button type="submit" disabled={loading} className="auth-btn-primary">
					{loading ? (
						"Sending link..."
					) : (
						<>
							Send reset link
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