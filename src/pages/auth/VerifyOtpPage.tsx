import { useNavigate } from "react-router-dom";
import VerifyotpForm from "../../components/auth/VerifyotpForm";

const VerifyOtpPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full max-w-md bg-white py-6 px-4 md:px-6 shadow-md rounded-md">
        <h2 className="text-3xl font-bold mb-2 text-title text-center">
          Verify OTP
        </h2>
        {/* <p className="text-gray-600 mb-6">Enter your email address and we will send you a
          verification code</p> */}
        <p className="text-gray-600 mb-6 text-center">
          {" "}
          Enter the 6-digit code sent to your email.
        </p>
        <VerifyotpForm />
        <div className="pt-4 mt-3 border-t border-gray-200">
          <button
            onClick={()=> navigate("/auth/signin")}
            className="w-full text-gray-600 hover:text-gray-800 font-medium text-sm transition-colors flex items-center justify-center space-x-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Back to Login</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default VerifyOtpPage;
