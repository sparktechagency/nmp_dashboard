/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
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
import type { ISingleProduct } from "../../types/product.type";
import { useGetBrandDropDownQuery } from "../../redux/features/brand/brandApi";
import { useGetFlavorDropDownQuery } from "../../redux/features/flavor/flavorApi";
import FormButton from "../form/FormButton";
import { SetBrandOptions } from "../../redux/features/brand/brandSlice";
import { SetCategoryOptions } from "../../redux/features/category/categorySlice";
import { SetFlavorOptions } from "../../redux/features/flavor/flavorSlice";
import type { IBrand } from "../../types/brand.type";
import type { ICategory } from "../../types/category.type";
import type { IFlavor } from "../../types/flavor.type";
import { useGetTypeDropDownQuery } from "../../redux/features/type/typeApi";

type TFormValues = z.infer<typeof updateProductValidationSchema>;

type TProps = {
    product: ISingleProduct
}

const UpdateProductForm = ({ product }: TProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useGetTypeDropDownQuery(undefined);
  const { typeOptions } = useAppSelector((state) => state.type);
  const { categoryOptions } = useAppSelector((state) => state.category);
  const { brandOptions } = useAppSelector((state) => state.brand);
  const { flavorOptions } = useAppSelector((state) => state.flavor);
  const [ updateProduct, { isLoading, isSuccess }] = useUpdateProductMutation();
  const { handleSubmit, control, watch, trigger, setValue } = useForm({
    resolver: zodResolver(updateProductValidationSchema),
      defaultValues: {
          name: product?.name,
          typeId: product?.typeId,
          categoryId: product?.categoryId,
          brandId: product?.brandId,
          flavorId: product?.flavorId,
          currentPrice: String(product.currentPrice),
          originalPrice: String(product.originalPrice),
          quantity: String(product.quantity),
          discount: product?.discount,
          status: product?.status,
          description: product?.description
      }
  });

   const typeId = watch("typeId");
  
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
    const finalValues: Record<string, unknown> = {
      name: data.name,
      typeId: data.typeId,
      categoryId: data.categoryId,
      brandId: data.brandId,
      flavorId: data.flavorId,
      currentPrice: data.currentPrice,
      quantity: data.quantity,
      status: data?.status,
      description: data?.description
    }

    //check optional fields
    if(!data.brandId){
      finalValues.brandId=null
    }

    if(!data.flavorId){
      finalValues.flavorId=null
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
            label="Brand (Optional)"
            name="brandId"
            control={control}
            options={brandOptions}
            disabled={brandOptions.length === 0}
          />
          <CustomSelect
            label="Flavor (Optional)"
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
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
