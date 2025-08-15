/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "../form/CustomInput";
import { CgSpinnerTwo } from "react-icons/cg";
import type { z } from "zod";
import CustomSelect from "../form/CustomSelect";
import CustomQuilEditor from "../form/CustomQuilEditor";
import { useEffect, useState } from "react";
import { createProductValidationSchema } from "../../schemas/product.schema";
import ProductImageField from "./ProductImageField";
import { stockStatusOptions } from "../../data/product.data";
import { ErrorToast } from "../../helper/ValidationHelper";
import { categoryOptions } from "../../data/category.data";
import { useAppSelector } from "../../redux/hooks/hooks";
import { useGetBrandDropDownQuery } from "../../redux/features/brand/brandApi";
import { useGetFlavorDropDownQuery } from "../../redux/features/flavor/flavorApi";

type TFormValues = z.infer<typeof createProductValidationSchema>;


const CreateProductForm = () => {
  //const navigate = useNavigate();
  const isLoading = false;
  useGetBrandDropDownQuery(undefined);
  useGetFlavorDropDownQuery(undefined);
  //useGetCategoryDropDownQuery(undefined);
  //const { categoryOptions } = useAppSelector((state) => state.category);
  const { brandOptions } = useAppSelector((state) => state.brand);
  const { flavorOptions } = useAppSelector((state) => state.flavor);
  const [selectedFile, setSelectedFile] = useState<File|null>(null)
  //const [createProduct, { isLoading, isSuccess }] = useCreateProductMutation();
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
  

  // useEffect(() => {
  //   if (!isLoading && isSuccess) {
  //     navigate("/products")
  //   }
  // }, [isLoading, isSuccess, navigate])


  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    const { ...rest } = data;

    if (!selectedFile) {
      ErrorToast("Upload image")
    } else {

      const formData = new FormData();
      Object.keys(rest).forEach((key) => {
        const value = rest[key as keyof typeof rest];
        if (value !== undefined && value !== null) {
          formData.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
        }
      });

      formData.append("image", selectedFile);
      //createProduct(formData);
    }
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
          />
          <CustomSelect
            label="Brand"
            name="brandId"
            control={control}
            options={brandOptions}
            disabled={brandOptions.length === 0}
          />
          <CustomSelect
            label="Flavor"
            name="flavorId"
            control={control}
            options={flavorOptions}
            disabled={flavorOptions.length === 0}
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

        <ProductImageField selectedFile={selectedFile} setSelectedFile={setSelectedFile}/>
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
