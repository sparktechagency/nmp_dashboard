/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { z } from "zod";
import { Edit } from "lucide-react";
import { countDownDateSchema } from "../../../schemas/information.schema";
import type { IInformation } from "../../../types/information.type";
import { useUpdateCountDownTimeMutation } from "../../../redux/features/information/informationApi";
import FormButton from "../../form/FormButton";
import CustomDateTimePicker from "../../form/CustomDateTimePicker";


type TFormValues = z.infer<typeof countDownDateSchema>;

type TProps = {
  information: IInformation
}

const UpdateCountDownModal = ({ information }: TProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [ updateCountDown, { isLoading, isSuccess }] = useUpdateCountDownTimeMutation();
  const { handleSubmit, control, setValue} = useForm<TFormValues>({
    resolver: zodResolver(countDownDateSchema),
    defaultValues: {
        countDownDate: information.countDownDate
    }
  });

  


  //if success
  useEffect(() => {
    if (!isLoading && isSuccess) {
      setModalOpen(false);
    }
  }, [isLoading, isSuccess]);


  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    updateCountDown({
       date: data.countDownDate.split("T")[0],
        time: data.countDownDate.split("T")[1]
    });
  };


  return (
    <>
      <button onClick={() => setModalOpen(true)} className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
        <Edit size={18} />
      </button>

      <Modal
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false)
          setValue("countDownDate", information.countDownDate)
        }}
        maskClosable={false}
        footer={false}
      >
        <div className="w-full mx-auto">
          <div className="bg-white rounded-xl overflow-hidden transition-all duration-300">
            <div className="p-2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Update Count Down Time
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <CustomDateTimePicker label="Date & Time" name="countDownDate" control={control}/>
                <div className="mt-4">
                  <FormButton isLoading={isLoading}> Save Change</FormButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UpdateCountDownModal;
