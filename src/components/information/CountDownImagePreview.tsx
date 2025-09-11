import product_placeholder from "../../assets/images/product_placeholder.png";
import type { IInformation } from "../../types/information.type";
import UpdateCountDownImgModal from "../modal/information/UpdateCountDownImgModal";


type TProps = {
    information: IInformation
}

const CountDownImagePreview = ({ information }: TProps) => {
    return (
        <>

            <div className="bg-white p-3 shadow-md rounded-md -mt-4">
                <h1 className="flex items-center gap-2 mb-2">
                    <span className="font-bold">Count Down Image</span>
                    <UpdateCountDownImgModal/>
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <div className="relative group">
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                            <img
                                src={information?.countDownImg || product_placeholder}
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = product_placeholder;
                                }}
                                alt={`Preview`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CountDownImagePreview