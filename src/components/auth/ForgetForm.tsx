import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";
import axios from "axios";

export default function ForgetForm() {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            setError("Email is required");
            return;
        }
        try {
            setLoading(true);
            setError("");
            const res = await api.post("/auth/forgotPasswords", {
                email,
            });
            console.log(res.data);
            localStorage.setItem("resetEmail", email);
            navigate("/otp", { state: { email } });
        }
        catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || "Something went wrong");
            } else {
                setError("Something went wrong");
            }
        }
        finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex flex-col flex-1 items-center justify-center" >
            <div className=" mt-[50px] sm:mb-8">
                <h1 className="font-bold text-[60px] text-black whitespace-nowrap w-fit mx-auto font-['Inter']">
                    Forget Password
                </h1>
                <p className=" text-center text-sm font-['Noto_Sans'] text-[#686873]">
                    Enter your email address to receive an OTP
                </p>
            </div>
            <div className="flex flex-col justify-center flex-1 w-full max-w-lg mx-auto">
                <div>
                    <div>
                        <form onSubmit={handleSendOTP}>
                            <div className="mt-[50px] space-y-6">
                                <div className=" space-y-1 relative">
                                    <Input
                                        className="h-14 text-base"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (error) setError("");
                                        }}
                                    />
                                    {error && (
                                        <p className="text-red-500 text-sm mt-2">{error}</p>
                                    )}
                                </div>
                                <div>
                                    <Button
                                    type="submit"
                                        disabled={loading}
                                        className="w-full h-14 text-base mt-[154px] bg-[#12033A] hover:bg-[#12093A] text-white"
                                        size="sm"
                                    >
                                        {loading ? "Sending..." : "Send"}
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
