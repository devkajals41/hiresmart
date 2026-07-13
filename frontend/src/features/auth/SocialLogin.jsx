import "./auth.css";
import toast from "react-hot-toast";

export default function SocialLogin({ isRegister }) {
	const handleSocialClick = () => {
		toast.error("Google authentication will be available in Version 2.");
	};

	return (
		<>
			{/* Divider */}

			<div className="auth-divider">
				<span>or</span>
			</div>

			{/* Google Button */}

			<button
				type="button"
				onClick={handleSocialClick}
				className="auth-btn-social"
			>
				<img
					src="https://www.svgrepo.com/show/475656/google-color.svg"
					alt="Google"
					className="h-5 w-5"
				/>

				{isRegister ? "Sign up with Google" : "Continue with Google"}
			</button>
		</>
	);
}
