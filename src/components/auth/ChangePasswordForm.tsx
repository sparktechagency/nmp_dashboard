"use client";

import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { useForm, type SubmitHandler } from "react-hook-form";
import { changePasswordSchema } from "../../schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import type { z } from "zod";
import Error from "../validation/Error";
import CustomInput from "../form/CustomInput";
import PasswordStrength from "../validation/PasswordStrength";
import { useChangePasswordMutation } from "../../redux/features/auth/authApi";
import { SetChangePasswordError } from "../../redux/features/auth/authSlice";
import CustomButton from "../form/CustomButton";

type TFormValues = z.infer<typeof changePasswordSchema>;

const ChangePasswordForm = () => {
  const dispatch = useAppDispatch();
  const { ChangePasswordError } = useAppSelector((state) => state.auth);
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const { handleSubmit, control, watch, trigger } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  const newPassword = watch("newPassword");
  const currentPassword = watch("currentPassword");

  useEffect(() => {
    const confirmPassword = watch("confirmPassword");
    if (newPassword?.length >=6 && confirmPassword?.length >=6) {
      trigger("confirmPassword");
    }
    if (currentPassword?.length >= 6 && newPassword?.length >= 6) {
      trigger("newPassword");
    }
  }, [newPassword, currentPassword, trigger, watch]);


 
  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    dispatch(SetChangePasswordError(""));
    changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword
    });
  };


  return (
    <>
      {ChangePasswordError && <Error message={ChangePasswordError} />}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <CustomInput
          label="Current Password"
          name="currentPassword"
          type="password"
          control={control}
          placeholder="Enter Current password"
        />
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

        {/* <button
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
            "Save Changes"
          )}
        </button> */}
        <CustomButton isLoading={isLoading}>Save Changes</CustomButton>

      </form>
    </>
  );
};

export default ChangePasswordForm;
