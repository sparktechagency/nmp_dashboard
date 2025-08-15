import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { z } from "zod";
import CustomInput from "../../form/CustomInput";
import Error from "../../validation/Error";
import { Edit } from "lucide-react";
import type { IFlavor } from "../../../types/flavor.type";
import { useUpdateFlavorMutation } from "../../../redux/features/flavor/flavorApi";
import { SetFlavorUpdateError } from "../../../redux/features/flavor/flavorSlice";
import CustomButton from "../../form/CustomButton";
import { flavorSchema } from "../../../schemas/flavor.schema";


type TFormValues = z.infer<typeof flavorSchema>;

type TProps = {
  flavor: IFlavor
}

const EditFlavorModal = ({ flavor }: TProps) => {
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const { FlavorUpdateError } = useAppSelector((state) => state.flavor);
  const [updateCategory, { isLoading, isSuccess }] = useUpdateFlavorMutation();
  const { handleSubmit, control, setValue } = useForm<TFormValues>({
    resolver: zodResolver(flavorSchema),
    defaultValues: {
      name: flavor?.name
    }
  });



    //if success
   useEffect(() => {
    if (!isLoading && isSuccess) {
      setModalOpen(false);
    }
  }, [isLoading, isSuccess]);


  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    dispatch(SetFlavorUpdateError(""));
    updateCategory({
      id: flavor?._id,
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
          setValue("name", flavor?.name);
          setModalOpen(false)
          dispatch(SetFlavorUpdateError(""));
        }}
        maskClosable={false}
        footer={false}
      >
        <div className="w-full mx-auto">
          <div className="bg-white rounded-xl overflow-hidden transition-all duration-300">
            <div className="p-2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Update Flavor
              </h2>
              {FlavorUpdateError && <Error message={FlavorUpdateError} />}
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
                    Save Change
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

export default EditFlavorModal;
