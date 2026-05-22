import PageMeta from "../../components/common/PageMeta";
import ForgetForm from "../../components/auth/ForgetForm";

export default function Forget() {
  return (
    <>
      <PageMeta
        title="Forget pass"
        description="This is forget"
      />
        <ForgetForm />
    </>
  );
}