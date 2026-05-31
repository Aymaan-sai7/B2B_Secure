import { loginAPI } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useAdmin } from "../../context/AdminContext";

const isValidEmail    = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isValidPassword = (v: string) => /^(?=.{8,16}$).*$/.test(v);

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked]       = useState(false);
  const [loading, setLoading]           = useState(false);
  const [errors, setErrors]             = useState({ email: "", password: "" });
  const { refreshAdmin } = useAdmin();

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/");
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ email: "", password: "" });
    let hasError = false;

    if (!email) {
      setErrors((p) => ({ ...p, email: "Email is required" }));
      hasError = true;
    } else if (!isValidEmail(email)) {
      setErrors((p) => ({ ...p, email: "Invalid email format" }));
      hasError = true;
    }
    if (!password) {
      setErrors((p) => ({ ...p, password: "Password is required" }));
      hasError = true;
    } else if (!isValidPassword(password)) {
      setErrors((p) => ({ ...p, password: "8-16 chars + at least 1 number" }));
      hasError = true;
    }
    if (hasError) return;

    try {
  setLoading(true);
  const res = await loginAPI({ email, password });
  localStorage.setItem("token", res.access_token);
  enqueueSnackbar("Login successful", { variant: "success" });
  await refreshAdmin();
  navigate("/");
  setLoading(false);
} catch (error) {
  setLoading(false);
  let message = "Invalid email or password";
  if (axios.isAxiosError(error)) {
    message = error.response?.data?.message || message;
  }
  setErrors({ email: "", password: message });
}
  };

  const clearEmailError  = () => setErrors((p) => ({ ...p, email: "" }));
const clearPasswordError = () => setErrors((p) => ({ ...p, password: "" }));

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFFFF] dark:bg-[#101010] px-4">
      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#12033A] flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-[#12033A] dark:text-[#F3F4F6]">Welcome back</h1>
          <p className="text-sm text-[#9B9B9F] mt-1">Login to your admin dashboard</p>
        </div>

        {/* card */}
        <div className="bg-[#FFFFFF] dark:bg-white/[0.03] border border-[#E7E6EB] dark:border-[#5C5C5C] rounded-2xl px-8 py-8 shadow-sm">
          <form onSubmit={handleLogin} noValidate>
            <div className="space-y-5">
              <div>
                <label className="block text-sm text-[#9B9B9F] mb-1.5">Email address</label>
                <Input
                  type="email" value={email} onChange={(e) => { setEmail(e.target.value); clearEmailError(); }}
                  className={`h-11 text-sm ${errors.email ? "border-[#FF4951]" : ""}`} placeholder="admin@.com"
                />
                {errors.email && (
                  <p className="text-[#FF4951] text-xs mt-1">{errors.email}</p>)}
              </div>

              <div>
                <label className="block text-sm text-[#9B9B9F] mb-1.5"> Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}value={password} onChange={(e) => { setPassword(e.target.value); clearPasswordError(); }}
                    placeholder="pass..." className={`h-11 text-sm pr-10 ${errors.password ? "border-[#FF4951]" : ""}`}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#9B9B9F] hover:text-[#12033A] dark:hover:text-[#F3F4F6] transition-colors z-10"
                  >
                    {showPassword
                      ? <EyeIcon className="fill-current size-5" />
                      : <EyeCloseIcon className="fill-current size-5" />
                    }
                  </span>
                </div>
                {errors.password && ( <p className="text-[#FF4951] text-xs mt-1">{errors.password}</p> )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    className="text-[#12033A] checked:bg-[#12033A] checked:border-[#12033A]" checked={isChecked} onChange={setIsChecked} id="remember"
                  />
                  <span className="text-sm text-[#12033A] dark:text-[#EDEDED]">Remember me</span>
                </label>
                <Link
                  to="/forget" className="text-sm text-[#0047FF] hover:underline underline-offset-2"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit" disabled={loading || !email || !password || !isValidEmail(email)}
                className="w-full h-11 text-sm bg-[#12033A] hover:bg-[#1e0a5e] text-white rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed" size="sm"
              >
                {loading ? "Login in..." : "Login"}
              </Button>
            </div>
          </form>
        </div>

        <p className="text-center text-xs text-[#9B9B9F] mt-6">Secure admin access </p>
      </div>
    </div>
  );
}