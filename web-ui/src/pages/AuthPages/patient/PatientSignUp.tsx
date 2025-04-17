import PatientSignUpForm from "../../../components/auth/patient/PatientSignUpForm";
import PageMeta from "../../../components/common/PageMeta";
import AuthLayout from "../AuthPageLayout";

export default function PatientSignUp() {
  return (
    <>
      <PageMeta
        title="React.js SignUp Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignUp Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <AuthLayout>
        <PatientSignUpForm/>
      </AuthLayout>
    </>
  );
}
