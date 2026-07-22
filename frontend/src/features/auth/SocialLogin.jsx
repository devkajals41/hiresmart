import "./auth.css";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const GOOGLE_SCRIPT_ID = "google-identity-services";

export default function SocialLogin({ isRegister, onGoogleLogin, loading = false }) {
	const initializedRef = useRef(false);
	const [isReady, setIsReady] = useState(false);
	const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

	useEffect(() => {
		if (!googleClientId) {
			return;
		}

		const initializeGoogle = () => {
			if (initializedRef.current || !window.google?.accounts?.id) {
				return;
			}

			window.google.accounts.id.initialize({
				client_id: googleClientId,
				callback: async (response) => {
					if (!response?.credential) {
						toast.error("Google sign-in did not return a credential.");
						return;
					}

					await onGoogleLogin(response.credential);
				},
			});

			initializedRef.current = true;
			setIsReady(true);
		};

		if (window.google?.accounts?.id) {
			initializeGoogle();
			return;
		}

		const existingScript = document.getElementById(GOOGLE_SCRIPT_ID);
		if (existingScript) {
			existingScript.addEventListener("load", initializeGoogle, { once: true });
			return () => {
				existingScript.removeEventListener("load", initializeGoogle);
			};
		}

		const script = document.createElement("script");
		script.id = GOOGLE_SCRIPT_ID;
		script.src = "https://accounts.google.com/gsi/client";
		script.async = true;
		script.defer = true;
		script.onload = initializeGoogle;
		script.onerror = () => toast.error("Google sign-in could not be loaded.");
		document.body.appendChild(script);

		return () => {
			script.onload = null;
		};
	}, [googleClientId, onGoogleLogin]);

	const handleSocialClick = () => {
		if (!googleClientId) {
			toast.error("Set VITE_GOOGLE_CLIENT_ID to enable Google sign-in.");
			return;
		}

		if (!window.google?.accounts?.id || !isReady) {
			toast.error("Google sign-in is still loading. Please try again.");
			return;
		}

		window.google.accounts.id.prompt((notification) => {
			if (notification.isNotDisplayed()) {
				toast.error("Google sign-in could not be displayed in this browser.");
			}
		});
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
				disabled={loading}
				className="auth-btn-social"
			>
				<img
					src="https://www.svgrepo.com/show/475656/google-color.svg"
					alt="Google"
					className="h-5 w-5"
				/>

				{loading
					? "Connecting..."
					: isRegister
						? "Sign up with Google"
						: "Continue with Google"}
			</button>
		</>
	);
}
