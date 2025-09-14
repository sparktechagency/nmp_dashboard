import product_placeholder from "../../assets/images/product_placeholder.png";
import UpdateHeroImgModal from "../modal/information/UpdateHeroImgModal";


type TProps = {
    heroImg: string
}

const UpdateHeroImgPreview = ({ heroImg }: TProps) => {
    return (
        <>

            <div>
                <h1 className="flex items-center gap-2 mb-2">
                    <span className="font-bold">Home Page's Image</span>
                    <UpdateHeroImgModal />
                </h1>
                <div className="grid grid-cols-1 gap-4">
                    <div className="relative group">
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                            <img
                                src={heroImg || product_placeholder}
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

export default UpdateHeroImgPreview