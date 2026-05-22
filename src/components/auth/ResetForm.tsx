import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";
import axios from "axios";

const isValidPassword = (v: string) => /^(?=.*\d).{8,16}$/.test(v);

export default function ResetForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ password: "", confirmPassword: "", api: "" });
  const navigate = useNavigate();
  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ password: "", confirmPassword: "", api: "" });
    let hasError = false;

    if (!password) {
      setErrors((p) => ({ ...p, password: "Password is required" }));
      hasError = true;
    } else if (!isValidPassword(password)) {
      setErrors((p) => ({ ...p, password: "8-16 chars + at least 1 number" }));
      hasError = true;
    }
    if (!confirmPassword) {
      setErrors((p) => ({ ...p, confirmPassword: "Confirm password is required" }));
      hasError = true;
    } else if (password !== confirmPassword) {
      setErrors((p) => ({ ...p, confirmPassword: "Passwords do not match" }));
      hasError = true;
    }
    if (hasError) return;

    try {
      setLoading(true);
      const email = localStorage.getItem("resetEmail");
      if (!email) {
        setErrors((p) => ({ ...p, api: "Session expired, please try again" }));
        setLoading(false);
        return;
      }
      const res = await api.put("/auth/resetPassword", { email, newPassword: password });
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.removeItem("resetEmail");
      navigate("/", { state: { message: "Password reset successfully" } });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setErrors((p) => ({ ...p, api: err.response?.data?.message || "Reset failed" }));
      } else {
        setErrors((p) => ({ ...p, api: "Reset failed" }));
      }
    } finally {
      setLoading(false);
    }
  };

  const passwordsMatch = confirmPassword && password === confirmPassword;
  const isFormValid = password && confirmPassword && password === confirmPassword && isValidPassword(password);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFFFF] dark:bg-[#101010] px-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#12033A] flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-[#12033A] dark:text-[#F3F4F6]">Reset your password</h1>
          <p className="text-sm text-[#9B9B9F] mt-1"> Choose a new secure password for your account</p>
        </div>

        {/* card */}
        <div className="bg-white dark:bg-white/[0.03] border border-[#E7E6EB] dark:border-[#5C5C5C] rounded-2xl px-8 py-8 shadow-sm">
          <form onSubmit={handleReset} noValidate>
            <div className="space-y-5">

              <div>
                <label className="block text-sm text-[#9B9B9F] mb-1.5">
                  New password
                </label>
                <Input
                  type="password" placeholder="pass..."
                  value={password}
                  onChange={(e) => {
                    const v = e.target.value;
                    setPassword(v);
                    if (errors.password || errors.api) setErrors((p) => ({ ...p, password: "", api: "" }));
                    if (confirmPassword && v !== confirmPassword) {
                      setErrors((p) => ({ ...p, confirmPassword: "Passwords do not match" }));
                    }
                    else {
                      setErrors((p) => ({ ...p, confirmPassword: "" }));
                    }
                  }}
                  className={`h-11 text-sm ${errors.password ? "border-[#FF4951]" : ""}`}
                />
                <p className="text-xs text-[#9B9B9F] mt-1">8–16 characters, at least 1 number</p>
                {errors.password && (
                  <p className="text-[#FF4951] text-xs mt-1">{errors.password}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-[#9B9B9F] mb-1.5"> Confirm password</label>
                <Input
                  type="password" placeholder="pass..."
                  value={confirmPassword}
                  onChange={(e) => {
                    const v = e.target.value;
                    setConfirmPassword(v);
                    if (errors.confirmPassword || errors.api) setErrors((p) => ({ ...p, confirmPassword: "", api: "" }));
                    if (password && v !== password) {
                      setErrors((p) => ({ ...p, confirmPassword: "Passwords do not match" }));
                    }
                    else {
                      setErrors((p) => ({ ...p, confirmPassword: "" }));
                    }
                  }}
                  className={`h-11 text-sm ${errors.confirmPassword
                      ? "border-[#FF4951]"
                      : passwordsMatch
                        ? "border-[#04BE7B]"
                        : ""
                    }`}
                />
                {errors.confirmPassword && (
                  <p className="text-[#FF4951] text-xs mt-1">{errors.confirmPassword}</p>
                )}
                {passwordsMatch && !errors.confirmPassword && (
                  <p className="text-[#04BE7B] text-xs mt-1">Passwords match</p>
                )}
              </div>

              {errors.api && (
                <p className="text-[#FF4951] text-xs text-center">{errors.api}</p>
              )}

              <Button
                type="submit"
                disabled={loading || !isFormValid}
                className="w-full h-11 text-sm bg-[#12033A] hover:bg-[#1e0a5e] text-white rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                size="sm"
              >
                {loading ? "Resetting..." : "Reset password"}
              </Button>
            </div>
          </form>
        </div>
        <p className="text-center text-xs text-[#9B9B9F] mt-6"> Secure admin access </p>
      </div>
    </div>
  );
}