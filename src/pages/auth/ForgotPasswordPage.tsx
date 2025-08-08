import { Link } from "react-router-dom";
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";
import { ArrowLeft } from "lucide-react";

const ForgotPasswordPage = () => {
  return (
    <>
      <div className="w-full max-w-md bg-white py-6 lg:py-24 px-4 md:px-6 shadow-md rounded-md">
        <div className="flex items-center mb-3">
          <Link
            to="/auth/signin"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to login
          </Link>
        </div>
        <h2 className="text-3xl font-bold mb-2 text-title">Forgot Password?</h2>
        <p className="text-gray-600 text-sm sm:text-md mb-6">
          Enter your email address and we will send you a verification code
        </p>
        <ForgotPasswordForm />
      </div>
    </>
  );
};

export default ForgotPasswordPage;
