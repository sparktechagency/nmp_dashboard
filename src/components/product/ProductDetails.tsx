"use client"

import { useState } from "react";
import product_placeholder from "../../assets/images/product_placeholder.png";
import { FaStar } from "react-icons/fa";
import type { ISingleProduct } from "../../types/product.type";


type TProps = {
  product: ISingleProduct
}

const ProductDetails = ({ product}: TProps) =>{
  const [selectedImage, setSelectedImage] = useState(0)


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product?.images[selectedImage] || product_placeholder}
              alt={product.name}
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = product_placeholder;
              }}
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product?.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square overflow-hidden rounded-lg bg-gray-100 border-2 transition-colors ${
                  selectedImage === index ? "border-blue-500" : "border-transparent hover:border-gray-300"
                }`}
              >
                <img
                  src={image || product_placeholder}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = product_placeholder;
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Category */}
          <div className="text-sm text-gray-500 uppercase tracking-wide">Category: <span className="text-green-500">{product?.categoryName}</span></div>

          {/* Product Name */}
          <h1 className="text-3xl font-bold text-gray-900">{product?.name}</h1>

          {/* Ratings */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">Ratings: </div>
            <FaStar className="text-yellow-500" size={18} />
            <span className="text-sm text-gray-600">
              {product.ratings} ({product.totalReview} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-gray-900">${product.currentPrice}</span>
            {product.originalPrice > product.currentPrice && (
              <>
                <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                {
                  product?.discount && (
                    <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      {product.discount}
                    </span>
                  )
                }
              </>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            <div
              className={`w-3 h-3 rounded-full ${product.stockStatus === "in_stock" ? "bg-green-500" : "bg-red-500"}`}
            ></div>
            <span
              className={`text-sm font-medium ${
                product.stockStatus === "in_stock" ? "text-green-700" : "text-red-700"
              }`}
            >
              {product.stockStatus === "in_stock" ? "In Stock" : "Out of Stock"}
            </span>
          </div>   
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-16 border-t border-gray-200 pt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Description</h2>
        <div className="prose prose-gray max-w-none">
          <div className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: product.description as string }}></div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails;
