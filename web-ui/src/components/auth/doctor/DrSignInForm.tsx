import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../../icons";
import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import Checkbox from "../../form/input/Checkbox";
// import Button from "../../ui/button/Button";
import { useAppDispatch, useAppSelector } from "../../../hooks/appDispatchHook";
import { signInDoctor } from "../../../redux/slices/doctor/loginDoctorSlice";

export default function DrSignInForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status, error, isLoggedIn } = useAppSelector(
    (state) => state.signInDoctor
  );

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/doctor-profile");
    }
  }, [isLoggedIn, navigate]);

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // Handle token changes
  // useEffect(() => {
  //   if (token) {
  //     // navigate("/doctor-profile");
  //     navigate("/drsignin");
  //   }
  // }, [token, navigate]);

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

  const validationForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      password: "",
    };

    // validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email";
      isValid = false;
    }

    // validate password
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validationForm()) {
      try {
        await dispatch(signInDoctor(formData)).unwrap();
        // Store token in localStorage if "Keep me logged in" is checked
        // if (isChecked && result.token) {
        // }
        // localStorage.setItem("jwt", result.token);

        // navigate("/doctor-profile");
        navigate("/doctor-profile");
      } catch (error) {
        console.error("Sign in failed:", error);
      }
    }
  };

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
        </div>

        {/* <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
          <div> */}
        <div className="mb-5 text-center">
          <h1 className="mb-1 text-2xl font-bold text-gray-800 dark:text-white/90">
            Doctor Sign In
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Welcome back to your account
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2 mb-4 sm:grid-cols-2 sm:gap-3">
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
              Or continue with email
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
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
              <p className="mt-1 text-xs text-error-500">{errors.email}</p>
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
              <p className="mt-1 text-xs text-error-500">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={isChecked}
                onChange={setIsChecked}
                className="w-4 h-4"
              />
              <span className="text-xs text-gray-700 dark:text-gray-300">
                Keep me logged in
              </span>
            </div>
            <Link
              to="/reset-password"
              className="text-xs text-brand-500 hover:text-brand-600 dark:text-brand-400"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className={`w-full py-2 text-sm font-medium text-white rounded-lg transition ${
              status === "loading"
                ? "bg-brand-400"
                : "bg-brand-500 hover:bg-brand-600"
            }`}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Signing In..." : "Sign In"}
          </button>

          {error && <p className="text-xs text-center text-red-500">{error}</p>}
        </form>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Don&apos;t have an account? {""}
            <Link
              to="/drsignup"
              className="font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
