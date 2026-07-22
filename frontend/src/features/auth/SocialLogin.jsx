import "./auth.css";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

const GOOGLE_SCRIPT_ID = "google-identity-services";

export default function SocialLogin({ isRegister, onGoogleLogin, loading = false }) {
	const buttonRef = useRef(null);
	const initializedRef = useRef(false);
	const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;


	useEffect(() => {
		if (!googleClientId) {
			return;
		}

		const initializeGoogle = () => {
			if (initializedRef.current || !window.google?.accounts?.id || !buttonRef.current) {
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

			window.google.accounts.id.renderButton(buttonRef.current, {
				theme: "outline",
				size: "large",
				shape: "rectangular",
				text: isRegister ? "signup_with" : "signin_with",
				width: 360,
			});

			initializedRef.current = true;
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

	return (
		<>
			{/* Divider */}

			<div className="auth-divider">
				<span>or</span>
			</div>

			{/* Google Button */}

			<div
				ref={buttonRef}
				className={loading ? "pointer-events-none opacity-60" : ""}
			/>

			{!googleClientId && (
				<p className="mt-3 text-center text-sm text-amber-600">
					Set VITE_GOOGLE_CLIENT_ID to enable Google sign-in.
				</p>
			)}
		</>
	);
}
