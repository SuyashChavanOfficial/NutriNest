import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export const Dashboard = () => {
  return (
    <div className="w-full flex items-start">
      <Sidebar />
      <div className="ml-64 w-[calc(100%-16rem)]">
        <Outlet />
      </div>
    </div>
  );
};
