/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { z } from "zod";
import CustomInput from "../../form/CustomInput";
import { Edit } from "lucide-react";
import FormButton from "../../form/FormButton";
import { updateTipsSchema } from "../../../schemas/order.schema";
import type { IOrder } from "../../../types/order.type";
import { useUpdateTipsMutation } from "../../../redux/features/order/orderApi";


type TFormValues = z.infer<typeof updateTipsSchema>;

type TProps = {
  order: IOrder
}

const UpdateTipsModal = ({ order }: TProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [ updateTips, { isLoading, isSuccess }] = useUpdateTipsMutation();
  const { handleSubmit, control, setValue} = useForm<TFormValues>({
    resolver: zodResolver(updateTipsSchema),
    defaultValues: {
      tips: String(order?.tips),
    }
  });

    //if success
   useEffect(() => {
    if (!isLoading && isSuccess) {
      setModalOpen(false);
    }
  }, [isLoading, isSuccess]);


  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    updateTips({
      id: order._id,
      data: {
        tips: Number(data.tips)
      }
    })
  };

  return (
    <>
       <button
        onClick={() => setModalOpen(true)}
        disabled={!order.tips}
        className={`p-1 rounded-full transition-colors ${
          order.status==="delivered" ? "bg-gray-100 hover:bg-gray-200 text-gray-700" : "bg-gray-50 text-gray-300 cursor-not-allowed"
        }`}
      >
        <Edit size={14} />
      </button>

      <Modal
        open={modalOpen}
        onCancel={() => {
          setValue("tips", String(order?.tips));
          setModalOpen(false)
        }}
        maskClosable={false}
        footer={false}
      >
        <div className="w-full mx-auto">
          <div className="bg-white rounded-xl overflow-hidden transition-all duration-300">
            <div className="px-2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Update Tips
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <CustomInput
                  label="Tips"
                  name="tips"
                  type="text"
                  control={control}
                  placeholder="Enter value"
                  onInput={(e: any) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  }}
                />
                <FormButton isLoading={isLoading}>
                   Save Change
                </FormButton>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UpdateTipsModal;
