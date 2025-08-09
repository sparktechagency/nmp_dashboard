import { Modal } from "antd";
import { useState } from "react";
import { useAppSelector } from "../../../redux/hooks/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { categorySchema } from "../../../schemas/category.schema";
import type { z } from "zod";
import CustomInput from "../../form/CustomInput";
import { CgSpinnerTwo } from "react-icons/cg";
import Error from "../../validation/Error";
import { Edit } from "lucide-react";
import type { ICategory } from "../../../types/category.type";


type TFormValues = z.infer<typeof categorySchema>;

type TProps = {
  category: ICategory
}

const EditBrandModal = ({ category }: TProps) => {
  const isLoading = false;
 // const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const { CategoryUpdateError } = useAppSelector((state) => state.category);
//  const [ updateCategory, { isLoading, isSuccess }] = useUpdateCategoryMutation();
  const { handleSubmit, control, setValue} = useForm<TFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name
    }
  });



    //if success
  //  useEffect(() => {
  //   if (!isLoading && isSuccess) {
  //     setModalOpen(false);
  //   }
  // }, [isLoading, isSuccess]);


  const onSubmit: SubmitHandler<TFormValues> = () => {
    setModalOpen(false);
    // dispatch(SetCategoryUpdateError(""));
    // updateCategory({
    //   id: category?._id,
    //   data
    // });
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
          setModalOpen(false)
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
               {CategoryUpdateError && <Error message={CategoryUpdateError} />}
              <form onSubmit={handleSubmit(onSubmit)}>
                <CustomInput
                  label="Title"
                  name="name"
                  type="text"
                  control={control}
                  placeholder="Enter title"
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
                      "Save Change"
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

export default EditBrandModal;
