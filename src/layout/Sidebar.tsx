import { useCallback } from "react";
import { Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  Building2,
  CreditCard,
  Shield,
  Settings,
} from "lucide-react";
import { useSidebar } from "../context/SidebarContext";
import { useAdmin } from "../context/AdminContext";
import { isSuperAdmin } from "../permissions/permissions";
import { NavItem } from "../interfaces/Sidebar";


const navItems: NavItem[] = [
  { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/" },
  { name: "Companies", icon: <Building2 size={20} />, path: "/companies" },
  { name: "Transactions", icon: <CreditCard size={20} />, path: "/transactions" },
  { name: "Admin Management", icon: <Shield size={20} />, path: "/admins" },
  { name: "System Setting", icon: <Settings size={20} />, path: "/settings" },
];


const Sidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, toggleMobileSidebar } = useSidebar();
  const location = useLocation();
  const { admin } = useAdmin();

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  const handleLinkClick = () => {
    if (isMobileOpen) toggleMobileSidebar();
  };

  const filteredNavItems = navItems.filter((item) => {
    if (item.path === "/admins") {
      return admin && isSuperAdmin(admin.roles);
    }
    return true;
  });

  const expanded = isExpanded || isMobileOpen;

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={toggleMobileSidebar}
        />
      )}

      <aside
        className={`
    fixed top-0 start-0 h-screen z-50 flex flex-col
    layout-surface
    border-r
    transition-all duration-300 ease-in-out
    ${expanded ? "w-[260px]" : "w-[72px]"}
    ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
  `}
      >
        <div className={`py-4 px-4 flex items-center gap-3 ${!expanded ? "justify-center" : ""}`}>
          <div className="flex-shrink-0 w-10 h-10 rounded-xl overflow-hidden">
            <img src="/images/icon-1.png" alt="Aegis" className="w-full h-full object-contain" />
          </div>
          {expanded && (
            <div>
              <h1 className="text-sm font-bold text-[#12033A] dark:text-[#F3F4F6] leading-tight">Aegis</h1>
              <span className="text-xs text-[#9B9B9F]">Admin Dashboard</span>
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto no-scrollbar px-3 py-4">
          <ul className="flex flex-col gap-1">
            {filteredNavItems.map((nav) => {
              const active = isActive(nav.path!);
              return (
                <li key={nav.name}>
                  <Link
                    to={nav.path!}
                    onClick={handleLinkClick}
                    title={!expanded ? nav.name : undefined}
                    className={`
                      flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium
                      transition-colors duration-150
                      ${active
                        ? "bg-[#12033A] text-white dark:bg-white dark:text-[#12033A]"
                        : "text-[#9B9B9F] hover:bg-[#F1F3FA] hover:text-[#12033A] dark:hover:bg-white/5 dark:hover:text-[#F3F4F6]"
                      }
                      ${!expanded ? "justify-center" : ""}
                    `}
                  >
                    <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                      {nav.icon}
                    </span>

                    {expanded && (
                      <span className="truncate">{nav.name}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

      </aside>
    </>
  );
};

export default Sidebar;