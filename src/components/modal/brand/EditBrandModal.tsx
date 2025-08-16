import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { z } from "zod";
import CustomInput from "../../form/CustomInput";
import Error from "../../validation/Error";
import { Edit } from "lucide-react";
import { brandSchema } from "../../../schemas/brand.schema";
import { useUpdateBrandMutation } from "../../../redux/features/brand/brandApi";
import { SetBrandUpdateError } from "../../../redux/features/brand/brandSlice";
import type { IBrand } from "../../../types/brand.type";
import FormButton from "../../form/FormButton";


type TFormValues = z.infer<typeof brandSchema>;

type TProps = {
  brand: IBrand
}

const EditBrandModal = ({ brand }: TProps) => {
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const { BrandUpdateError } = useAppSelector((state) => state.brand);
  const [updateBrand, { isLoading, isSuccess }] = useUpdateBrandMutation();
  const { handleSubmit, control, setValue } = useForm<TFormValues>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: brand?.name
    }
  });



  //if success
   useEffect(() => {
    if (!isLoading && isSuccess) {
      setModalOpen(false);
    }
  }, [isLoading, isSuccess]);


  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    dispatch(SetBrandUpdateError(""));
    updateBrand({
      id: brand?._id,
      data
    });
  };

  return (
    <>
       <button
        onClick={() => setModalOpen(true)}
        className="bg-green-600 hover:bg-green-700 p-2 text-white rounded-full"
      >
        <Edit size={18} />
      </button>

      <Modal
        open={modalOpen}
        onCancel={() => {
          setValue("name", brand?.name);
          setModalOpen(false);
          dispatch(SetBrandUpdateError(""));
        }}
        maskClosable={false}
        footer={false}
      >
        <div className="w-full mx-auto">
          <div className="bg-white rounded-xl overflow-hidden transition-all duration-300">
            <div className="p-2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Update Brand
              </h2>
               {BrandUpdateError && <Error message={BrandUpdateError} />}
              <form onSubmit={handleSubmit(onSubmit)}>
                <CustomInput
                  label="Title"
                  name="name"
                  type="text"
                  control={control}
                  placeholder="Enter title"
                />
                <div className="flex justify-end mt-4">
                  <FormButton isLoading={isLoading}>
                    Save Change
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

export default EditBrandModal;
