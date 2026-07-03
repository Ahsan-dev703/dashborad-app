import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-900 text-gray-100 text-center px-4">
      <h1 className="text-8xl font-extrabold text-red-500 mb-2">404</h1>
      <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
      <p className="text-gray-400 mb-8">
        The page you are looking for does not exist.
      </p>

      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFoundPage;
