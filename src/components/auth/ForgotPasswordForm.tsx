
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { forgotPasswordSendOtpSchema } from "../../schemas/auth.schema";
import type { z } from "zod";
import Error from "../validation/Error";
import CustomInput from "../form/CustomInput";
import { CgSpinnerTwo } from "react-icons/cg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordSendOtpMutation } from "../../redux/features/auth/authApi";
import { SetForgotError } from "../../redux/features/auth/authSlice";

type TFormValues = z.infer<typeof forgotPasswordSendOtpSchema>;

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { ForgotError } = useAppSelector((state) => state.auth);
  const [forgotPasswordSendOtp, { isLoading, isSuccess }] =
    useForgotPasswordSendOtpMutation();
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(forgotPasswordSendOtpSchema),
  });


   useEffect(()=>{
      if(isSuccess){
        navigate("/auth/verify-otp");
      }
    }, [isSuccess, navigate])

  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    dispatch(SetForgotError(""));
    forgotPasswordSendOtp(data);
  };

  return (
    <>
   {ForgotError && <Error message={ForgotError} />}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <CustomInput
          label="Email"
          name="email"
          type="text"
          control={control}
          placeholder="Enter email address"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center cursor-pointer justify-center gap-2 bg-primary text-white py-2 rounded-md hover:bg-dis transition disabled:bg-gray-800 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <CgSpinnerTwo className="animate-spin" fontSize={16} />
              Processing...
            </>
          ) : (
            "Continue"
          )}
        </button>
      </form>
    </>
  );
};

export default ForgotPasswordForm;
