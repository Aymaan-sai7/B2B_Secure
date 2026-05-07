import { loginAPI } from "../../services/authService";
import { useNavigate } from "react-router-dom";

import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";

import { useState } from "react";
import { Link } from "react-router-dom";
import { EyeCloseIcon, EyeIcon } from "../../icons";

import { useEffect } from "react";
import axios from "axios";
import { ApiError } from "../../interfaces/apiError";
import { enqueueSnackbar } from "notistack";

export default function LoginForm() {

  const [loading, setLoading] = useState(false);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const isValidPassword = (password: string) => {
    const regex = /^(?=.*\d).{8,16}$/;
    return regex.test(password);
  };

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    console.log({
      email,
      password,
    });
    e.preventDefault();
    setErrors({ email: "", password: "" });
    let hasError = false;

    if (!email) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      hasError = true;
    } else if (!isValidEmail(email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
      hasError = true;
    }
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
    if (hasError) return;

    try {
      setLoading(true);

      const res = await loginAPI({ email, password });
      console.log("LOGIN RESPONSE:", res);

      localStorage.setItem("token", res.token);
      enqueueSnackbar("Login successful", { variant: "success" });
      navigate("/");
    } catch (error) {
      let message = "Invalid email or password";
      if (axios.isAxiosError<ApiError>(error)) {
        message = error.response?.data?.message || message;
      }
      setErrors({
        email: "",
        password: message,
      });
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <div className=" mt-[50px] sm:mb-8">
        <h1 className="font-bold text-[60px] text-black whitespace-nowrap w-fit mx-auto font-['Inter']">
          Login
        </h1>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-lg mx-auto">
        <div>
          <div>
            <form onSubmit={handleLogin}>
              <div className=" mt-[50px] space-y-6">
                <div>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email || errors.password) {
                        setErrors((p) => ({
                          ...p,
                          email: "",
                          password: "",
                        }));
                      }
                    }}
                    className="h-14 text-base"
                    placeholder="Email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 animate-fade-in">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <div className=" space-y-1 relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password || errors.email)
                          setErrors((p) => ({ ...p, password: "" }));
                      }}
                      placeholder="Password"
                      className="h-14 text-base"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1 animate-fade-in">
                        {errors.password}
                      </p>
                    )}

                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 cursor-pointer right-4 top-[20px] flex items-center"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-black dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-black dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between ">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      className="text-black checked:bg-black checked:border-black"
                      checked={isChecked}
                      onChange={setIsChecked}
                      id="remember"
                    />
                    <span className="block font-normal text-black text-theme-sm">
                      Remember me
                    </span>
                  </div>
                  <Link
                    to="/forget"
                    className="text-sm text-[#0047FF] hover:text-blue-700"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <div>
                  <Button
                    type="submit"
                    disabled={
                      loading || !email || !password || !isValidEmail(email)
                    }
                    className="w-full h-14 text-base mt-[50px] bg-[#12033A] hover:bg-[#12093A] text-white"
                    size="sm"
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
