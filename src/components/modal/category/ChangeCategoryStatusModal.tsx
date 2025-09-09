import { Modal } from "antd";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import type { TProductStatus } from "../../../types/product.type";
import { useUpdateCategoryMutation } from "../../../redux/features/category/categoryApi";
import DeleteButton from "../../form/DeleteButton";

type TProps ={
  categoryId:string;
  status: TProductStatus;
}

const ChangeCategoryStatusModal = ({ categoryId, status }: TProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [ changeStatus, { isLoading, isSuccess }] = useUpdateCategoryMutation();

  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
    }
  }, [isSuccess]);


 const handleDelete = () => {
   changeStatus({
     id: categoryId,
     data : {
      status: status==="visible" ? "hidden" : "visible"
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
        title={`Are you sure, you want to ${status==="visible" ? "hide" : "visible"}?`}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        maskClosable={false}
        footer={false}
        closable={false}
      >
       
      
        <div className="flex justify-end px-4 gap-x-3">
          <button
            onClick={() => setModalOpen(false)}
            className="bg-black text-white px-4 py-2 rounded-md"
          >
            No
          </button>
           <DeleteButton isLoading={isLoading} onClick={handleDelete}/>
        </div>
      </Modal>
    </>
  );
};

export default ChangeCategoryStatusModal;
