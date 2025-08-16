"use client"

import type React from "react"
import { useRef } from "react"
import { X, Plus } from "lucide-react";

type TProps = {
    selectedFile: File | null,
    setSelectedFile: React.Dispatch<React.SetStateAction<File|null>>
}

const ProductImageField = ({selectedFile, setSelectedFile}: TProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFile(files[0])
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const getImageUrl = (file: File) => {
    return URL.createObjectURL(file)
  }

  return (
    <div className="max-w-xl">
      <h2 className="text-xl font-bold mb-4">Upload Image</h2>

      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />

      {/* Upload button */}
      <button
        onClick={triggerFileInput}
        type="button"
        disabled={selectedFile ? true : false}
        className={`mb-6 px-6 py-3 rounded-lg transition-colors flex items-center gap-2 ${
          selectedFile
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
  )
}


export default ProductImageField;