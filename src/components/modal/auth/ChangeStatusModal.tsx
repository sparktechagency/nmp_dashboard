import { Modal } from "antd";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useChangeStatusMutation } from "../../../redux/features/auth/authApi";
import type { TBlockStatus } from "../../../types/user.type";
import DeleteButton from "../../form/DeleteButton";

type TProps ={
  userId:string;
  status: TBlockStatus;
}

const ChangeStatusModal = ({ userId, status }: TProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [ changeStatus, { isLoading, isSuccess }] = useChangeStatusMutation();

  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
    }
  }, [isSuccess]);


 const handleClick = () => {
   changeStatus({
     id: userId,
     data : {
      status: status==="blocked" ? "unblocked" : "blocked"
     }
   });
 };

  return (
    <>
      <button
        className="p-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        <FiEdit size={14} />
      </button>
      <Modal
        title={`Are you sure, you want to ${status==="blocked" ? "active" : "block"}?`}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        maskClosable={false}
        footer={false}
        closable={false}
      >
       
      
        <div className="flex justify-end px-4 gap-x-3">
          <button onClick={() => setModalOpen(false)} className="bg-black text-white px-4 py-2 rounded-md">No</button>
          <DeleteButton isLoading={isLoading} onClick={handleClick} />
        </div>
      </Modal>
    </>
  );
};

export default ChangeStatusModal;
