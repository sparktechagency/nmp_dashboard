import { Modal } from "antd";
import { useEffect, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { FiTrash2 } from "react-icons/fi";
import { useDeleteFaqMutation } from "../../../redux/features/faq/faqApi";


type TProps = {
  faqId : string
}


const DeleteFaqModal = ({ faqId }: TProps) => {
   const [ modalOpen, setModalOpen ] = useState(false);
   const [ deleteFaq, { isLoading, isSuccess, isError }] = useDeleteFaqMutation();

    useEffect(()=> {
        if(isSuccess || isError){
          setModalOpen(false)
        }
    },[isSuccess, isError])
   
    const handleDelete = () => {
        deleteFaq(faqId);
    }

  return (
    <>
      <button onClick={()=> setModalOpen(true)} className="bg-white p-1.5 rounded-full shadow hover:bg-gray-100 transition">
        <FiTrash2 className="text-red-500" size={20} />
      </button>
      <Modal
        title="Are you sure, you want to delete?"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        maskClosable={false}
        footer={false}
        closable={false}
      >
        <div className="flex justify-end px-4 gap-x-3">
          <button
            onClick={() => setModalOpen(false)}
            className="bg-black text-white px-4 py-1 rounded-md"
          >
            No
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-red-500 hover:bg-red-600 duration-500 text-white px-4 py-1 rounded-md disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <CgSpinnerTwo className="animate-spin" fontSize={16} />
              </>
            ) : (
              "Yes"
            )}
          </button>
        </div>
      </Modal>
    </>
  );
}

export default DeleteFaqModal;