import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export const Dashboard = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <div className="w-full flex items-start relative">
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
      />

      {/* Overlay (mobile only) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="w-full md:ml-64">
        <Outlet />
      </div>
    </div>
  );
};
