import { Modal } from "antd";
import { useEffect, useRef, useState } from "react";
import { Edit, Plus, X } from "lucide-react";
import { ErrorToast } from "../../../helper/ValidationHelper";
import { useUpdateProductImgMutation } from "../../../redux/features/product/productApi";
import CustomButton from "../../form/CustomButton";



type TProps = {
  productId: string
}

const UpdateProductImageModal = ({ productId }: TProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [updateProductImg, { isLoading, isSuccess }] = useUpdateProductImgMutation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFile(files[0])
    }
  }

  const removeFile = () => {
    setSelectedFile(null);
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const getImageUrl = (file: File) => {
    return URL.createObjectURL(file)
  }



  //if success
  useEffect(() => {
    if (!isLoading && isSuccess) {
      setModalOpen(false);
      setSelectedFile(null);
    }
  }, [isLoading, isSuccess]);


  const handleSubmit = () => {
    if (!selectedFile) {
      ErrorToast("Select minimum one image")
    } else {
      const formData = new FormData();
      formData.append("image", selectedFile);
      updateProductImg({
        id: productId,
        data: formData
      })
    }
  };

  return (
    <>
      <Edit onClick={() => setModalOpen(true)} className="w-4 h-4 text-red-600 cursor-pointer" />
      <Modal
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false)
        }}
        maskClosable={false}
        footer={false}
        width={600}
      >
        <div className="w-full mx-auto">
          <div className="bg-white rounded-xl overflow-hidden transition-all duration-300">
            <div className="p-2">
              <div className="max-w-xl">
                <h2 className="text-xl font-bold mb-6">Upload Image</h2>

                {/* Hidden file input */}
                <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleFileSelect} className="hidden" />

                {/* Upload button */}
                <button
                  onClick={triggerFileInput}
                  type="button"
                  disabled={selectedFile ? true : false}
                  className={`mb-6 px-6 py-3 rounded-lg transition-colors flex items-center gap-2 ${selectedFile
                      ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                >
                  <Plus className="w-5 h-5" />
                  Add Image
                </button>
                {/* Image previews */}
                {selectedFile && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <div className="relative group">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={getImageUrl(selectedFile) || "/placeholder.svg"}
                          alt={`Preview`}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Remove button */}
                      <button
                        onClick={removeFile}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    {/* ))} */}
                  </div>
                )}
                {/* Empty state */}
                {!selectedFile && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <div className="text-gray-400 mb-4">
                      <Plus className="w-12 h-12 mx-auto mb-4" />
                      <p className="text-lg">No images selected</p>
                      <p className="text-sm">Click "Add Images" to upload files</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <CustomButton onClick={handleSubmit} isLoading={isLoading}>Save Change</CustomButton> 
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UpdateProductImageModal;
