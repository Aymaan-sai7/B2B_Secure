import { useState, useEffect, useRef } from "react";
import Button from "../ui/button/Button";
import api from "../../services/axios";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function OtpForm() {
  const [otp, setOtp]       = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors]   = useState({ otp: "", api: "" });
  const [timer, setTimer]     = useState(60);
  const [canResend, setCanResend] = useState(false);
  const navigate    = useNavigate();
  const inputsRef   = useRef<HTMLInputElement[]>([]);

  useEffect(() => { inputsRef.current[0]?.focus(); }, []);

  useEffect(() => {
    const email = localStorage.getItem("resetEmail");
    if (!email) navigate("/forget");
  }, [navigate]);

  useEffect(() => {
    const code = otp.join("");
    inputsRef.current[5]?.blur();
    if (code.length === 6 && !loading) handleVerifyOtp();
  }, [otp, loading]);

  useEffect(() => {
    if (timer <= 0) { setCanResend(true); return; }
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (errors.otp) setErrors((p) => ({ ...p, otp: "" }));
    if (errors.api) setErrors((p) => ({ ...p, api: "" }));
    if (value && index < 5) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0)
      inputsRef.current[index - 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pasteData)) return;
    const newOtp = pasteData.split("");
    setOtp(newOtp);
    inputsRef.current[newOtp.length - 1]?.focus();
  };

  const handleVerifyOtp = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const email = localStorage.getItem("resetEmail");
    if (!email) { setErrors((p) => ({ ...p, api: "Session expired, please try again" })); return; }
    const code = otp.join("");
    if (code.length !== 6) { setErrors((p) => ({ ...p, otp: "Please enter the full 6-digit code" })); return; }
    try {
      setLoading(true);
      const res = await api.post("/mfa/send-otp", { resetCode: code, email });
      console.log(res.data);
      inputsRef.current[5]?.blur();
      navigate("/reset");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setErrors((p) => ({ ...p, api: err.response?.data?.message || "The code you entered is incorrect" }));
      } else {
        setErrors((p) => ({ ...p, api: "Something went wrong" }));
      }
      setOtp(["", "", "", "", "", ""]);
      inputsRef.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setLoading(true);
      const email = localStorage.getItem("resetEmail");
      await api.post("/auth/forgotPasswords", { email });
      setTimer(60);
      setCanResend(false);
    } catch (err) {
      console.log(err);
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-[#12033A] dark:text-[#F3F4F6]"> Verification code </h1>
          <p className="text-sm text-[#9B9B9F] mt-1">Enter the 6-digit code sent to your email </p>
        </div>

        {/* card */}
        <div className="bg-white dark:bg-white/[0.03] border border-[#E7E6EB] dark:border-[#5C5C5C] rounded-2xl px-8 py-8 shadow-sm">
          <form onSubmit={handleVerifyOtp} noValidate>
            <div className="space-y-6">
              {/* inputs */}
              <div>
                <div className="flex gap-3 justify-center" onPaste={handlePaste}>
                  {otp.map((value, index) => (
                    <input
                      key={index}
                      ref={(el) => { if (el) inputsRef.current[index] = el; }}
                      maxLength={1}
                      value={value}
                      onChange={(e) => handleChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      aria-label={`OTP digit ${index + 1}`}
                      className={`
                        w-12 h-12 text-center text-lg font-semibold rounded-xl border outline-none transition-colors
                        bg-[#F1F3FA] dark:bg-[#1E1E1E]
                        text-[#12033A] dark:text-[#EDEDED]
                        ${errors.otp
                          ? "border-[#FF4951]"
                          : value
                            ? "border-[#12033A] dark:border-[#F3F4F6]"
                            : "border-[#E7E6EB] dark:border-[#5C5C5C] focus:border-[#12033A] dark:focus:border-[#F3F4F6]"
                        }
                      `}
                    />
                  ))}
                </div>

                {errors.otp && (
                  <p className="text-[#FF4951] text-xs text-center mt-2">{errors.otp} </p>
                )}
              </div>

              {/* timer - resend */}
              <div className="text-center">
                {!canResend ? (
                  <p className="text-sm text-[#9B9B9F]">
                    Resend code in{" "}
                    <span className="font-semibold text-[#12033A] dark:text-[#F3F4F6]">
                      {timer}s
                    </span>
                  </p>
                ) : (
                  <button
                    type="button" onClick={handleResend}
                    className="text-sm text-[#0047FF] hover:underline underline-offset-2 transition-colors"
                  >
                    Resend code
                  </button>
                )}
              </div>

              <Button
                type="button" onClick={handleVerifyOtp} disabled={loading || otp.join("").length !== 6}
                className="w-full h-11 text-sm bg-[#12033A] hover:bg-[#1e0a5e] text-white rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed" size="sm"
              >
                {loading ? "Verifying..." : "Verify code"}
              </Button>

              {errors.api && ( <p className="text-[#FF4951] text-xs text-center -mt-2"> {errors.api}</p>)}
            </div>
          </form>
        </div>

        <p className="text-center text-xs text-[#9B9B9F] mt-6"> Secure admin access</p>
      </div>
    </div>
  );
}