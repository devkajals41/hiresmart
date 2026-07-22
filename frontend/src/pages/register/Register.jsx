import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthIllustration from "../../features/auth/AuthIllustration";
import AuthLayout from "../../features/auth/AuthLayout";
import RegisterForm from "../../features/auth/RegisterForm";
import SocialLogin from "../../features/auth/SocialLogin";

import { googleLogin, registerUser } from "../../services/authService";

function Register() {
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleRegister = async (formData) => {
		try {
			setLoading(true);
			setError("");

			const response = await registerUser({
				name: formData.name,
				email: formData.email,
				password: formData.password,
			});

			localStorage.setItem("accessToken", response.token.access_token);
			localStorage.setItem("user", JSON.stringify(response.user));

			navigate("/dashboard");
		} catch (err) {
			if (Array.isArray(err.response?.data?.detail)) {
				setError(err.response.data.detail[0].msg);
			} else {
				setError(err.response?.data?.detail || "Registration failed");
			}
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleRegister = async (credential) => {
		try {
			setLoading(true);
			setError("");

			const response = await googleLogin({ credential });

			localStorage.setItem("accessToken", response.token.access_token);
			localStorage.setItem("user", JSON.stringify(response.user));

			navigate("/dashboard");
		} catch (err) {
			setError(err.response?.data?.detail || "Google sign-up failed.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<AuthLayout illustration={<AuthIllustration />}>
			<RegisterForm onSubmit={handleRegister} loading={loading} error={error} />

			<SocialLogin
				isRegister
				onGoogleLogin={handleGoogleRegister}
				loading={loading}
			/>

			<p className="mt-8 text-center text-sm text-slate-500">
				Already have an account?{" "}
				<Link
					to="/login"
					className="font-semibold text-emerald-700 hover:underline"
				>
					Log In
				</Link>
			</p>
		</AuthLayout>
	);
}

export default Register;
