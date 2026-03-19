import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("user"));
  const token = sessionStorage.getItem("token");

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/signin");
  };

  if (!token) {
    navigate("/signin");
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0F172A] px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="flex flex-col items-center gap-4">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#22C55E] via-[#3B82F6] to-[#8B5CF6] blur opacity-70 group-hover:opacity-100 transition duration-500"></div>

                <div className="relative w-36 h-36 rounded-full p-1 bg-[#0F172A]">
                  <img
                    src={
                      user?.profilePic ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user?.first_name[0] + user?.last_name[0] || "User",
                      )}&background=22C55E&color=ffffff&size=256`
                    }
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover border-2 border-white/10"
                  />
                </div>
              </div>

              <p className="text-xs text-gray-400">{user?.username}</p>
            </div>

            <div className="flex-1 w-full">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-white">
                  {user?.first_name} {user?.last_name}
                </h2>
                <p className="text-gray-400 text-sm mt-1">{user?.email}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-gray-400">First Name</p>
                  <p className="text-white font-medium">
                    {user?.first_name || "N/A"}
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-gray-400">Last Name</p>
                  <p className="text-white font-medium">
                    {user?.last_name || "N/A"}
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-gray-400">Age</p>
                  <p className="text-white font-medium">{user?.age || "N/A"}</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-gray-400">Weight (kg)</p>
                  <p className="text-white font-medium">
                    {user?.weight || "N/A"}
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-gray-400">Height (cm)</p>
                  <p className="text-white font-medium">
                    {user?.height || "N/A"}
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-gray-400">Email</p>
                  <p className="text-white font-medium break-all">
                    {user?.email || "N/A"}
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4 md:col-span-2">
                  <p className="text-gray-400">Password</p>
                  <p className="text-white font-medium">********</p>
                </div>
              </div>

              <div className="mt-8 flex flex-col md:flex-row gap-4">
                <button
                  onClick={() => navigate("/edit-profile")}
                  className="flex-1 py-3 rounded-xl bg-[#3B82F6] hover:bg-blue-600 text-white font-medium transition-all duration-300"
                >
                  Edit Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition-all duration-300"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
