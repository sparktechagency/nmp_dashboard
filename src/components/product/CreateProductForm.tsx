/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "../form/CustomInput";
import type { z } from "zod";
import CustomSelect from "../form/CustomSelect";
import CustomQuilEditor from "../form/CustomQuilEditor";
import { useEffect, useState } from "react";
import { createProductValidationSchema } from "../../schemas/product.schema";
import ProductImageField from "./ProductImageField";
import { ErrorToast } from "../../helper/ValidationHelper";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { useGetBrandDropDownQuery } from "../../redux/features/brand/brandApi";
import { useGetFlavorDropDownQuery } from "../../redux/features/flavor/flavorApi";
import { useGetCategoryDropDownQuery } from "../../redux/features/category/categoryApi";
import { useCreateProductMutation } from "../../redux/features/product/productApi";
import { useNavigate } from "react-router-dom";
import FormButton from "../form/FormButton";
import { useGetTypeDropDownQuery } from "../../redux/features/type/typeApi";
import { SetBrandOptions } from "../../redux/features/brand/brandSlice";
import { SetFlavorOptions } from "../../redux/features/flavor/flavorSlice";
import { SetCategoryOptions } from "../../redux/features/category/categorySlice";
import type { IBrand } from "../../types/brand.type";
import type { ICategory } from "../../types/category.type";
import type { IFlavor } from "../../types/flavor.type";

type TFormValues = z.infer<typeof createProductValidationSchema>;


const CreateProductForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useGetTypeDropDownQuery(undefined);
  const { typeOptions } = useAppSelector((state) => state.type);
  const { categoryOptions } = useAppSelector((state) => state.category);
  const { brandOptions } = useAppSelector((state) => state.brand);
  const { flavorOptions } = useAppSelector((state) => state.flavor);
  const [selectedFile, setSelectedFile] = useState<File|null>(null)
  const [createProduct, { isLoading, isSuccess }] = useCreateProductMutation();
  const { handleSubmit, control, watch, trigger,setValue } = useForm({
    resolver: zodResolver(createProductValidationSchema),
  });

  const typeId = watch("typeId")

  const { data:brandData } = useGetBrandDropDownQuery(typeId, { skip: !typeId});
  const { data: flavorData } = useGetFlavorDropDownQuery(typeId, { skip: !typeId});
  const { data:categoryData } = useGetCategoryDropDownQuery(typeId, { skip: !typeId});

  //set categoryOptions, brandOptions, flavorOptions
  useEffect(() => {
    if(!typeId){
      dispatch(SetBrandOptions([]))
      dispatch(SetCategoryOptions([]))
      dispatch(SetFlavorOptions([]))
      setValue("categoryId", "");
      setValue("brandId", "");
      setValue("flavorId", "");
      return
    }
    if (brandData?.data && flavorData?.data && categoryData?.data) {
      //brandOptions
      const bOptions = brandData?.data?.map((b: IBrand) => ({
        value: b._id,
        label: b.name,
      }))
      dispatch(SetBrandOptions(bOptions))

      //categoryOptions
      const cOptions = categoryData?.data?.map((c: ICategory) => ({
        value: c._id,
        label: c.name,
      }))
      dispatch(SetCategoryOptions(cOptions));

      //flavorOptions
      const fOptions = flavorData?.data?.map((f: IFlavor) => ({
        value: f._id,
        label: f.name,
      }))
      dispatch(SetFlavorOptions(fOptions))
    }
  }, [brandData, flavorData, categoryData, dispatch, typeId, setValue]);

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
      createProduct(formData);
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
            label="Type"
            name="typeId"
            control={control}
            options={typeOptions}
            disabled={typeOptions.length === 0}
          />
          <CustomSelect
            label="Category"
            name="categoryId"
            control={control}
            options={categoryOptions}
            disabled={categoryOptions.length === 0}
          />
          <CustomSelect
            label="Brand(Optional)"
            name="brandId"
            control={control}
            options={brandOptions}
            disabled={brandOptions.length === 0}
          />
          <CustomSelect
            label="Flavor(Flavor)"
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
          <CustomInput
            label="Quantity"
            name="quantity"
            type="text"
            control={control}
            placeholder="Enter quantity"
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
        <FormButton isLoading={isLoading}>Add Product</FormButton>
      </form>
    </>
  );
};

export default CreateProductForm;
