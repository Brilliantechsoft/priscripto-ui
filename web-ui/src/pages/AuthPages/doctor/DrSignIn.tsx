import React from "react";
import AuthLayout from "../AuthPageLayout";
import DrSignInForm from "../../../components/auth/doctor/DrSignInForm";

const DrSignIn = () => {
  return (
    <AuthLayout isDoctorPage>
      <DrSignInForm />
    </AuthLayout>
  );
};

export default DrSignIn;
