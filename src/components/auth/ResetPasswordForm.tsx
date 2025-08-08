"use client";

import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { useForgotPasswordResetMutation } from "../../redux/features/auth/authApi";
import { useForm, type SubmitHandler } from "react-hook-form";
import { resetPasswordSchema } from "../../schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SetResetPasswordError } from "../../redux/features/auth/authSlice";
import type { z } from "zod";
import Error from "../validation/Error";
import CustomInput from "../form/CustomInput";
import PasswordStrength from "../validation/PasswordStrength";
import { CgSpinnerTwo } from "react-icons/cg";
import { getEmail, getOtp } from "../../helper/SessionHelper";

type TFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPasswordForm = () => {
  const dispatch = useAppDispatch();
  const { ResetPasswordError } = useAppSelector((state) => state.auth);
  const [forgotPasswordReset, { isLoading }] = useForgotPasswordResetMutation();
  const { handleSubmit, control, watch, trigger } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const newPassword = watch("newPassword");

  useEffect(() => {
    if (newPassword) {
      const confirmPassword = watch("confirmPassword");
      if (confirmPassword === newPassword) {
        trigger("confirmPassword");
      }
    }
  }, [newPassword, watch, trigger]);

  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    dispatch(SetResetPasswordError(""));
    forgotPasswordReset({
      email: getEmail(),
      otp: getOtp(),
      password: data.newPassword
    });
  };


  return (
    <>
      {ResetPasswordError && <Error message={ResetPasswordError} />}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <CustomInput
          label="New Password"
          name="newPassword"
          type="password"
          control={control}
          placeholder="Enter new password"
        />
        {newPassword && <PasswordStrength password={newPassword} />}
        <CustomInput
          label="Confirm New Password"
          name="confirmPassword"
          type="password"
          control={control}
          placeholder="Enter new password"
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
            "Reset Password"
          )}
        </button>
      </form>
    </>
  );
};

export default ResetPasswordForm;
