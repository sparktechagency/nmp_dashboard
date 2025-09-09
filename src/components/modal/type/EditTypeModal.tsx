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
import FormButton from "../../form/FormButton";
import { useUpdateTypeMutation } from "../../../redux/features/type/typeApi";
import type { IType } from "../../../types/type.type";
import { SetTypeUpdateError } from "../../../redux/features/type/typeSlice";


type TFormValues = z.infer<typeof categorySchema>;

type TProps = {
  type: IType
}

const EditTypeModal = ({ type }: TProps) => {
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const { TypeUpdateError } = useAppSelector((state) => state.type);
  const [ updateType, { isLoading, isSuccess }] = useUpdateTypeMutation();
  const { handleSubmit, control, setValue} = useForm<TFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: type?.name
    }
  });


    //if success
   useEffect(() => {
    if (!isLoading && isSuccess) {
      setModalOpen(false);
    }
  }, [isLoading, isSuccess]);


  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    dispatch(SetTypeUpdateError(""));
    updateType({
      id: type?._id,
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
          setValue("name", type?.name);
          setModalOpen(false)
        }}
        maskClosable={false}
        footer={false}
      >
        <div className="w-full mx-auto">
          <div className="bg-white rounded-xl overflow-hidden transition-all duration-300">
            <div className="p-2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Update Type
              </h2>
               {TypeUpdateError && <Error message={TypeUpdateError} />}
              <form onSubmit={handleSubmit(onSubmit)}>
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

export default EditTypeModal;
