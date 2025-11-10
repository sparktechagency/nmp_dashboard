import type { IInformation } from "../../types/information.type"
import UpdateDistanceModal from "../modal/information/UpdateDistanceModal"

type TProps = {
    information: IInformation
}


const MapLocation = ({ information }: TProps) => {
    return (
        <>
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h1 className="font-bold">Delivery Range</h1>
                    <UpdateDistanceModal information={information}/>
                </div>
                <div>
                    <p>
                        <span>Distance: </span>
                        <span className="font-semibold">{information?.distance+ " "}</span>
                        miles
                    </p>
                    <p>
                        <span>Latitude: </span>
                        <span className="font-semibold">{information?.latitude}</span>
                    </p>
                    <p>
                        <span>Longitude: </span>
                        <span className="font-semibold">{information?.longitude}</span>
                    </p>
                </div>
            </div>
        </>
    )
}

export default MapLocation