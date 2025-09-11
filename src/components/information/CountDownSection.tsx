import type { IInformation } from "../../types/information.type"
import CountDownImagePreview from "./CountDownImagePreview";
import UpdateCountDownModal from "../modal/information/UpdateCountDownModal";
import { CountdownTimer } from "./CountDownTimer";

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
                <CountdownTimer targetDate={information.countDownDate}/>
            </div>
            <CountDownImagePreview information={information}/>
        </>
    )
}

export default CountDownSection;