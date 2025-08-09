import { Modal } from "antd";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { z } from "zod";
import CustomInput from "../../form/CustomInput";
import { CgSpinnerTwo } from "react-icons/cg";
import { Edit } from "lucide-react";
import { informationSchema } from "../../../schemas/information.schema";
import type { IInformation } from "../../../types/information.type";
import CustomTextArea from "../../form/CustomTextArea";


type TFormValues = z.infer<typeof informationSchema>;

type TProps = {
  information: IInformation
}

const UpdateInformationModal = ({ information }: TProps) => {
  const isLoading = false;
  const [modalOpen, setModalOpen] = useState(false);
  //const [ updateInformation, { isLoading, isSuccess }] = useUpdateInformationMutation();
  const { handleSubmit, control, setValue} = useForm<TFormValues>({
    resolver: zodResolver(informationSchema),
    defaultValues: information
  });



    //if success
  //  useEffect(() => {
  //   if (!isLoading && isSuccess) {
  //     setModalOpen(false);
  //   }
  // }, [isLoading, isSuccess]);


  const onSubmit: SubmitHandler<TFormValues> = () => {
    //updateInformation(data);
    setModalOpen(false)
  };

  return (
    <>
      <button onClick={() => setModalOpen(true)} className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
        <Edit size={18} />
      </button>

      <Modal
        open={modalOpen}
        onCancel={() => {
          setValue("email", information.email);
          setValue("phone", information.phone);
          setValue("address", information.address);
          setValue("instagram", information.instagram);
          setValue("telegram", information.telegram);
          setModalOpen(false)
        }}
        maskClosable={false}
        footer={false}
      >
        <div className="w-full mx-auto">
          <div className="bg-white rounded-xl overflow-hidden transition-all duration-300">
            <div className="p-2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Update Information
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <CustomInput label="Email" name="email" type="text" control={control} placeholder="Enter email address"/>
                <CustomInput label="Contact Number" name="phone" type="text" control={control} placeholder="Enter contact number"/>
                <CustomInput label="Address" name="address" type="text" control={control} placeholder="Enter Address"/>
                <CustomTextArea label="Instagram Link" name="instagram" control={control} placeholder="Enter instagram link"/>
                <CustomTextArea label="Telegram Link" name="telegram" control={control} placeholder="Enter teligram link"/>
                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`px-4 py-2 w-full rounded-lg text-white font-medium 
                  ${
                    isLoading
                      ? "bg-primary/80 cursor-not-allowed"
                      : "bg-primary hover:bg-primary/80"
                  } transition-colors duration-200 flex items-center justify-center gap-x-2 focus:outline-none focus:ring-blue-500`}
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
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UpdateInformationModal;
