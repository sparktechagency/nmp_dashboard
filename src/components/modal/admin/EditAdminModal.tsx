import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { z } from "zod";
import CustomInput from "../../form/CustomInput";
import { CgSpinnerTwo } from "react-icons/cg";
import Error from "../../validation/Error";
import { Edit } from "lucide-react";
import type { IUser } from "../../../types/user.type";
import { updateAdminSchema } from "../../../schemas/admin.schema";
import { useUpdateAdminMutation } from "../../../redux/features/admin/adminApi";
import { SetAdminUpdateError } from "../../../redux/features/admin/adminSlice";


type TFormValues = z.infer<typeof updateAdminSchema>;

type TProps = {
    admin: IUser
}

const EditAdminModal = ({ admin }: TProps) => {
    const dispatch = useAppDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const { UpdateError } = useAppSelector((state) => state.admin);
    const [updateAdmin, { isLoading, isSuccess }] = useUpdateAdminMutation();
    const { handleSubmit, control, setValue } = useForm<TFormValues>({
        resolver: zodResolver(updateAdminSchema),
        defaultValues: {
            fullName: admin?.fullName,
            phone: admin?.phone
        }
    });


    //if success
    useEffect(() => {
        if (!isLoading && isSuccess) {
            setModalOpen(false);
        }
    }, [isLoading, isSuccess]);


    const onSubmit: SubmitHandler<TFormValues> = (data) => {
        dispatch(SetAdminUpdateError(""));
        console.log(data)
        updateAdmin({
            id: admin?._id,
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
                    setValue("fullName", admin.fullName);
                    setValue("phone", admin.phone);
                    setModalOpen(false)
                    dispatch(SetAdminUpdateError(""))
                }}
                maskClosable={false}
                footer={false}
            >
                <div className="w-full mx-auto">
                    <div className="bg-white rounded-xl overflow-hidden transition-all duration-300">
                        <div className="p-2">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Update Admin
                            </h2>
                            {UpdateError && <Error message={UpdateError} />}
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <CustomInput
                                    label="Name"
                                    name="fullName"
                                    type="text"
                                    control={control}
                                    placeholder="Enter full name"
                                />
                                <CustomInput
                                    label="Phone Number"
                                    name="phone"
                                    type="text"
                                    control={control}
                                    placeholder="Enter phone number"
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

export default EditAdminModal;
