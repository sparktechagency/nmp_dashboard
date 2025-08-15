/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useDeleteCategoryMutation } from "../../../redux/features/category/categoryApi";
import DeleteButton from "../../form/DeleteButton";

type TProps = {
  categoryId: string;
};

const DeleteCategoryModal = ({categoryId}: TProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteCategory, { isLoading, isSuccess }] =
    useDeleteCategoryMutation();

  useEffect(() => {
    if (!isLoading) {
      setModalOpen(false);
    }
  }, [isLoading, isSuccess]);


  const handleDelete = () => {
    deleteCategory(categoryId);
  };

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-red-600 hover:bg-red-700 p-2 text-white rounded-full"
      >
        <Trash2 size={18} />
      </button>

      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        maskClosable={false}
        footer={false}
        closable={false}
      >
        <div className="rounded-md">
          <div className="">
            <div className="flex justify-between items-center">
              <h3 className="text-lg sm:text-xl font-semibold">
                Are you sure, you want to delete?
              </h3>
            </div>
          </div>
          <div>
            <div className="flex justify-end space-x-2 pt-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 cursor-pointer border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                No
              </button>
             <DeleteButton isLoading={isLoading} onClick={handleDelete}/>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteCategoryModal;
