"use client";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import DeleteButton from "../../form/DeleteButton";
import { useUpdateProductMutation } from "../../../redux/features/product/productApi";

type TProps = {
  productId: string;
};

const RemoveFeatureProductModal = ({ productId}: TProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [updateProduct, { isLoading, isSuccess }] = useUpdateProductMutation();

  useEffect(() => {
    if (!isLoading) {
      setModalOpen(false);
    }
  }, [isLoading, isSuccess]);


    const handleDelete = () => {
        updateProduct({
            id: productId,
            data: {
                isFeatured: false
            }
        })
    };

  return (
    <>
       <button onClick={() => setModalOpen(true)} className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 px-2 py-1.5 rounded-md text-white duration-200 disabled:cursor-not-allowed">
            Remove From Feature
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
                Are you sure, you want to remove?
              </h3>
            </div>
          </div>
          <div>
            <div className="flex justify-end space-x-2 pt-3">
             <button
                onClick={() => setModalOpen(false)}
                className="bg-black text-white px-4 py-2 rounded-md"
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

export default RemoveFeatureProductModal;
