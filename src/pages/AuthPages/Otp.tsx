import PageMeta from "../../components/common/PageMeta";
// import AuthLayout from "./AuthPageLayout";
import OtpForm from "../../components/auth/OtpForm";

export default function Otp() {
  return (
    <>
      <PageMeta
        title="OTP"
        description="This is OTP"
      />
      {/* <AuthLayout> */}
        <OtpForm />
      {/* </AuthLayout> */}
    </>
  );
}