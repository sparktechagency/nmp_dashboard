"use client"
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { useForgotPasswordResendOtpMutation, useForgotPasswordVerifyOtpMutation } from "../../redux/features/auth/authApi";
import Error from "../validation/Error";
import { SetVerifyOtpError } from "../../redux/features/auth/authSlice";
import { getEmail } from "../../helper/SessionHelper";
import { useNavigate } from "react-router-dom";
import { CgSpinnerTwo } from "react-icons/cg";

const VerifyotpForm = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState<string[]>(new Array(6).fill(""));
  const [seconds, setSeconds] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const isDisabled = code.find((cv) => cv == "") == ""; //check if any code is empty string
  
  const dispatch = useAppDispatch();
  const { VerifyOtpError } = useAppSelector((state) => state.auth);
  const [forgotPasswordVerifyOtp, { isLoading, isSuccess: verifySuccess }] =
    useForgotPasswordVerifyOtpMutation();
  const [
    forgotPasswordResendOtp,
    { isLoading: resendLoading, isSuccess: resendSuccess },
  ] = useForgotPasswordResendOtpMutation();


  //if verify success
  useEffect(() => {
    if (verifySuccess) {
      navigate("/auth/reset-password");
    }
  }, [verifySuccess, navigate]);
 


  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value.replace(/[^0-9]/g, "");
    const newCode = [...code];

    if (value) {
      newCode[index] = value;
      setCode(newCode);

      if (index < 6 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };



  // Timer countdown
  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [seconds]);


  //if code is resent successfully
  useEffect(() => {
    if (!resendLoading && resendSuccess) {
      setSeconds(60);
      setCanResend(false);
      // Restart countdown
      const timer = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [resendLoading, resendSuccess]);


  const handleResend = () => {
    if (!canResend) return;
    forgotPasswordResendOtp({
      email: getEmail()
    })
  };



  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      const newCode = [...code];
      if (code[index]) {
        // Clear current value
        newCode[index] = "";
        setCode(newCode);
      } else if (index > 0) {
        // Move to previous input
        inputRefs.current[index - 1]?.focus();
        const updatedCode = [...code];
        updatedCode[index - 1] = "";
        setCode(updatedCode);
      }
    }
  };



   const handleVerify = () => {
    const otp = code.join("");
    dispatch(SetVerifyOtpError(""))
    forgotPasswordVerifyOtp({
      email: getEmail(),
      otp
    });
  };


  return (
    <>
    {VerifyOtpError && <Error message={VerifyOtpError} />}
      <div className="space-y-4 mt-1">
        {/* Code Inputs */}
        <div className="flex justify-center gap-3 mb-6">
          {code.map((digit, idx) => (
            <input
              key={idx}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              ref={(el) => {
                inputRefs.current[idx] = el;
              }}
              className="w-10 h-10 sm:w-12 sm:h-12 border border-gray-300 rounded-md text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          disabled={isDisabled || isLoading}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-[#2b4773] cursor-pointer text-white py-2 rounded-md font-semibold transition-colors duration-100 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <CgSpinnerTwo className="animate-spin" fontSize={16} />
              Verifying...
            </>
          ) : (
            "Verify"
          )}
        </button>
        {/* Resend & Timer */}
        <div className="text-center text-sm mb-6">
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-blue-600 font-medium hover:underline"
            >
              {
                resendLoading ? "Sending..." : "Resend"
              }
            </button>
          ) : (
            <span className="text-gray-500">
              Resend code in
              {/* <span className="font-semibold">{seconds}s</span> */}
              <span className="font-semibold pl-2">
                {String(Math.floor(seconds / 60)).padStart(2, "0")}:
                {String(seconds % 60).padStart(2, "0")}
              </span>
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default VerifyotpForm;
