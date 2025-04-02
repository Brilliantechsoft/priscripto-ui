import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "../../icons";
import AuthLayout from "../../pages/AuthPages/AuthPageLayout"; // Import the AuthLayout

export default function CheckYourEmail() {
  return (
    <AuthLayout>
      <div className="flex flex-col flex-1 justify-center p-6 sm:p-10">
        <div className="w-full max-w-md mx-auto">
          <Link
            to="/forgot-password"
            className="inline-flex items-center text-sm text-gray-500 mb-6"
          >
            <ChevronLeftIcon className="size-5 mr-1" />
            Back to Forgot Password
          </Link>
          <div className="space-y-6">
            <div className="mb-5 sm:mb-8">
              <h1 className="mb-2 font-semibold text-gray-800 text-2xl sm:text-3xl dark:text-white">
                Check Your Email
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                We’ve sent a password reset link to your email. Please check
                your inbox (and spam/junk folder) to proceed.
              </p>
            </div>
            <p className="text-sm text-center text-gray-700 dark:text-gray-400">
              Didn’t receive the email?{" "}
              <Link
                to="/forgot-password"
                className="text-blue-500 hover:text-blue-600"
              >
                Resend Link
              </Link>
            </p>
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
