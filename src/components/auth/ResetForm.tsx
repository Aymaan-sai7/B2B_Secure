import { useState } from "react";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

import api from "../../services/axios";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
    api: "",
  });

  const isValidPassword = (password: string) => {
    return /^(?=.*\d).{8,16}$/.test(password);
  };

  const navigate = useNavigate();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ password: "", confirmPassword: "", api: "" });
    let hasError = false;
    if (!password) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      hasError = true;
    } else if (!isValidPassword(password)) {
      setErrors((prev) => ({
        ...prev,
        password: "8-16 chars + at least 1 number",
      }));
      hasError = true;
    }
    if (!confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Confirm password is required",
      }));
      hasError = true;
    } else if (password !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      hasError = true;
    }
    if (hasError) return;

    try {
      setLoading(true);

      const email = localStorage.getItem("resetEmail");
      if (!email) {
        setErrors((prev) => ({
          ...prev,
          api: "Session expired, please try again",
        }));
        setLoading(false);
        return;
      }

      const res = await api.put("/auth/resetPassword", {
        email,
        newPassword: password,
      });
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.removeItem("resetEmail");
      navigate("/",
         {
        state: { message: "Password reset successfully" },
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setErrors((prev) => ({
          ...prev,
          api: err.response?.data?.message || "Reset failed",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          api: "Reset failed",
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <div className="  mt-[50px] sm:mb-8">
        <h1 className="font-bold text-[60px] text-black whitespace-nowrap w-fit mx-auto font-['Inter']">
          Reset Your Password
        </h1>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-lg mx-auto">
        <div>
          <div>
            <form onSubmit={handleReset}>
              <div className="mt-[50px] space-y-6">
                <div>
                  <div className="space-y-1 relative">
                    <Input
                      type="password"
                      className={`h-14 text-base ${errors.password ? "border-red-500" : ""
                        }`}
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => {
                        const value = e.target.value;
                        setPassword(value);

                        if (errors.password || errors.api) {
                          setErrors((p) => ({ ...p, password: "", api: "" }));
                        }

                        if (confirmPassword && value !== confirmPassword) {
                          setErrors((p) => ({
                            ...p,
                            confirmPassword: "Passwords do not match",
                          }));
                        } else {
                          setErrors((p) => ({
                            ...p,
                            confirmPassword: "",
                          }));
                        }
                      }}
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      8-16 characters and at least 1 number
                    </p>
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <div className="relative space-y-1">
                    <Input
                      type="password"
                      value={confirmPassword}
                      placeholder="Confirm password"
                      onChange={(e) => {
                        const value = e.target.value;
                        setConfirmPassword(value);

                        if (errors.confirmPassword || errors.api) {
                          setErrors((p) => ({
                            ...p,
                            confirmPassword: "",
                            api: "",
                          }));
                        }

                        if (password && value !== password) {
                          setErrors((p) => ({
                            ...p,
                            confirmPassword: "Passwords do not match",
                          }));
                        } else {
                          setErrors((p) => ({
                            ...p,
                            confirmPassword: "",
                          }));
                        }
                      }}
                      className={`h-14 text-base ${errors.confirmPassword
                        ? "border-red-500"
                        : confirmPassword && password === confirmPassword
                          ? "border-green-500"
                          : ""
                        }`}
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-xs">
                        {errors.confirmPassword}
                      </p>
                    )}
                    {confirmPassword &&
                      password === confirmPassword &&
                      !errors.confirmPassword && (
                        <p className="text-green-500 text-xs">
                          Passwords match
                        </p>
                      )}
                  </div>
                </div>
                <div>
                  <Button
                  type="submit"
                    disabled={
                      loading ||
                      !password ||
                      !confirmPassword ||
                      password !== confirmPassword ||
                      !isValidPassword(password)
                    }
                    className="w-full h-14 text-base mt-[68px] text-white"
                    size="sm"
                  >
                    {loading ? "Resetting password..." : "Reset Password"}
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
