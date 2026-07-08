import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../../features/auth/AuthLayout";
import AuthIllustration from "../../features/auth/AuthIllustration";
import LoginForm from "../../features/auth/LoginForm";
import SocialLogin from "../../features/auth/SocialLogin";

import { loginUser } from "../../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (formData) => {
    try {
      setLoading(true);
      setError("");

      const response = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem(
        "accessToken",
        response.token.access_token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.user)
      );

      navigate("/dashboard");
    } catch (err) {
      if (Array.isArray(err.response?.data?.detail)) {
        setError(err.response.data.detail[0].msg);
      } else {
        setError(
          err.response?.data?.detail ||
          "Invalid email or password."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout illustration={<AuthIllustration />}>
      <LoginForm
        onSubmit={handleLogin}
        loading={loading}
        error={error}
      />

      <SocialLogin isRegister={false} />

      <p className="mt-8 text-center text-sm text-slate-500">
        Don't have an account?{" "}
        <a
          href="/register"
          className="font-semibold text-emerald-700 hover:underline"
        >
          Sign Up
        </a>
      </p>
    </AuthLayout>
  );
}