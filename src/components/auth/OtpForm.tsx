import { useState } from "react";
// import { Link } from "react-router";
// import { ChevronLeftIcon } from "../../icons";
import {  EyeCloseIcon, EyeIcon } from "../../icons";
// import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

export default function OtpForm() {
  const [showOtp, setShowOtp] = useState(false);
  return (
    <div className="flex flex-col flex-1 items-center justify-center" >
      {/* <div className="w-full max-w-md pt-10 mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Back to dashboard
        </Link>
      </div> */}
                <div className="  mt-[50px] sm:mb-8">
            <h1 className="font-bold text-[60px] text-black whitespace-nowrap w-fit mx-auto font-['Inter']">
              O T P
            </h1>
            <p className="text-sm font-['Noto_Sans'] text-[#686873]">

              Enter verification code
            </p>
          </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>

          <div>
            <form>
              <div className=" mt-[50px] space-y-6">
                <div>
                  <div className="relative">
                    <Input
                    className="h-14 text-base"
                      type={showOtp ? "text" : "password"}
                      placeholder="Code..."
                    />
                    <span
                      onClick={() => setShowOtp(!showOtp)}
                      className="absolute z-30 cursor-pointer right-4 top-[20px] flex items-center"
                    >
                      {showOtp ? (
                        <EyeIcon className="fill-black dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-black dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                <div>
                  <Button className="w-full h-14 text-base mt-[154px] bg-[#12033A] hover:bg-[#12093A] text-white" size="sm">
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
