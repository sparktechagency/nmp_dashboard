import { CgSpinnerTwo } from "react-icons/cg";

type TProps = {
    isLoading: boolean;
    onClick: ()=> void;
}

const DeleteButton = ({isLoading, onClick}: TProps) => {
  return (
    <>
          <button
              onClick={onClick}
              disabled={isLoading}
              className="px-4 cursor-pointer py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none disabled:cursor-not-allowed"
          >
              {isLoading ? (
                  <>
                      <CgSpinnerTwo className="animate-spin" fontSize={16} />
                  </>
              ) : (
                  "Yes"
              )}
          </button>
    </>
  )
}

export default DeleteButton