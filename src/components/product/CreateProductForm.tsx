/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAppSelector } from "../../redux/hooks/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "../form/CustomInput";
import { CgSpinnerTwo } from "react-icons/cg";
import type { z } from "zod";
import CustomSelect from "../form/CustomSelect";
import CustomQuilEditor from "../form/CustomQuilEditor";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProductValidationSchema } from "../../schemas/product.schema";
import { useCreateProductMutation } from "../../redux/features/product/productApi";
import { useGetCategoryDropDownQuery } from "../../redux/features/category/categoryApi";
import { useGetColorDropDownQuery } from "../../redux/features/color/colorApi";
import { useGetSizesQuery } from "../../redux/features/size/sizeApi";
import ProductImageField from "./ProductImageField";
import { stockStatusOptions } from "../../data/product.data";
import { ErrorToast } from "../../helper/ValidationHelper";

type TFormValues = z.infer<typeof createProductValidationSchema>;


const CreateProductForm = () => {
  const navigate = useNavigate();
  useGetCategoryDropDownQuery(undefined);
  useGetColorDropDownQuery(undefined);
  useGetSizesQuery(undefined);
  const { categoryOptions } = useAppSelector((state) => state.category);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [createProduct, { isLoading, isSuccess }] = useCreateProductMutation();
  const { handleSubmit, control, watch, trigger, } = useForm({
    resolver: zodResolver(createProductValidationSchema),
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
    const { ...rest } = data;

    if (selectedFiles?.length === 0) {
      ErrorToast("Select minimum one image")
    } else {

      const formData = new FormData();
      Object.keys(rest).forEach((key) => {
        const value = rest[key as keyof typeof rest];
        if (value !== undefined && value !== null) {
          formData.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
        }
      });
      selectedFiles.forEach((file) => formData.append("image", file));
      createProduct(formData);
    }
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

        <ProductImageField selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles}/>
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
          />
          <CustomSelect
            label="Stock Status (Optional)"
            name="stockStatus"
            control={control}
            options={stockStatusOptions}
            />
          <CustomInput
            label="Discount (Optional)"
            name="discoun"
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
            "Add Product"
          )}
        </button>
      </form>
    </>
  );
};

export default CreateProductForm;
