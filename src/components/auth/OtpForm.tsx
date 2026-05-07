import { useState } from "react";
import { useEffect } from "react";
import Button from "../ui/button/Button";

import api from "../../services/axios";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useRef } from "react";


export default function OtpForm() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ otp: "", api: "" });

  const navigate = useNavigate();
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    const email = localStorage.getItem("resetEmail");

    if (!email) {
      navigate("/forget");
    }
  }, [navigate]);

  useEffect(() => {
  const code = otp.join("");
  inputsRef.current[5]?.blur();
  if (code.length === 6 && !loading) {
    handleVerifyOtp();
  }
}, [otp, loading]);

  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);


  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (errors.otp) {
      setErrors((prev) => ({ ...prev, otp: "" }));
    }

    if (errors.api) {
      setErrors((prev) => ({ ...prev, api: "" }));
    }

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
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
    if (!email) {
      setErrors((prev) => ({
        ...prev,
        api: "Session expired, please try again",
      }));
      return;
    }
    const code = otp.join("");
    if (code.length !== 6) {
      setErrors((prev) => ({
        ...prev,
        otp: "Please enter the full 6-digit code",
      }));
      return;
    }
    try {
      setLoading(true);
      const res = await api.post("/auth/verifyResetCode", {
        resetCode: code,
        email,
      });
      console.log(res.data);
      inputsRef.current[5]?.blur();
      navigate("/reset");
    }
    catch (err) {
      if (axios.isAxiosError(err)) {
        setErrors((prev) => ({
          ...prev,
          api: err.response?.data?.message || "The code you entered is incorrect",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          api: "Something went wrong",
        }));
      }
      setOtp(["", "", "", "", "", ""]);
      inputsRef.current[0]?.focus();
    }
    finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setLoading(true);
      const email = localStorage.getItem("resetEmail");
      await api.post("/auth/forgotPasswords", {
        email,
      });
      setTimer(60);
      setCanResend(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <div className="  mt-[50px] sm:mb-8">
        <h1 className="font-bold text-[60px] text-black whitespace-nowrap w-fit mx-auto font-['Inter']">
          O T P
        </h1>
        <p className="text-sm font-['Noto_Sans'] text-[#686873]">
          Enter verification code
        </p>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-lg mx-auto">
        <div>
          <div>
            <form onSubmit={handleVerifyOtp}>
              <div className=" mt-[50px] space-y-6">
                <div>
                  <div className="relative">
                    <div
                      className="flex gap-3 justify-center"
                      onPaste={handlePaste}
                    >
                      {otp.map((value, index) => (
                        <input
                          key={index}
                          ref={(el) => {
                            if (el) inputsRef.current[index] = el;
                          }}
                          maxLength={1}
                          value={value}
                          onChange={(e) => handleChange(e.target.value, index)}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          className={`w-12 h-14 text-center text-xl border rounded-lg outline-none ${errors.otp ? "border-red-500" : "focus:border-[#12033A]"
                            }`}
                          aria-label={`OTP digit ${index + 1}`}
                        />

                      )
                      )}{errors.otp && (
                        <p className="text-red-500 text-sm text-center mt-2">
                          {errors.otp}
                        </p>
                      )}
                    </div>
                    <div className="text-center mt-4">
                      {!canResend ? (
                        <p className="text-sm text-gray-500">
  You can resend code in {timer}s
</p>
                      ) : (
                        <button
                          type="button"
                          onClick={handleResend}
                          className="text-blue-600 text-sm hover:underline"
                        >
                          Resend Code
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <Button
                  type = "button"
                    onClick={handleVerifyOtp}
                    disabled={loading || otp.join("").length !== 6}
                    className="w-full h-14 text-base mt-[154px] bg-[#12033A] hover:bg-[#12093A] text-white"
                    size="sm"
                  >
                    {loading ? "Verifying..." : "Verify"}
                  </Button>
                  {errors.api && (
                    <p className="text-red-500 text-sm text-center mt-2">
                      {errors.api}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
