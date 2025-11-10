/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { z } from "zod";
import CustomInput from "../../form/CustomInput";
import { Edit } from "lucide-react";
import FormButton from "../../form/FormButton";
import { useUpdateMapLocationMutation } from "../../../redux/features/information/informationApi";
import { updateLocationSchema } from "../../../schemas/information.schema";
import type { IInformation } from "../../../types/information.type";


type TFormValues = z.infer<typeof updateLocationSchema>;

type TProps = {
    information: IInformation
}

const UpdateDistanceModal = ({ information }: TProps) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [updateMapLocation, { isLoading, isSuccess }] = useUpdateMapLocationMutation();
    const { handleSubmit, control, setValue } = useForm<TFormValues>({
        resolver: zodResolver(updateLocationSchema),
        defaultValues: {
            distance: String(information.distance),
            latitude: String(information.latitude),
            longitude: String(information.longitude)
        }
    });

    //if success
    useEffect(() => {
        if (!isLoading && isSuccess) {
            setModalOpen(false);
        }
    }, [isLoading, isSuccess]);


    const onSubmit: SubmitHandler<TFormValues> = (data) => {
        updateMapLocation({
            distance: Number(data.distance),
            latitude: Number(data.latitude),
            longitude: Number(data.longitude),
        });
    };

    return (
        <>
            <Edit onClick={() => setModalOpen(true)} className="w-4 h-4 text-red-600 cursor-pointer" />

            <Modal
                open={modalOpen}
                onCancel={() => {
                    setValue("distance", String(information?.distance));
                    setValue("latitude", String(information?.latitude));
                    setValue("longitude", String(information?.longitude));
                    setModalOpen(false)
                }}
                maskClosable={false}
                footer={false}
            >
                <div className="w-full mx-auto">
                    <div className="bg-white rounded-xl overflow-hidden transition-all duration-300">
                        <div className="p-2">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Update Delivery Range
                            </h2>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <CustomInput
                                    label="Distance (Miles)"
                                    name="distance"
                                    type="text"
                                    control={control}
                                    placeholder="Enter distance value"
                                    onInput={(e: any) => {
                                        e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                    }}
                                />
                                <CustomInput
                                    label="Latitude"
                                    name="latitude"
                                    type="text"
                                    control={control}
                                    placeholder="Enter value"
                                />
                                <CustomInput
                                    label="Longitude"
                                    name="longitude"
                                    type="text"
                                    control={control}
                                    placeholder="Enter value"
                                />
                                <FormButton isLoading={isLoading}>
                                    Save Changes
                                </FormButton>
                            </form>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default UpdateDistanceModal;
