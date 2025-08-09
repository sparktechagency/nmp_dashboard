"use client"

import type React from "react"
import { useRef } from "react"
import { X, Plus } from "lucide-react";

type TProps = {
    selectedFiles: File[],
    setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>
}

const ProductImageField = ({selectedFiles, setSelectedFiles}: TProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files[0]
        if (files) {
            const newFiles = Array.from(files)
            const remainingSlots = 5 - selectedFiles.length
            const filesToAdd = newFiles.slice(0, remainingSlots)

            if (filesToAdd.length > 0) {
                setSelectedFiles((prev) => [...prev, ...filesToAdd])
            }

            // Reset the input value to allow selecting the same files again
            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }
        }
    }

  const removeFile = (indexToRemove: number) => {
    setSelectedFiles((prev) => prev.filter((_, index) => index !== indexToRemove))
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const getImageUrl = (file: File) => {
    return URL.createObjectURL(file)
  }

  return (
    <div className="max-w-xl">
      <h2 className="text-xl font-bold mb-6">Upload Images</h2>

      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />

      {/* Upload button */}
      <button
        onClick={triggerFileInput}
        type="button"
         disabled={selectedFiles.length >= 5}
        className={`mb-6 px-6 py-3 rounded-lg transition-colors flex items-center gap-2 ${
          selectedFiles.length >= 5
            ? "bg-gray-400 text-gray-600 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        <Plus className="w-5 h-5" />
        Add Image
      </button>

      {/* Image previews */}
      {selectedFiles.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {selectedFiles.map((file, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={getImageUrl(file) || "/placeholder.svg"}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Remove button */}
              <button
                onClick={() => removeFile(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {selectedFiles.length === 0 && (
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