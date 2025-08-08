import LoginForm from "../../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <>
      <div className="w-full max-w-lg bg-white py-6 lg:py-24 px-4 md:px-6 shadow-md rounded-md">
        <h2 className="text-3xl md:text-3xl font-bold mb-6 text-title text-center">
          Login to Account
        </h2>
        {/* Login Form */}
        <LoginForm />
      </div>
    </>
  );
};

export default LoginPage;
