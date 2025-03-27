import React from "react";
import AuthLayout from "../AuthPageLayout";
import DrSignUpForm from "../../../components/auth/doctor/DrSignUpForm";

const DrSignUp = () => {
  return (
    <AuthLayout isDoctorPage>
      <DrSignUpForm />
    </AuthLayout>
  );
};

export default DrSignUp;
