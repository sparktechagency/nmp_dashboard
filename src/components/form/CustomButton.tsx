import type React from "react";
import { CgSpinnerTwo } from "react-icons/cg";



type TProps = {
    isLoading: boolean;
    onClick: ()=> void;
    children: React.ReactNode;
    loadingTitle?: string;
}

const CustomButton = ({ isLoading, loadingTitle="Processing...", onClick, children }: TProps) => {
    return (
        <>
            <button
                onClick={onClick}
                type="button"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-x-2 bg-primary hover:bg-primary/80 cursor-pointer text-white py-2 rounded-md font-semibold transition-colors duration-100"
            >
                {isLoading ? (
                    <>
                        <CgSpinnerTwo className="animate-spin" fontSize={16} />
                        {loadingTitle}
                    </>
                ) : (
                    <>
                      {children}
                    </>
                )}
            </button>
        </>
    )
}

export default CustomButton