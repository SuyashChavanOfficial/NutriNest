import { Link } from "react-router-dom";

export const Signin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] relative overflow-hidden">
      <div className="absolute w-72 h-72 bg-[#22C55E]/20 blur-3xl rounded-full top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-[#3B82F6]/20 blur-3xl rounded-full bottom-10 right-10"></div>

      <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl shadow-xl p-8 w-[350px] z-10">
        <h1 className="text-2xl font-semibold text-white text-center mb-6">
          Sign In
        </h1>

        <form className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-3 py-2 rounded-lg bg-[#111827] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-1 px-3 py-2 rounded-lg bg-[#111827] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            />
          </div>

          <button
            type="submit"
            className="mt-4 py-2 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white font-medium transition-all duration-300 shadow-lg shadow-green-500/20"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-gray-400 text-center mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-[#8B5CF6] hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};
