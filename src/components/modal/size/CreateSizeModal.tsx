import { Modal } from "antd";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { z } from "zod";
import CustomInput from "../../form/CustomInput";
import { CgSpinnerTwo } from "react-icons/cg";
import Error from "../../validation/Error";
import { sizeSchema } from "../../../schemas/size.schema";
import { SetSizeCreateError } from "../../../redux/features/size/sizeSlice";
import { useCreateSizeMutation } from "../../../redux/features/size/sizeApi";

type TFormValues = z.infer<typeof sizeSchema>;

const CreateSizeModal = () => {
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const { SizeCreateError } = useAppSelector((state) => state.size);
  const [createSize, { isLoading, isSuccess, reset }] = useCreateSizeMutation();
  const { handleSubmit, control, setValue } = useForm<TFormValues>({
    resolver: zodResolver(sizeSchema),
  });

  
  //if success
   useEffect(() => {
    if (!isLoading && isSuccess) {
      setValue("size", "");
      setModalOpen(false);
    }
  }, [isLoading, isSuccess, reset, setValue]);


  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    dispatch(SetSizeCreateError(""));
    createSize(data);
  };

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="flex items-center gap-2 bg-primary px-3 py-1.5 text-white cursor-pointer rounded-md hover:bg-[#2b4773] duration-200"
      >
        <FaPlus />
        Add New
      </button>
      <Modal
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          setValue("size", "");
          dispatch(SetSizeCreateError(""));
        }}
        maskClosable={false}
        footer={false}
      >
        <div className="w-full mx-auto">
          <div className="bg-white rounded-xl overflow-hidden transition-all duration-300">
            <div className="p-2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Add Size
              </h2>
               {SizeCreateError && <Error message={SizeCreateError} />}
              <form onSubmit={handleSubmit(onSubmit)}>
                <CustomInput
                  label="Size"
                  name="size"
                  type="text"
                  control={control}
                  placeholder="Enter size"
                />
                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`px-4 py-2 w-full rounded-lg text-white font-medium 
                  ${
                    isLoading
                      ? "bg-disabled cursor-not-allowed"
                      : "bg-primary hover:bg-disabled"
                  } transition-colors duration-200 flex items-center justify-center gap-x-2 focus:outline-none focus:ring-blue-500`}
                  >
                    {isLoading ? (
                      <>
                         <CgSpinnerTwo className="animate-spin" fontSize={16} />
                        Processing...
                      </>
                    ) : (
                      "Add"
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

export default CreateSizeModal;
