import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "react-hot-toast";
import { login } from "../../../redux/slices/auth/authSlice";
import { RootState, AppDispatch } from "../../../redux/store";
//import Button from "../../components/ui/button/Button";
//import Checkbox from "../../components/form/input/Checkbox";
//import Input from "../../components/form/input/InputField";
//import Label from "../../components/form/Label";
//import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../../form/Label";
import Checkbox from "../../form/input/Checkbox";
import Button from "../../ui/button/Button";
import Input from "../../form/input/InputField";
import { EyeCloseIcon, EyeIcon } from "../../../icons";

interface FormData {
  email: string;
  password: string;
}

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSocialSignIn = (provider: string) => () => {
    toast.error(`Social sign-in with ${provider} not implemented yet.`);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!isChecked) {
      toast.error("Please check 'Keep me logged in' to proceed.");
      return;
    }

    try {
      const success = await dispatch(login(formData)).unwrap();
      if (success) navigate("/");
    } catch (err) {
      // Error handled in thunk
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-md pt-10 mx-auto">
        <Link to="/" className="inline-flex items-center text-sm text-gray-500">
          <svg
            className="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to dashboard
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="space-y-6">
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-2xl dark:text-white/90 sm:text-3xl">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Sign in with your email or social accounts!
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              <span>
                Are you a Doctor?{" "}
                <Link
                  // onClick={() => setIsDoctor(true)}
                  to="/drsignin"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign In as Doctor
                </Link>
              </span>
            </p>
          </div>
          {/* Social Login Buttons */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              {
                name: "Google",
                icon: (
                  <img
                    src="/images/social-media/google.png"
                    alt="Google"
                    className="w-9 h-9"
                  />
                ),
                onClick: handleSocialSignIn("Google"),
              },
              {
                name: "Facebook",
                icon: (
                  <img
                    src="/images/social-media/facebook.png"
                    alt="Facebook"
                    className="w-10 h-10"
                  />
                ),
                onClick: handleSocialSignIn("Facebook"),
              },
            ].map(({ name, icon, onClick }) => (
              <button
                key={name}
                onClick={onClick}
                className="flex items-center justify-center gap-2 py-2 text-sm font-normal text-gray-700 rounded-lg px-7 hover:bg-gray-200 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
              >
                {icon} {name}
              </button>
            ))}
          </div>
          <div className="relative bottom-8 py-3 sm:py-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-800" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 text-sm text-gray-400 bg-gray-50 dark:bg-gray-900">
                Or
              </span>
            </div>
          </div>
          {/* Email/Password Form - Redesigned to Match Image */}
          <form
            onSubmit={handleSubmit}
            className="relative space-y-5 bottom-15"
          >
            <div>
              <Label>
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            <div>
              <Label>
                Password <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                >
                  {showPassword ? (
                    <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                  ) : (
                    <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                  )}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox checked={isChecked} onChange={setIsChecked} />
                <span className="text-gray-700 text-sm dark:text-gray-400">
                  Keep me logged in
                </span>
              </div>
              <Link
                to="/reset-password"
                className="text-sm text-blue-500 hover:text-blue-600"
              >
                Forgot password?
              </Link>
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-500 text-white rounded-md py-2 text-base hover:bg-blue-600 disabled:bg-blue-300"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
          <p className="relative bottom-15 text-sm text-center text-gray-700 dark:text-gray-400">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:text-blue-600">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
