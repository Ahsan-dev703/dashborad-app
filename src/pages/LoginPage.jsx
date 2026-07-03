import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/features/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    console.log(data);
    login(); // Flips the global switch to true
    navigate("/");
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-900 text-gray-100 relative overflow-hidden">
      <div className="relative z-10 w-full max-w-md p-8 bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-2xl border border-gray-700 shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="text"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-3 bg-gray-700 bg-opacity-50 rounded-lg border border-gray-600 text-white"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-3 bg-gray-700 bg-opacity-50 rounded-lg border border-gray-600 text-white"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          >
            LogIn
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
