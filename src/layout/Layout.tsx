import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router";
import Header from "./Header";
import Backdrop from "./Backdrop";
import Sidebar from "./Sidebar";

const LayoutContent: React.FC = () => {
  const { isExpanded, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 xl:flex  transition-transition-[background-color,color,border-color,box-shadow] duration-600 ease-in-out">
      <div>
        <Sidebar />
        <Backdrop />
      </div>
      <div
  className={`flex-1 transition-all duration-300 ease-in-out ${
    isExpanded ? "lg:ms-[260px]" : "lg:ms-[72px]"
  } ${isMobileOpen ? "ms-0" : ""}`}
>
        <Header />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const Layout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default Layout;