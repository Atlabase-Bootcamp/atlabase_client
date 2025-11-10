import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="flex">
      <Outlet />
    </div>
  );
}

export default DashboardLayout;
