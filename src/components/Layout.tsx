import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 ml-64"> {/* Add ml-64 here */}
        {/* Top Bar */}
        <TopBar setSidebarOpen={setSidebarOpen} />

        {/* Page Content */}
        <main className="flex-1 pt-0 px-6 pb-6 overflow-y-auto mt-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

