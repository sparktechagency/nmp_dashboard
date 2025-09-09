import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { categorySchema } from "../../../schemas/category.schema";
import type { z } from "zod";
import CustomInput from "../../form/CustomInput";
import Error from "../../validation/Error";
import { Edit } from "lucide-react";
import type { ICategory } from "../../../types/category.type";
import { useUpdateCategoryMutation } from "../../../redux/features/category/categoryApi";
import { SetCategoryUpdateError } from "../../../redux/features/category/categorySlice";
import FormButton from "../../form/FormButton";
import CustomSelect from "../../form/CustomSelect";


type TFormValues = z.infer<typeof categorySchema>;

type TProps = {
  category: ICategory
}

const EditCategoryModal = ({ category }: TProps) => {
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const { CategoryUpdateError } = useAppSelector((state) => state.category);
  const { typeOptions } = useAppSelector((state) => state.type);
  const [ updateCategory, { isLoading, isSuccess }] = useUpdateCategoryMutation();
  const { handleSubmit, control, setValue} = useForm<TFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name,
      typeId: category?.typeId
    }
  });


  //if success
  useEffect(() => {
    if (!isLoading && isSuccess) {
      setModalOpen(false);
    }
  }, [isLoading, isSuccess]);


  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    dispatch(SetCategoryUpdateError(""));
    updateCategory({
      id: category?._id,
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
          setValue("name", category?.name);
          setValue("typeId", category?.typeId);
          setModalOpen(false)
        }}
        maskClosable={false}
        footer={false}
      >
        <div className="w-full mx-auto">
          <div className="bg-white rounded-xl overflow-hidden transition-all duration-300">
            <div className="p-2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Update Category
              </h2>
               {CategoryUpdateError && <Error message={CategoryUpdateError} />}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <CustomSelect
                  label="Type"
                  name="typeId"
                  control={control}
                  disabled={typeOptions.length === 0}
                  options={typeOptions}
                  blankOption={false}
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

export default EditCategoryModal;
