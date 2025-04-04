import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "react-hot-toast";
import { forgotPassword } from "../../../redux/slices/auth/authSlice";
import { RootState, AppDispatch } from "../../../redux/store";
// import Button from "../../components/ui/button/Button";
// import Input from "../../components/form/input/InputField";
// import Label from "../../components/form/Label";
// import { ChevronLeftIcon } from "../../icons";
import AuthLayout from "../../../pages/AuthPages/AuthPageLayout";
import Button from "../../ui/button/Button";
import Input from "../../form/input/InputField";
import Label from "../../form/Label";
import { ChevronLeftIcon } from "../../../icons";

interface FormData {
  email: string;
}

export default function ForgotPasswordForm() {
  const [formData, setFormData] = useState<FormData>({ email: "" });
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await dispatch(forgotPassword(formData.email)).unwrap();
      toast.success("Password reset link sent! Check your email.");
      navigate("/check-your-email");
    } catch (err) {
      // Error handled in thunk
    }
  };

  return (
    <AuthLayout>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col flex-1 justify-center p-6 sm:p-10">
        <div className="w-full max-w-md mx-auto">
          <Link
            to="/signin"
            className="inline-flex items-center text-sm text-gray-500 mb-6"
          >
            <ChevronLeftIcon className="size-5 mr-1" />
            Back to Sign In
          </Link>
          <div className="space-y-6">
            <div className="mb-5 sm:mb-8">
              <h1 className="mb-2 font-semibold text-gray-800 text-2xl sm:text-3xl dark:text-white">
                Forgot Password
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enter your email to receive a password reset link.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label>
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-500 text-white rounded-md py-2 text-base hover:bg-blue-600 disabled:bg-blue-300"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
            <p className="text-sm text-center text-gray-700 dark:text-gray-400">
              Remembered your password?{" "}
              <Link to="/signin" className="text-blue-500 hover:text-blue-600">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
