import "./auth.css";

export default function SocialLogin({ isRegister }) {
  return (
    <>
      {/* Divider */}

      <div className="auth-divider">
        <span>or</span>
      </div>

      {/* Google Button */}

      <button className="auth-btn-social">
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
