/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { z } from "zod";
import CustomInput from "../../form/CustomInput";
import Error from "../../validation/Error";
import FormButton from "../../form/FormButton";
import { useCreateShippingCostMutation } from "../../../redux/features/shipping/shippingApi";
import { shippingCostValidationSchema } from "../../../schemas/shipping.schema";
import { SetShippingCostCreateError } from "../../../redux/features/shipping/shippingSlice";

type TFormValues = z.infer<typeof shippingCostValidationSchema>;

const CreateShippingCostModal = () => {
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const { ShippingCostCreateError } = useAppSelector((state) => state.shipping);
  const [createShippingCost, { isLoading, isSuccess }] = useCreateShippingCostMutation();
  const { handleSubmit, control, reset } = useForm<TFormValues>({
    resolver: zodResolver(shippingCostValidationSchema),
    mode: "onChange", 
  });


  
  //if success
   useEffect(() => {
    if (!isLoading && isSuccess) {
      setModalOpen(false);
      reset();
    }
  }, [isLoading, isSuccess, reset]);


  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    dispatch(SetShippingCostCreateError(""));
    createShippingCost(data);
  };

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="w-36 lg:w-auto flex items-center justify-center gap-2 bg-primary px-3 py-1.5 text-white cursor-pointer rounded-md hover:bg-[#2b4773] duration-200"
      >
        <FaPlus />
        Add New
      </button>
      <Modal
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          dispatch(SetShippingCostCreateError(""));
          reset()
        }}
        maskClosable={false}
        footer={false}
      >
        <div className="w-full mx-auto">
          <div className="bg-white rounded-xl overflow-hidden transition-all duration-300">
            <div className="p-2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Add Shipping Cost
              </h2>
               {ShippingCostCreateError && <Error message={ShippingCostCreateError} />}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <CustomInput
                  label="Name"
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

export default CreateShippingCostModal;
