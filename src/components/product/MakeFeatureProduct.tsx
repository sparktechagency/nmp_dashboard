import { CgSpinnerTwo } from "react-icons/cg";
import { useUpdateProductMutation } from "../../redux/features/product/productApi";

type TProps = {
    productId: string;
}

const MakeFeatureProduct = ({ productId }: TProps) => {
    const [ updateProduct, { isLoading }] = useUpdateProductMutation();
    
    const handleClick = () => {
        updateProduct({
            id: productId,
            data: {
                isFeatured: true
            }
        })
    }

    
    return (
        <>
            <button onClick={handleClick} className="w-48 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 px-2 py-1.5 rounded-md text-white disabled:cursor-not-allowed">
                {isLoading ? (
                    <>
                        <CgSpinnerTwo className="animate-spin" fontSize={16} />
                        Processing...
                    </>
                ) : (
                    <>
                        Make Feature Product
                    </>
                )}
            </button>
        </>
    )
}

export default MakeFeatureProduct;