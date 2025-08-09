/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAppSelector } from "../../redux/hooks/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "../form/CustomInput";
import { CgSpinnerTwo } from "react-icons/cg";
import type { z } from "zod";
import CustomSelect from "../form/CustomSelect";
import CustomQuilEditor from "../form/CustomQuilEditor";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateProductValidationSchema } from "../../schemas/product.schema";
import { useUpdateProductMutation } from "../../redux/features/product/productApi";
import { useGetCategoryDropDownQuery } from "../../redux/features/category/categoryApi";
import CustomMultiSelect from "../form/CustomMultiSelect";
import { useGetColorDropDownQuery } from "../../redux/features/color/colorApi";
import { useGetSizesQuery } from "../../redux/features/size/sizeApi";
import { stockStatusOptions } from "../../data/product.data";
import type { ISingleProduct } from "../../types/product.type";

type TFormValues = z.infer<typeof updateProductValidationSchema>;

type TProps = {
    product: ISingleProduct
}

const UpdateProductForm = ({ product }: TProps) => {
  const navigate = useNavigate();
  useGetCategoryDropDownQuery(undefined);
  const {isLoading: isColorLoading} = useGetColorDropDownQuery(undefined);
  useGetSizesQuery(undefined);
  const { categoryOptions } = useAppSelector((state) => state.category);
  const { colorOptions } = useAppSelector((state) => state.color);
  const { sizeOptions } = useAppSelector((state) => state.size);
  const [ updateProduct, { isLoading, isSuccess }] = useUpdateProductMutation();
  const { handleSubmit, control, watch, trigger } = useForm({
    resolver: zodResolver(updateProductValidationSchema),
      defaultValues: {
          name: product?.name,
          categoryId: product?.categoryId,
          currentPrice: String(product.currentPrice),
          originalPrice: String(product.originalPrice),
          discount: product?.discount,
          status: product?.status,
          stockStatus: product?.stockStatus,
          description: product?.description
      }
  });

  const currentPrice = watch("currentPrice");
  const originalPrice = watch("originalPrice");

  useEffect(() => {
    if (currentPrice) {
      trigger("originalPrice");
    }
    if(currentPrice && !originalPrice){
      trigger("currentPrice");
    }
  }, [currentPrice, originalPrice, watch, trigger]);
  

  useEffect(() => {
    if (!isLoading && isSuccess) {
      navigate("/products")
    }
  }, [isLoading, isSuccess, navigate])


  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    const finalValues: Record<string, unknown> = {
      name: data.name,
      categoryId: data.categoryId,
      currentPrice: data.currentPrice,
      status: data?.status,
      stockStatus: data?.stockStatus,
      description: data?.description
    }

    if(!data.discount){
      finalValues.discount="";
    }
    if(data.discount){
      finalValues.discount=data.discount;
    }
    if(!data.originalPrice){
      finalValues.originalPrice=0;
    }
    if(data.originalPrice){
      finalValues.originalPrice=data.originalPrice;
    }

    updateProduct({
        id: product?._id,
        data: finalValues
    })
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <CustomInput
            label="Name"
            name="name"
            type="text"
            control={control}
            placeholder="Enter name"
          />
          <CustomSelect
            label="Category"
            name="categoryId"
            control={control}
            options={categoryOptions}
            disabled={categoryOptions.length === 0}
          />
          <CustomInput
            label="Current Price"
            name="currentPrice"
            type="text"
            control={control}
            placeholder="Enter price"
            onInput={(e: any) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
            }}
          />
          <CustomInput
            label="Original Price(optional)"
            name="originalPrice"
            type="text"
            control={control}
            placeholder="Enter price"
            onInput={(e: any) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
            }}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomMultiSelect name="colors" label="Colors (Optional)" control={control} options={colorOptions} disabled={isColorLoading || colorOptions?.length === 0} />
          <CustomMultiSelect name="sizes" label="Sizes (Optional)" control={control} options={sizeOptions} disabled={sizeOptions?.length === 0} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CustomSelect
            label="Status (Optional)"
            name="status"
            control={control}
            options={[
              {
                label: "Visible",
                value: "visible"
              },
              {
                label: "Hidden",
                value: "hidden"
              }
            ]}           
            blankOption={false}
          />
          <CustomSelect
            label="Stock Status (Optional)"
            name="stockStatus"
            control={control}
            options={stockStatusOptions}
            blankOption={false}
            />
          <CustomInput
            label="Discount (Optional)"
            name="discount"
            type="text"
            control={control}
            placeholder="Enter discount"
          />
        </div>
     

        <CustomQuilEditor
          label="Short Introduction"
          name="introduction"
          control={control}
          height={40}
          placeholder="Write a short intro..."
        />
        <CustomQuilEditor
          label="Description"
          name="description"
          control={control}
          height={250}
          placeholder="Write a description..."
        />
                  
        <button
          type="submit"
          className="w-full flex justify-center items-center gap-x-2 bg-primary hover:bg-[#2b4773] cursor-pointer text-white py-2 rounded-md font-semibold transition-colors duration-100"
        >
          {isLoading ? (
            <>
              <CgSpinnerTwo className="animate-spin" fontSize={16} />
              Processing...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </form>
    </>
  );
};

export default UpdateProductForm;
