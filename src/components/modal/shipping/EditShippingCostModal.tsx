/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { z } from "zod";
import CustomInput from "../../form/CustomInput";
import Error from "../../validation/Error";
import { Edit } from "lucide-react";
import FormButton from "../../form/FormButton";
import { useUpdateShippingCostMutation } from "../../../redux/features/shipping/shippingApi";
import { shippingCostValidationSchema } from "../../../schemas/shipping.schema";
import type { TShippingCost } from "../../../types/shipping.type";
import { SetShippingCostUpdateError } from "../../../redux/features/shipping/shippingSlice";


type TFormValues = z.infer<typeof shippingCostValidationSchema>;

type TProps = {
  shippingCost: TShippingCost
}

const EditShippingCostModal = ({ shippingCost }: TProps) => {
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const { ShippingCostUpdateError } = useAppSelector((state) => state.shipping);
  const [ updateShippingCost, { isLoading, isSuccess }] = useUpdateShippingCostMutation();
  const { handleSubmit, control, setValue} = useForm<TFormValues>({
    resolver: zodResolver(shippingCostValidationSchema),
    defaultValues: {
      name: shippingCost?.name,
      minSubTotal: String(shippingCost?.minSubTotal),
      maxSubTotal: String(shippingCost?.maxSubTotal),
      cost: String(shippingCost?.cost),
      priority: String(shippingCost?.priority)
    }
  });

    //if success
   useEffect(() => {
    if (!isLoading && isSuccess) {
      setModalOpen(false);
    }
  }, [isLoading, isSuccess]);


  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    dispatch(SetShippingCostUpdateError(""));
    updateShippingCost({
      id: shippingCost?._id,
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
          setValue("name", shippingCost?.name);
          setValue("minSubTotal", String(shippingCost?.minSubTotal));
          setValue("maxSubTotal", String(shippingCost?.maxSubTotal));
          setValue("cost", String(shippingCost?.cost));
          setValue("priority", String(shippingCost?.priority));
          setModalOpen(false)
        }}
        maskClosable={false}
        footer={false}
      >
        <div className="w-full mx-auto">
          <div className="bg-white rounded-xl overflow-hidden transition-all duration-300">
            <div className="p-2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Update Shipping Cost
              </h2>
               {ShippingCostUpdateError && <Error message={ShippingCostUpdateError} />}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <CustomInput
                  label="Title"
                  name="name"
                  type="text"
                  control={control}
                  placeholder="Enter title"
                />
                <CustomInput
                  label="Minimum Value"
                  name="minSubTotal"
                  type="text"
                  control={control}
                  placeholder="Enter Minimum Value"
                  onInput={(e: any) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  }}
                />
                <CustomInput
                  label="Maximum Value"
                  name="maxSubTotal"
                  type="text"
                  control={control}
                  placeholder="Enter Maximum Value"
                  onInput={(e: any) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  }}
                />
                <CustomInput
                  label="Cost"
                  name="cost"
                  type="text"
                  control={control}
                  placeholder="Enter cost"
                  onInput={(e: any) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  }}
                />
                <CustomInput
                  label="Priority"
                  name="priority"
                  type="text"
                  control={control}
                  placeholder="Enter priority"
                  onInput={(e: any) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  }}
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

export default EditShippingCostModal;
