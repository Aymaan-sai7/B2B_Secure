import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";
import axios from "axios";

export default function ForgetForm() {
  const [email, setEmail]     = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const navigate = useNavigate();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { setError("Email is required"); return; }
    try {
      setLoading(true);
      setError("");
      const res = await api.post("/forgot-password", { email });
      console.log(res.data);
      localStorage.setItem("resetEmail", email);
      navigate("/otp", { state: { email } });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Something went wrong");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFFFF] dark:bg-[#101010] px-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#12033A] flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-[#12033A] dark:text-[#F3F4F6]">
            Forgot password?
          </h1>
          <p className="text-sm text-[#9B9B9F] mt-1">
            Enter your email address to receive an OTP
          </p>
        </div>

        {/* card */}
        <div className="bg-white dark:bg-white/[0.03] border border-[#E7E6EB] dark:border-[#5C5C5C] rounded-2xl px-8 py-8 shadow-sm">
          <form onSubmit={handleSendOTP} noValidate>
            <div className="space-y-5">
              <div>
                <label className="block text-sm text-[#9B9B9F] mb-1.5">Email address</label>
                <Input
                  type="email" className={`h-11 text-sm ${error ? "border-[#FF4951]" : ""}`} placeholder="admin@.com"
                  value={email} onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
                />
                {error && (
                  <p className="text-[#FF4951] text-xs mt-1">{error}</p>
                )}
              </div>

              <Button
                type="submit" disabled={loading || !email}
                className="w-full h-11 text-sm bg-[#12033A] hover:bg-[#1e0a5e] text-white rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed" size="sm"
              >
                {loading ? "Sending..." : "Send OTP"}
              </Button>
            </div>
          </form>
        </div>

        <div className="text-center mt-6">
          <a href="/login" className="text-sm text-[#0047FF] hover:underline underline-offset-2">
            Back to Login
          </a>
        </div>

        <p className="text-center text-xs text-[#9B9B9F] mt-4">
          Secure admin access
        </p>

      </div>
    </div>
  );
}