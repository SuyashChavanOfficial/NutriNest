import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

export const Signup = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    height: "",
    age: "",
    weight: "",
    gender: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/signup", formData);

      const { token, user } = response.data;

      if (token) {
        sessionStorage.setItem("token", token);
      }

      if (user) {
        sessionStorage.setItem("user", JSON.stringify(user));
      }

      navigate("/");
    } catch (err) {
      console.error(err);

      if (err.response?.data?.errors) {
        setError(err.response.data.errors[0]);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] relative overflow-hidden">
      <div className="absolute w-72 h-72 bg-[#22C55E]/20 blur-3xl rounded-full top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-[#3B82F6]/20 blur-3xl rounded-full bottom-10 right-10"></div>

      <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl shadow-xl p-8 w-[380px] z-10">
        <h1 className="text-2xl font-semibold text-white text-center mb-6">
          Sign Up
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-300">First Name *</label>
              <input
                type="text"
                name="first_name"
                placeholder="First name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="w-full mt-1 px-3 py-2 rounded-lg bg-[#111827] border border-gray-700 text-white"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">Last Name *</label>
              <input
                type="text"
                name="last_name"
                placeholder="Last name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="w-full mt-1 px-3 py-2 rounded-lg bg-[#111827] border border-gray-700 text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-300">Email *</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 rounded-lg bg-[#111827] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Password *</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 rounded-lg bg-[#111827] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-sm text-gray-300">Height</label>
              <input
                type="number"
                name="height"
                placeholder="cm"
                value={formData.height}
                onChange={handleChange}
                className="w-full mt-1 px-2 py-2 rounded-lg bg-[#111827] border border-gray-700 text-white"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">Age</label>
              <input
                type="number"
                name="age"
                placeholder="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full mt-1 px-2 py-2 rounded-lg bg-[#111827] border border-gray-700 text-white"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">Weight</label>
              <input
                type="number"
                name="weight"
                placeholder="kg"
                value={formData.weight}
                onChange={handleChange}
                className="w-full mt-1 px-2 py-2 rounded-lg bg-[#111827] border border-gray-700 text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-300">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-[#111827] border border-gray-700 text-white"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 py-2 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white font-medium transition-all duration-300 shadow-lg shadow-green-500/20"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-gray-400 text-center mt-6">
          Already have an account?{" "}
          <Link to="/signin" className="text-[#8B5CF6] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
