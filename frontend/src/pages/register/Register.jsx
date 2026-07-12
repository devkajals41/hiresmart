import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthLayout from "../../features/auth/AuthLayout";
import AuthIllustration from "../../features/auth/AuthIllustration";
import RegisterForm from "../../features/auth/RegisterForm";
import SocialLogin from "../../features/auth/SocialLogin";

import { registerUser } from "../../services/authService";

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
  return (
    <AuthLayout illustration={<AuthIllustration />}>
      <RegisterForm onSubmit={handleRegister} loading={loading} error={error} />

      <SocialLogin />

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
