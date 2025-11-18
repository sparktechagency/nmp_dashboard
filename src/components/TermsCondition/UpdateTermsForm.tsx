import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CgSpinnerTwo } from "react-icons/cg";
import type { z } from "zod";
import { policySchema } from "../../schemas/policy.schema";
import { useCreateUpdatePolicyMutation } from "../../redux/features/policy/policyApi";
import React, { Suspense } from "react";
import PolicyJoditLoading from "../loader/PolicyJoditLoading";
const CustomQuilEditor = React.lazy(() => import("../form/CustomQuilEditor"));


type TFormValues = z.infer<typeof policySchema>;
type TProps = {
  description: string;
}

const UpdateTermsForm = ({ description }: TProps) => {
  const [createUpdatePolicy, { isLoading }] = useCreateUpdatePolicyMutation();
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(policySchema),
    defaultValues: {
      description
    }
  });


  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    createUpdatePolicy({
      type: "terms-condition",
      content: data.description
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Suspense fallback={<PolicyJoditLoading />}>
          <CustomQuilEditor
            label="Description"
            name="description"
            control={control}
            height={550}
            placeholder="Write a description..."
          />
        </Suspense>
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
            "Save Change"
          )}
        </button>
      </form>
    </>
  );
};

export default UpdateTermsForm;
