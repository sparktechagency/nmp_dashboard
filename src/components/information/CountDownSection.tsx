import type { IInformation } from "../../types/information.type"
import { MdOutlineTitle } from "react-icons/md";
import CountDownImagePreview from "./CountDownImagePreview";
import UpdateCountDownModal from "../modal/information/UpdateCountDownModal";

type TProps = {
    information: IInformation
}

const CountDownSection = ({ information }: TProps) => {
    return (
        <>
            <div className="w-full mx-auto bg-white rounded-lg shadow-md border border-gray-200 p-6 relative">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-1">Count Down Time</h2>
                </div>
                <UpdateCountDownModal information={information} />
                {/* Contact Details */}
                <div className="space-y-4">
                    {/* Title */}
                    <div className="flex items-center space-x-3">
                        <MdOutlineTitle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <div>
                            <p className="text-sm font-medium text-gray-700">Title</p>
                            <p className="text-gray-900">{information?.title || "not provided"}</p>
                        </div>
                    </div>
                </div>
            </div>
            <CountDownImagePreview information={information}/>
        </>
    )
}

export default CountDownSection;