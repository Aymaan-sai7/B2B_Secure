import PageMeta from "../../components/common/PageMeta";
// import AuthLayout from "./AuthPageLayout";
import LoginForm from "../../components/auth/LoginForm";

export default function Login() {
  return (
    <>
      <PageMeta
        title="Login"
        description="This is Login"
      />
      {/* <AuthLayout> */}
        <LoginForm />
      {/* </AuthLayout> */}
    </>

  );
}
