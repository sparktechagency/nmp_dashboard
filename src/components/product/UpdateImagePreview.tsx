import type { ISingleProduct } from "../../types/product.type";
import UpdateProductImageModal from "../modal/product/UpdateProductImageModal";
import product_placeholder from "../../assets/images/product_placeholder.png";
import MakeFeatureProduct from "./MakeFeatureProduct";


type TProps = {
    product: ISingleProduct
}

const UpdateImagePreview = ({ product }: TProps) => {
    return (
        <>

            <div>
                <h1 className="flex items-center gap-2 mb-2">
                    <span className="font-bold">Images</span>
                    <UpdateProductImageModal productId={product?._id} />
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <div className="relative group">
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                            <img
                                src={product?.image || product_placeholder}
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

            {
                !product?.isFeatured && (
                    <MakeFeatureProduct productId={product?._id} />
                )
            }
        </>
    )
}

export default UpdateImagePreview