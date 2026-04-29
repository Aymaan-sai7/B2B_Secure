import { useState } from "react";
import { Link } from "react-router";
import {  EyeCloseIcon, EyeIcon } from "../../icons";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();

  console.log("Email:", email);
  console.log("Password:", password);
};

  
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      {/* <div className="w-full max-w-md pt-10 mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Back to dashboard
        </Link>
      </div> */}
                <div className=" mt-[50px] sm:mb-8">
            <h1 className="font-bold text-[60px] text-black whitespace-nowrap w-fit mx-auto font-['Inter']">
              Login
            </h1>
          </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>

          <div>
            <form onSubmit={handleLogin}>
              <div className=" mt-[50px] space-y-6">
                <div>
                  <Input type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
                  className="h-14 text-base" placeholder="Email" />
                </div>
                <div>
                  <div className="relative">
                    <Input
  type={showPassword ? "text" : "password"}
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Password"
  className="h-14 text-base"
/>

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
                    <Checkbox className="text-black checked:bg-black checked:border-black" checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-black text-theme-sm">
                      Remember me
                    </span>
                  </div>
                  <Link
                    to="/Reset"
                    className="text-sm text-[#0047FF] hover:text-blue-700"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <div>
                  <Button className="w-full h-14 text-base mt-[50px] bg-[#12033A] hover:bg-[#12093A] text-white" size="sm">
                    Login
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






















// import { useState } from "react";
// import { Link } from "react-router";
// import {  EyeCloseIcon, EyeIcon } from "../../icons";
// import Input from "../form/input/InputField";
// import Checkbox from "../form/input/Checkbox";
// import Button from "../ui/button/Button";

// export default function LoginForm() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [isChecked, setIsChecked] = useState(false);

  
//   return (
//     <div className="flex flex-col flex-1 items-center justify-center">
//       {/* <div className="w-full max-w-md pt-10 mx-auto">
//         <Link
//           to="/"
//           className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
//         >
//           <ChevronLeftIcon className="size-5" />
//           Back to dashboard
//         </Link>
//       </div> */}
//                 <div className=" mt-[50px] sm:mb-8">
//             <h1 className="font-bold text-[60px] text-black whitespace-nowrap w-fit mx-auto font-['Inter']">
//               Login
//             </h1>
//           </div>
//       <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
//         <div>

//           <div>
//             <form>
//               <div className=" mt-[50px] space-y-6">
//                 <div>
//                   <Input className="h-14 text-base" placeholder="Email" />
//                 </div>
//                 <div>
//                   <div className="relative">
//                     <Input
//                     className="h-14 text-base"
//                       type={showPassword ? "text" : "password"}
//                       placeholder="password"
//                     />
//                     <span
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute z-30 cursor-pointer right-4 top-[20px] flex items-center"
//                     >
//                       {showPassword ? (
//                         <EyeIcon className="fill-black dark:fill-gray-400 size-5" />
//                       ) : (
//                         <EyeCloseIcon className="fill-black dark:fill-gray-400 size-5" />
//                       )}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-between ">
//                   <div className="flex items-center gap-3">
//                     <Checkbox className="text-black checked:bg-black checked:border-black" checked={isChecked} onChange={setIsChecked} />
//                     <span className="block font-normal text-black text-theme-sm">
//                       Remember me
//                     </span>
//                   </div>
//                   <Link
//                     to="/Reset"
//                     className="text-sm text-[#0047FF] hover:text-blue-700"
//                   >
//                     Forgot your password?
//                   </Link>
//                 </div>
//                 <div>
//                   <Button className="w-full h-14 text-base mt-[50px] bg-[#12033A] hover:bg-[#12093A] text-white" size="sm">
//                     Login
//                   </Button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
