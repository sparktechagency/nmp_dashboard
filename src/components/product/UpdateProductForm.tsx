/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAppSelector } from "../../redux/hooks/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "../form/CustomInput";
import type { z } from "zod";
import CustomSelect from "../form/CustomSelect";
import CustomQuilEditor from "../form/CustomQuilEditor";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateProductValidationSchema } from "../../schemas/product.schema";
import { useUpdateProductMutation } from "../../redux/features/product/productApi";
import { useGetCategoryDropDownQuery } from "../../redux/features/category/categoryApi";

import { stockStatusOptions } from "../../data/product.data";
import type { ISingleProduct } from "../../types/product.type";
import { useGetBrandDropDownQuery } from "../../redux/features/brand/brandApi";
import { useGetFlavorDropDownQuery } from "../../redux/features/flavor/flavorApi";
import FormButton from "../form/FormButton";

type TFormValues = z.infer<typeof updateProductValidationSchema>;

type TProps = {
    product: ISingleProduct
}

const UpdateProductForm = ({ product }: TProps) => {
  const navigate = useNavigate();
  useGetBrandDropDownQuery(undefined);
  useGetFlavorDropDownQuery(undefined);
  useGetCategoryDropDownQuery(undefined);
  const { categoryOptions } = useAppSelector((state) => state.category);
  const { brandOptions } = useAppSelector((state) => state.brand);
  const { flavorOptions } = useAppSelector((state) => state.flavor);
  const [ updateProduct, { isLoading, isSuccess }] = useUpdateProductMutation();
  const { handleSubmit, control, watch, trigger } = useForm({
    resolver: zodResolver(updateProductValidationSchema),
      defaultValues: {
          name: product?.name,
          categoryId: product?.categoryId,
          brandId: product?.brandId,
          flavorId: product?.flavorId,
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
      brandId: data.brandId,
      flavorId: data.flavorId,
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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
            blankOption={false}
          />
          <CustomSelect
            label="Brand"
            name="brandId"
            control={control}
            options={brandOptions}
            disabled={brandOptions.length === 0}
            blankOption={false}
          />
          <CustomSelect
            label="Flavor"
            name="flavorId"
            control={control}
            options={flavorOptions}
            disabled={flavorOptions.length === 0}
            blankOption={false}
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
          label="Description"
          name="description"
          control={control}
          height={250}
          placeholder="Write a description..."
        />
        <FormButton isLoading={isLoading}>Save Changes</FormButton>
      </form>
    </>
  );
};

export default UpdateProductForm;
