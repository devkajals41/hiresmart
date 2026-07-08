import { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Home,
  ArrowRight,
} from "lucide-react";
import "./auth.css";

export default function LoginForm({
  onSubmit,
  loading,
  error,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
  };



  return (
    <form onSubmit={handleSubmit}>
      {/* Logo */}

      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 shadow-md shadow-emerald-700/20">
          <Home size={20} className="text-white" />
        </div>

        <div>
          <h1 className="auth-brand text-[22px]">
            HireSmart
          </h1>

          <p className="text-[11px] font-medium tracking-wide text-slate-400">
            Analyze. Practice. Improve.
          </p>
        </div>
      </div>

      {/* Heading */}

      <div className="mb-8">
        <h2 className="auth-heading text-[36px]">
          Welcome back
          
        </h2>

        <p className="auth-subheading mt-2 text-[16px]">
          Log in to continue your journey
        </p>
      </div>

      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Email */}

      <div className="mb-5">
        <label className="auth-label">
          Email address
        </label>

        <div className="auth-input-group">
          <Mail
            size={18}
            className="text-slate-400 shrink-0"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
      </div>

      {/* Password */}

      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <label className="auth-label mb-0!">
            Password
          </label>

          <button
            type="button"
            className="auth-link text-[13px]"
          >
            Forgot password?
          </button>
        </div>

        <div className="auth-input-group">
          <Lock
            size={18}
            className="text-slate-400 shrink-0"
          />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />

          <button
            type="button"
            className="ml-2 shrink-0 p-1 rounded-lg transition hover:bg-slate-100"
            onClick={() =>
              setShowPassword(!showPassword)
            }
          >
            {showPassword ? (
              <EyeOff
                size={18}
                className="text-slate-400"
              />
            ) : (
              <Eye
                size={18}
                className="text-slate-400"
              />
            )}
          </button>
        </div>
      </div>

      {/* Remember */}

      <div className="mb-7 flex items-center gap-3">
        <input
          type="checkbox"
          className="auth-checkbox"
        />

        <span className="text-[14px] text-slate-500">
          Remember me
        </span>
      </div>

      {/* Button */}

      <button
        type="submit"
        disabled={loading}
        className="auth-btn-primary"
      >
        {loading ? (
          "Logging in..."
        ) : (
          <>
            Log in
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </form>
  );
}