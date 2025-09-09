import { Modal } from "antd";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { z } from "zod";
import CustomInput from "../../form/CustomInput";
import Error from "../../validation/Error";
import { useCreateBrandMutation } from "../../../redux/features/brand/brandApi";
import { brandSchema } from "../../../schemas/brand.schema";
import { SetBrandCreateError } from "../../../redux/features/brand/brandSlice";
import FormButton from "../../form/FormButton";
import CustomSelect from "../../form/CustomSelect";

type TFormValues = z.infer<typeof brandSchema>;

const CreateBrandModal = () => {
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const { BrandCreateError } = useAppSelector((state) => state.brand);
  const { typeOptions } = useAppSelector((state) => state.type);
  const [createBrand, { isLoading, isSuccess }] = useCreateBrandMutation();
  const { handleSubmit, control, setValue } = useForm<TFormValues>({
    resolver: zodResolver(brandSchema),
  });

  
  //if success
   useEffect(() => {
    if (!isLoading && isSuccess) {
      setValue("name", "");
      setModalOpen(false);
    }
  }, [isLoading, isSuccess, setValue]);


  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    dispatch(SetBrandCreateError(""));
    createBrand(data);
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
          dispatch(SetBrandCreateError(""));
        }}
        maskClosable={false}
        footer={false}
      >
        <div className="w-full mx-auto">
          <div className="bg-white rounded-xl overflow-hidden transition-all duration-300">
            <div className="p-2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Add Brand
              </h2>
               {BrandCreateError && <Error message={BrandCreateError} />}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <CustomSelect
                  label="Type"
                  name="typeId"
                  control={control}
                  disabled={typeOptions.length === 0}
                  options={typeOptions}
                />
                <CustomInput
                  label="Title"
                  name="name"
                  type="text"
                  control={control}
                  placeholder="Enter title"
                />
                <div className="mt-4">
                  <FormButton isLoading={isLoading}>
                    Add
                  </FormButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreateBrandModal;
