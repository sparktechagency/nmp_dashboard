"use client";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import CustomInput from "../form/CustomInput";
import { updateAdminSchema } from "../../schemas/admin.schema";
import type { TProfile } from "../../types/user.type";
import { useUpdateProfileMutation } from "../../redux/features/user/userApi";
import FormButton from "../form/FormButton";

type TFormValues = z.infer<typeof updateAdminSchema>;

type TProps = {
  user: TProfile | null;
}

const ProfileForm = ({ user}: TProps) => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(updateAdminSchema),
    defaultValues: {
      fullName: user?.fullName || "",
      phone: user?.phone || ""
    }
  });


  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    //changePassword(data);
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("phone", data.phone);
    updateProfile(formData)
  };


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <CustomInput
          label="Name"
          name="fullName"
          type="text"
          control={control}
          placeholder="Enter full name"
        />
        <div>
          <label
            htmlFor="Email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            value={user?.email}
            disabled
            placeholder="Enter Email Address"
            className="w-full mt-1 border disabled:bg-gray-200 focus:outline-none rounded-md px-4 py-2 pr-10 
                        border-gray-300 focus:border-blue-500
                    "
          />
        </div>

        <CustomInput
          label="Phone Number"
          name="phone"
          type="text"
          control={control}
          placeholder="e.g., +44 20 1234 5678 or 020 1234 5678"
        />
        <div className="flex justify-end">
          <FormButton isLoading={isLoading}>
            Save Changes
          </FormButton>
        </div>
      </form>
    </>
  );
};

export default ProfileForm;
