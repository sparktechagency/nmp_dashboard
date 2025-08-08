"use client";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import CustomInput from "../form/CustomInput";
import { CgSpinnerTwo } from "react-icons/cg";
import { updateAdminSchema } from "../../schemas/admin.schema";
import type { IUser } from "../../types/user.type";
import { useUpdateProfileMutation } from "../../redux/features/user/userApi";

type TFormValues = z.infer<typeof updateAdminSchema>;

type TProps = {
  admin: IUser | null;
}

const ProfileForm = ({ admin }: TProps) => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(updateAdminSchema),
    defaultValues: {
      fullName: admin?.fullName || "",
      phone: admin?.phone || "" 
    }
  });


  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    updateProfile(data)
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
            value={admin?.email}
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
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 w-full bg-primary hover:bg-[#2b4773] disabled:bg-[#2b4773 disabled:cursor-not-allowed rounded-lg text-white font-medium 
 transition-colors duration-200 flex items-center justify-center gap-x-2 focus:outline-none`}
          >
            {isLoading ? (
              <>
                <CgSpinnerTwo className="animate-spin" fontSize={16} />
                Processing...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default ProfileForm;
