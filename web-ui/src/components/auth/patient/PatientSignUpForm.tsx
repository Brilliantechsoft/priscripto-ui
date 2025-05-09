import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../../icons";
import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import Checkbox from "../../form/input/Checkbox";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useAppDispatch } from "../../../hooks/appDispatchHook";
import { registerPatient } from "../../../redux/slices/patient/registerPatientSlice";
// import { registerDoctor } from "../../../redux/slices/doctor/registerDoctorSlice";

export default function PatientSignUpForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { status, error } = useSelector(
    (state: RootState) => state.registerPatient
  );

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    terms: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the error message when the user starts typing
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      terms: "",
    };

    // validate first name
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
      isValid = false;
    }

    // validate last name
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
      isValid = false;
    }

    // validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email";
      isValid = false;
    }

    //validate password
    const passwordRegex = /^(?=.*[0-9!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long and contain at least one number and special character";
      isValid = false;
    }

    if (!isChecked) {
      newErrors.terms = "You must agree to the terms and conditions";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await dispatch(registerPatient(formData)).unwrap();
        navigate("/patientsignin");
      } catch (error) {
        console.error("Registration Failed:", error);
      }

      // Log the Redux store state after dispatching
      console.log("Redux Store State After Dispatch:", formData);
    }
  };

  // Log the Redux store state whenever it changes
  useEffect(() => {
    console.log("Redux Store State Updated:", formData);
  }, [formData]);

  return (
    <div className="flex items-center justify-center w-full h-full lg:w-1/2">
      <div className="w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="mb-4">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <ChevronLeftIcon className="size-5" />
            Back to Home
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span>
              Are you a Doctor?{" "}
              <Link
                to="/drsignup"
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Sign Up as Doctor
              </Link>
            </span>
          </p>
        </div>

        <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
          <div>
            <div className="mb-5 text-center">
              <h1 className="mb-1 text-2xl font-bold text-gray-800 dark:text-white/90">
                Patient Sign Up
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enter your email and password to sign up!
              </p>
            </div>
            <div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
                <button className="flex items-center justify-center gap-2 py-2 text-xs font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg px-4 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.7511 10.1944C18.7511 9.47495 18.6915 8.94995 18.5626 8.40552H10.1797V11.6527H15.1003C15.0011 12.4597 14.4654 13.675 13.2749 14.4916L13.2582 14.6003L15.9087 16.6126L16.0924 16.6305C17.7788 15.1041 18.7511 12.8583 18.7511 10.1944Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M10.1788 18.75C12.5895 18.75 14.6133 17.9722 16.0915 16.6305L13.274 14.4916C12.5201 15.0068 11.5081 15.3666 10.1788 15.3666C7.81773 15.3666 5.81379 13.8402 5.09944 11.7305L4.99473 11.7392L2.23868 13.8295L2.20264 13.9277C3.67087 16.786 6.68674 18.75 10.1788 18.75Z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.10014 11.7305C4.91165 11.186 4.80257 10.6027 4.80257 9.99992C4.80257 9.3971 4.91165 8.81379 5.09022 8.26935L5.08523 8.1534L2.29464 6.02954L2.20333 6.0721C1.5982 7.25823 1.25098 8.5902 1.25098 9.99992C1.25098 11.4096 1.5982 12.7415 2.20333 13.9277L5.10014 11.7305Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M10.1789 4.63331C11.8554 4.63331 12.9864 5.34303 13.6312 5.93612L16.1511 3.525C14.6035 2.11528 12.5895 1.25 10.1789 1.25C6.68676 1.25 3.67088 3.21387 2.20264 6.07218L5.08953 8.26943C5.81381 6.15972 7.81776 4.63331 10.1789 4.63331Z"
                      fill="#EB4335"
                    />
                  </svg>
                  Sign in with Google
                </button>
                <button className="flex items-center justify-center gap-2 py-2 text-xs font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg px-4 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10">
                  <svg
                    width="21"
                    className="fill-current"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M15.6705 1.875H18.4272L12.4047 8.75833L19.4897 18.125H13.9422L9.59717 12.4442L4.62554 18.125H1.86721L8.30887 10.7625L1.51221 1.875H7.20054L11.128 7.0675L15.6705 1.875ZM14.703 16.475H16.2305L6.37054 3.43833H4.73137L14.703 16.475Z" />
                  </svg>
                  Sign in with X
                </button>
              </div>
              <div className="relative my-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-2 text-xs text-gray-400 bg-white dark:bg-gray-800 dark:text-gray-300">
                    Or
                  </span>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <Label className="text-sm">
                      First Name<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="py-2 text-sm"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-xs text-error-500">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm">
                      Last Name<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="py-2 text-sm"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-xs text-error-500">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-sm">
                    Email<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="py-2 text-sm"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-error-500">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="text-sm">
                    Password<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="py-2 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="w-4 h-4 text-gray-400" />
                      ) : (
                        <EyeCloseIcon className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-xs text-error-500">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="flex items-start gap-2 pt-1">
                  <Checkbox
                    checked={isChecked}
                    onChange={setIsChecked}
                    className="w-4 h-4 mt-0.5"
                  />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      By creating an account, you agree to our{" "}
                      <span className="text-gray-700 dark:text-gray-300">
                        Terms
                      </span>{" "}
                      and{" "}
                      <span className="text-gray-700 dark:text-gray-300">
                        Privacy Policy
                      </span>
                    </p>
                    {errors.terms && (
                      <p className="mt-1 text-xs text-error-500">
                        {errors.terms}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className={`w-full py-2 text-sm font-medium text-white rounded-lg transition ${
                    isChecked
                      ? "bg-brand-500 hover:bg-brand-600"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={status === "loading" || !isChecked}
                >
                  {status === "loading" ? "Signing Up..." : "Sign Up"}
                </button>
                {error && <p className="text-red-500">{error}</p>}
              </form>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Already have an account?
                  <Link
                    to="/patientsignin"
                    className="font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// import { useState, FormEvent } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { Toaster, toast } from "react-hot-toast";
// import { register } from "../../../redux/slices/auth/authSlice";
// import { RootState, AppDispatch } from "../../../redux/store";
// // import Button from "../../../components/";
// // import Input from "../../components/form/input/InputField";
// // import Label from "../../components/form/Label";
// // import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
// import Button from "../../ui/button/Button";
// import Input from "../../form/input/InputField";
// import Label from "../../form/Label";
// import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../../icons";

// interface FormData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
// }

// export default function PatientSignUpForm() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState<FormData>({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//   });
//   const [errors, setErrors] = useState<Partial<FormData>>({});

//   const dispatch = useDispatch<AppDispatch>();
//   const { loading, error } = useSelector((state: RootState) => state.auth);
//   const navigate = useNavigate();

//   const validateForm = () => {
//     const newErrors: Partial<FormData> = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!formData.firstName) newErrors.firstName = "First name is required";
//     if (!formData.lastName) newErrors.lastName = "Last name is required";
//     if (!formData.email) newErrors.email = "Email is required";
//     else if (!emailRegex.test(formData.email))
//       newErrors.email = "Invalid email format";
//     if (!formData.password) newErrors.password = "Password is required";
//     else if (formData.password.length < 6)
//       newErrors.password = "Password must be at least 6 characters";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   const handleSocialSignIn = (provider: string) => () => {
//     toast.error(`Social sign-in with ${provider} not implemented yet.`);
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     try {
//       await dispatch(register(formData)).unwrap();
//       navigate("/signin");
//     } catch (err) {}
//   };

//   return (
//     <div className="flex flex-col flex-1">
//       <Toaster position="top-center" reverseOrder={false} />
//       <div className="w-full max-w-md pt-10 mx-auto">
//         <Link to="/" className="inline-flex items-center text-sm text-gray-500">
//           <ChevronLeftIcon className="size-5" />
//           Back to home
//         </Link>
//       </div>
//       <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
//         <div className="space-y-6">
//           <div className="mb-5 sm:mb-8">
//             <h1 className="mb-2 font-semibold text-gray-800 text-2xl dark:text-white/90 sm:text-3xl">
//               Sign Up
//             </h1>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               Create an account with your email or social accounts!
//             </p>

//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               /
//               <span>
//                 Are you a Doctor?{" "}
//                 <Link
//                   to="/drsignup"
//                   className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
//                 >
//                   Sign Up as Doctor
//                 </Link>
//               </span>
//             </p>
//           </div>
//           {/* Social Login Buttons */}
//           <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//             {[
//               {
//                 name: "Google",
//                 icon: (
//                   <img
//                     src="/images/social-media/google.png"
//                     alt="Google"
//                     className="w-10 h-10"
//                   />
//                 ),
//                 onClick: handleSocialSignIn("Google"),
//               },
//               {
//                 name: "Facebook",
//                 icon: (
//                   <img
//                     src="/images/social-media/facebook.png"
//                     alt="Facebook"
//                     className="w-10 h-10"
//                   />
//                 ),
//                 onClick: handleSocialSignIn("Facebook"),
//               },
//             ].map(({ name, icon, onClick }) => (
//               <button
//                 key={name}
//                 onClick={onClick}
//                 className="flex items-center justify-center gap-2 py-2 text-sm font-normal text-gray-700 rounded-lg px-7 hover:bg-gray-200 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
//               >
//                 {icon} {name}
//               </button>
//             ))}
//           </div>
//           <div className="relative bottom-9 py-3 sm:py-5">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-200 dark:border-gray-800" />
//             </div>
//             <div className="relative flex justify-center">
//               <span className="px-4 text-sm text-gray-400 bg-gray-50 dark:bg-gray-900">
//                 Or
//               </span>
//             </div>
//           </div>
//           {/* Form Fields - Styled to Match SignIn */}
//           <form
//             onSubmit={handleSubmit}
//             className="space-y-4 relative bottom-15"
//           >
//             <div>
//               <Label>
//                 First Name <span className="text-red-500">*</span>
//               </Label>
//               <Input
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleInputChange}
//                 placeholder="Enter your first name"
//                 className="border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//               />
//               {errors.firstName && (
//                 <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
//               )}
//             </div>
//             <div>
//               <Label>
//                 Last Name <span className="text-red-500">*</span>
//               </Label>
//               <Input
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleInputChange}
//                 placeholder="Enter your last name"
//                 className="border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//               />
//               {errors.lastName && (
//                 <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
//               )}
//             </div>
//             <div>
//               <Label>
//                 Email <span className="text-red-500">*</span>
//               </Label>
//               <Input
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 placeholder="Enter your email"
//                 className="border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//               )}
//               {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//             </div>
//             <div>
//               <Label>
//                 Password <span className="text-red-500">*</span>
//               </Label>
//               <div className="relative">
//                 <Input
//                   name="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter your password"
//                   className="border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                 />
//                 <span
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
//                 >
//                   {showPassword ? (
//                     <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
//                   ) : (
//                     <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
//                   )}
//                 </span>
//               </div>
//               {errors.password && (
//                 <p className="text-red-500 text-sm mt-1">{errors.password}</p>
//               )}
//             </div>
//             <Button
//               type="submit"
//               className="w-full bg-blue-500 text-white rounded-md py-2 text-base hover:bg-blue-600 disabled:bg-blue-300"
//               disabled={loading}
//             >
//               {loading ? "Signing Up..." : "Sign Up"}
//             </Button>
//           </form>
//           <p className="relative bottom-15 text-sm text-center text-gray-700 dark:text-gray-400">
//             Already have an account?{" "}
//             <Link to="/signin" className="text-blue-500 hover:text-blue-600">
//               Sign In
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
