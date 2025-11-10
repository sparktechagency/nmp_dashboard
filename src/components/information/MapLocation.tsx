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
                        {information?.distance} miles
                    </p>
                    <p>
                        <span>Latitude: </span>
                        {information?.latitude}
                    </p>
                    <p>
                        <span>Longitude: </span>
                        {information?.longitude}
                    </p>
                </div>
            </div>
        </>
    )
}

export default MapLocation