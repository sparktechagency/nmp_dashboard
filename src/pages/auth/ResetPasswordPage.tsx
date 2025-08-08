import ResetPasswordForm from "../../components/auth/ResetPasswordForm";

const ResetPasswordPage = () => {
  return (
    <>
      <div className="w-full max-w-md bg-white py-6 lg:py-24 px-4 md:px-6 shadow-md rounded-md">
        <h2 className=" text-2xl sm:text-3xl md:text-3xl font-bold  text-title mb-2">
          Set a New Password
        </h2>
        <p className="text-gray-600 mb-6">
          Enter your new password below to regain access to your account.
        </p>

        <ResetPasswordForm />
      </div>
    </>
  );
};

export default ResetPasswordPage;
