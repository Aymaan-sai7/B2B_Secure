import PageMeta from "../../components/common/PageMeta";
import ResetForm from "../../components/auth/ResetForm";

export default function Reset() {
  return (
    <>
      <PageMeta
        title="Reset password"
        description="This is reset password"
      />
        <ResetForm />
    </>
  );
}
