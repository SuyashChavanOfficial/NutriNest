import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    age: "",
    height: "",
    weight: "",
    gender: "",
  });

  const getUser = async () => {
    const res = await api.get("/edit_profile");

    setFormData({
      ...res.data.user,
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.patch("/edit_profile", {
        user: formData,
      });

      sessionStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/profile");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Edit Profile
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400">First Name</label>
                <input
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Last Name</label>
                <input
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Age</label>
                <input
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-400">Height (cm)</label>
                <input
                  name="height"
                  type="number"
                  value={formData.height}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Weight (kg)</label>
                <input
                  name="weight"
                  type="number"
                  value={formData.weight}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Email</label>
                <input
                  value={formData.email}
                  disabled
                  className="input opacity-60 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Password</label>
                <input
                  value="********"
                  disabled
                  className="input opacity-60 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="flex-1 py-3 rounded-xl border border-white/10 text-white hover:bg-white/10 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white font-medium transition"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
