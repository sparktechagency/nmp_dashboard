import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { z } from "zod";
import CustomInput from "../../form/CustomInput";
import { CgSpinnerTwo } from "react-icons/cg";
import Error from "../../validation/Error";
import { useCreateAdminMutation } from "../../../redux/features/admin/adminApi";
import { adminSchema } from "../../../schemas/admin.schema";
import { SetAdminCreateError } from "../../../redux/features/admin/adminSlice";

type TFormValues = z.infer<typeof adminSchema>;

const CreateAdminModal = () => {
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const { CreateError } = useAppSelector((state) => state.admin);
  const [createAdmin, { isLoading, isSuccess }] =
    useCreateAdminMutation();
  const { handleSubmit, control, reset } =
    useForm<TFormValues>({
      resolver: zodResolver(adminSchema),
    });




  //if success
  useEffect(() => {
    if (!isLoading && isSuccess) {
      reset()
      setModalOpen(false);
    }
  }, [isLoading, isSuccess, reset]);

  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    dispatch(SetAdminCreateError(""));
    createAdmin(data)
  };

  return (
    <>

      <button
        onClick={() => setModalOpen(true)}
        className="bg-primary px-3 py-1.5 text-white cursor-pointer rounded-md hover:bg-[#2b4773] duration-200"
      >
        {" "}
        Add New
      </button>
      <Modal
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          reset();
        }}
        maskClosable={false}
        footer={false}
      >
        <div className="w-full mx-auto">
          <div className="bg-white rounded-xl overflow-hidden transition-all duration-300">
            <div className="p-2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Add Admin
              </h2>
              {CreateError && <Error message={CreateError} />}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <CustomInput
                  label="Name"
                  name="fullName"
                  type="text"
                  control={control}
                  placeholder="Enter full name"
                />
                <CustomInput
                  label="Email"
                  name="email"
                  type="text"
                  control={control}
                  placeholder="Enter email address"
                />
                <CustomInput
                  label="Phone Number"
                  name="phone"
                  type="text"
                  control={control}
                  placeholder="Enter phone number"
                />
                <CustomInput
                  label="Password (Optional)"
                  name="password"
                  type="password"
                  control={control}
                  placeholder="Enter password"
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
                      "Create Admin"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreateAdminModal;
