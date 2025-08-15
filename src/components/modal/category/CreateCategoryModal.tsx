import { Modal } from "antd";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { categorySchema } from "../../../schemas/category.schema";
import type { z } from "zod";
import CustomInput from "../../form/CustomInput";
import { SetCategoryCreateError } from "../../../redux/features/category/categorySlice";
import Error from "../../validation/Error";
import { useCreateCategoryMutation } from "../../../redux/features/category/categoryApi";
import CustomButton from "../../form/CustomButton";

type TFormValues = z.infer<typeof categorySchema>;

const CreateCategoryModal = () => {
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const { CategoryCreateError } = useAppSelector((state) => state.category);
  const [createCategory, { isLoading, isSuccess }] = useCreateCategoryMutation();
  const { handleSubmit, control, reset } = useForm<TFormValues>({
    resolver: zodResolver(categorySchema),
  });

  
  //if success
   useEffect(() => {
    if (!isLoading && isSuccess) {
      setModalOpen(false);
      reset();
    }
  }, [isLoading, isSuccess, reset]);


  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    dispatch(SetCategoryCreateError(""));
    createCategory(data);
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
          dispatch(SetCategoryCreateError(""));
        }}
        maskClosable={false}
        footer={false}
      >
        <div className="w-full mx-auto">
          <div className="bg-white rounded-xl overflow-hidden transition-all duration-300">
            <div className="p-2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Add Category
              </h2>
               {CategoryCreateError && <Error message={CategoryCreateError} />}
              <form onSubmit={handleSubmit(onSubmit)}>
                <CustomInput
                  label="Title"
                  name="name"
                  type="text"
                  control={control}
                  placeholder="Enter title"
                />
                <div className="flex justify-end mt-4">
                   <CustomButton isLoading={isLoading}>
                    Add
                  </CustomButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreateCategoryModal;
