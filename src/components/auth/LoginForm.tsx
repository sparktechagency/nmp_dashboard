
import { Link } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/auth.schema";
import type { z } from "zod";
import CustomInput from "../form/CustomInput";
import Error from "../validation/Error";
import { SetLoginError } from "../../redux/features/auth/authSlice";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import FormButton from "../form/FormButton";

type TFormValues = z.infer<typeof loginSchema>

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { LoginError } = useAppSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(loginSchema),
  });



  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    dispatch(SetLoginError(""))
    login(data)
  };
 

  return (
    <>
     {LoginError && <Error message={LoginError} />}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <CustomInput label="Email" name="email" type="text" control={control} placeholder="Enter email address"/>
        <CustomInput label="Password" name="password" type="password" control={control} placeholder="Enter your password"/>
        <div className="flex justify-between items-center">
          <label className="flex items-center text-sm">
            <input type="checkbox" className="mr-2 cursor-pointer" /> Remember
            me
          </label>
          <Link
            to="/auth/forgot-password"
            className="text-sm text-[#3AB0FF] hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <FormButton isLoading={isLoading}>Sign In</FormButton>
      </form>
    </>
  );
};

export default LoginForm;
