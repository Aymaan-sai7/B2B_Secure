import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

export default function ForgetForm() {
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
            <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
                <div>
                    <div>
                        <form>
                            <div className="mt-[50px] space-y-6">
                                    <div>
                                        <Input className="h-14 text-base" placeholder="Email" />
                                    </div>
                                <div>
                                    <Button className=" w-full h-14 text-base mt-[154px] bg-[#12033A] hover:bg-[#12093A] text-white" size="sm">
                                        Send
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
