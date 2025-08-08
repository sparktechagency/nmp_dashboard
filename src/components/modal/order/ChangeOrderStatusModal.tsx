import { Modal } from "antd";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { z } from "zod";
import { CgSpinnerTwo } from "react-icons/cg";
import { FiEdit } from "react-icons/fi";
import CustomSelect from "../../form/CustomSelect";
import { orderStatusOptions } from "../../../data/order.data";
import type { TDeliveryStatus } from "../../../types/order.type";
import { orderStatusSchema } from "../../../schemas/order.schema";
import { useUpdateOrderMutation } from "../../../redux/features/order/orderApi";

type TFormValues = z.infer<typeof orderStatusSchema>;

type TProps = {
    orderId: string;
    status: TDeliveryStatus;
}

const ChangeOrderStatusModal = ({ orderId, status }: TProps) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [changeStatus, { isLoading, isSuccess }] = useUpdateOrderMutation();
    const { handleSubmit, control } = useForm<TFormValues>({
        resolver: zodResolver(orderStatusSchema),
        defaultValues: {
            status
        }
    });


    //if success
    useEffect(() => {
        if (!isLoading && isSuccess) {
            setModalOpen(false);
        }
    }, [isLoading, isSuccess]);


    const onSubmit: SubmitHandler<TFormValues> = (data) => {
        changeStatus({
            id: orderId,
            data
        });
    };

    return (
        <>
            <button
                className="p-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full"
                onClick={() => {
                    setModalOpen(true);
                }}
            >
                <FiEdit size={14} />
            </button>
            <Modal
                open={modalOpen}
                onCancel={() => {
                    setModalOpen(false);
                }}
                maskClosable={false}
                footer={false}
            >
                <div className="w-full mx-auto">
                    <div className="bg-white rounded-xl overflow-hidden transition-all duration-300">
                        <div className="p-2">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Update Order Status
                            </h2>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <CustomSelect
                                    label="Status"
                                    name="status"
                                    control={control}
                                    options={orderStatusOptions}
                                    blankOption={false}
                                />
                                <div className="flex justify-end mt-4">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className={`px-4 py-2 w-full rounded-lg text-white font-medium 
                                            ${isLoading
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

export default ChangeOrderStatusModal;
