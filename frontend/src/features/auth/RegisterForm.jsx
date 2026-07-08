import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Home,
  ArrowRight,
} from "lucide-react";
import "./auth.css";

export default function RegisterForm({
  onSubmit,
  loading,
  error,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});
  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = (e) => {
  e.preventDefault();

  if (formData.password.length < 8) {
    alert("Password must be at least 8 characters long.");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  onSubmit(formData);
};

  return (
    <form onSubmit={handleSubmit}>
      {/* Brand logo header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 shadow-md shadow-emerald-700/20">
          <Home size={20} className="text-white" />
        </div>
        <div>
          <h1 className="auth-brand text-[22px]">HireSmart</h1>
          <p className="text-[11px] font-medium tracking-wide text-slate-400">
            Analyze. Practice. Improve.
          </p>
        </div>
      </div>

      {/* Heading section */}
      <div className="mb-5">
        <h2 className="auth-heading text-[32px]">Create your account</h2>
        <p className="auth-subheading mt-1.5 text-[15px]">
          Start your journey to a <span className="text-emerald-700 font-semibold">better you</span>.
        </p>
      </div>

      {error && (
  <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
    {error}
  </div>
)}

      {/* Name Input */}
      <div className="mb-3">
        <label className="auth-label">Full Name</label>
        <div className="auth-input-group h-[46px]!">
          <User size={18} className="text-slate-400 shrink-0" />
         <input
  type="text"
  name="name"
  value={formData.name}
  onChange={handleChange}
  placeholder="Enter your full name"
  className="w-full bg-transparent outline-none"
/>
        </div>
      </div>

      {/* Email Input */}
      <div className="mb-3">
        <label className="auth-label">Email Address</label>
        <div className="auth-input-group h-[46px]!">
          <Mail size={18} className="text-slate-400 shrink-0" />
          <input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="Enter your email"
  className="w-full bg-transparent outline-none"
/>
        </div>
      </div>

      {/* Password Input */}
      <div className="mb-3">
        <label className="auth-label">Password</label>
        <div className="auth-input-group h-[46px]!">
          <Lock size={18} className="text-slate-400 shrink-0" />
          <input
  type={showPassword ? "text" : "password"}
  name="password"
  value={formData.password}
  onChange={handleChange}
  placeholder="Create a password"
  className="w-full bg-transparent outline-none"
/>
          <button
                type="button"
            
            className="ml-2 shrink-0 p-1 rounded-lg hover:bg-slate-100"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} className="text-slate-400" /> : <Eye size={18} className="text-slate-400" />}
          </button>
        </div>
      </div>

      {/* Confirm Password Input */}
      <div className="mb-4">
        <label className="auth-label">Confirm Password</label>
        <div className="auth-input-group h-[46px]!">
          <Lock size={18} className="text-slate-400 shrink-0" />
         <input
  type={showConfirmPassword ? "text" : "password"}
  name="confirmPassword"
  value={formData.confirmPassword}
  onChange={handleChange}
  placeholder="Confirm your password"
  className="w-full bg-transparent outline-none"
/>
          <button
            type="button"
            className="ml-2 shrink-0 p-1 rounded-lg hover:bg-slate-100"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={18} className="text-slate-400" /> : <Eye size={18} className="text-slate-400" />}
          </button>
        </div>
      </div>


    {/* Terms Agreement Checkbox */}
<div className="mb-5 flex items-start gap-3">
  <input
    type="checkbox"
    className="auth-checkbox mt-1"
    id="terms"
    required
  />

  <label
    htmlFor="terms"
    className="text-[13px] text-slate-500 leading-5 cursor-pointer select-none"
  >
    I agree to the{" "}
    <a
      href="/terms"
      className="font-semibold text-emerald-700 hover:underline"
    >
      Terms of Service
    </a>{" "}
    and{" "}
    <a
      href="/privacy"
      className="font-semibold text-emerald-700 hover:underline"
    >
      Privacy Policy
    </a>
  </label>
</div>
      {/* Submit Button */}
      <button
  type="submit"
  className="auth-btn-primary py-[10px]! text-[15px]!"
>
       {loading ? (
  "Creating Account..."
) : (
  <>
    Create Account
    <ArrowRight size={18} />
  </>
)}
      </button>
    </form>
  );
}
