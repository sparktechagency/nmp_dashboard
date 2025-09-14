
import product_placeholder from "../../assets/images/product_placeholder.png";
import { FaStar } from "react-icons/fa";
import type { ISingleProduct } from "../../types/product.type";
import MakeFeatureProduct from "./MakeFeatureProduct";
import getStockStatus from "../../utils/getStockStatus";
import { getStockStatusBg, getStockStatusColor } from "../../utils/getStockStatusColor";
import RemoveFeatureProductModal from "../modal/product/RemoveFeatureProductModal";


type TProps = {
  product: ISingleProduct
}

const ProductDetails = ({ product}: TProps) =>{



  return (
    <div className="bg-white rounded-lg mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product?.image || product_placeholder}
              alt={product.name}
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = product_placeholder;
              }}
            />
          </div>
        </div>
        {/* Product Info */}
        <div className="space-y-6">
          {/* Category */}
          <h1 className="text-3xl font-bold text-gray-900">{product?.name}</h1>
          <div className="text-sm text-gray-500 tracking-wide">Product Id: <span className="text-black font-semibold">{product?._id}</span></div>
          <div className="text-md text-gray-500 uppercase tracking-wide">Type: <span className="text-blue-500 font-semibold">{product?.type}</span></div>
          <div className="text-sm text-gray-500 uppercase tracking-wide">Category: <span className="text-green-500">{product?.category}</span></div>
          {product?.brand && (
            <div className="text-sm text-gray-500 uppercase tracking-wide">Brand: <span className="text-pink-500">{product?.brand}</span></div>
          )}

          {product?.flavor && (
            <div className="text-sm text-gray-500 uppercase tracking-wide">Flavor: <span className="text-yellow-500">{product?.flavor}</span></div>
          )}
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
              className={`w-3 h-3 rounded-full ${getStockStatusBg(product.stockStatus)}`}
            ></div>
            <span
              className={`text-sm font-medium ${getStockStatusColor(product.stockStatus)}`}
            >
              {getStockStatus(product.stockStatus)}
            </span>
          </div>
          {
            !product?.isFeatured ? (
              <RemoveFeatureProductModal productId={product?._id}/>
            ) : (
              <MakeFeatureProduct productId={product?._id}/>
            )
          } 
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
