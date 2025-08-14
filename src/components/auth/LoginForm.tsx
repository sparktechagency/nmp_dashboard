
import { Link, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAppSelector } from "../../redux/hooks/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/auth.schema";
import type { z } from "zod";
import CustomInput from "../form/CustomInput";
import Error from "../validation/Error";
import { CgSpinnerTwo } from "react-icons/cg";

type TFormValues = z.infer<typeof loginSchema>

const LoginForm = () => {
  const isLoading = false;
  //const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { LoginError } = useAppSelector((state) => state.auth);
  //const [login, { isLoading }] = useLoginMutation();
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(loginSchema),
  });



    const onSubmit: SubmitHandler<TFormValues> = () => {
      //dispatch(SetLoginError(""))
      //login(data)
      navigate("/")
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

        <button type="submit" className="w-full flex justify-center items-center gap-x-2 bg-primary hover:bg-primary/80 cursor-pointer text-white py-2 rounded-md font-semibold transition-colors duration-100">
          {isLoading ? (
            <>
              <CgSpinnerTwo className="animate-spin" fontSize={16} />
              Processing...
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </>
  );
};

export default LoginForm;
