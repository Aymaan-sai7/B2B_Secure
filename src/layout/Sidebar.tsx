import { useCallback } from "react";
import { Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  Building2,
  CreditCard,
  Shield,
  Settings
} from "lucide-react";
import { useSidebar } from "../context/SidebarContext";
import { useAdmin } from "../context/AdminContext";
import { isSuperAdmin } from "../permissions/permissions";
import { NavItem } from "../interfaces/Sidebar";


const navItems: NavItem[] = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard />,
    path: "/",
  },
  {
    icon: <Building2 />,
    name: "Companies",
    path: "/companies",
  },
  {
    icon: <CreditCard />,
    name: "Transactions",
    path: "/transactions",
  },
  {
    icon: <Shield />,
    name: "Admin Management",
    path: "/admins",
  },
  {
    icon: <Settings />,
    name: "System Setting",
    path: "/settings",
  },
];

const Sidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, } = useSidebar();
  const location = useLocation();

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  const renderMenuItems = (items: NavItem[]) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav) => (
        <li key={nav.name}>
          {nav.path && (
            <Link
              to={nav.path}
              className={`menu-item group ${isActive(nav.path) ? "menu-item-active dark:menu-item-active-dark" : "menu-item-inactive"
                }`}
            >
              <span
                className={`menu-item-icon-size ${isActive(nav.path)
                  ? "menu-item-icon-active"
                  : "menu-item-icon-inactive"
                  }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );

  const { admin } = useAdmin();
  const filteredNavItems = navItems.filter((item) => {
    if (item.path === "/admins") {
      return admin && isSuperAdmin(admin.roles);
    }
    return true;
  });
  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 start-0 h-screen
bg-[#FFFFFF]/90 backdrop-blur-xl dark:bg-[#101010]/90 dark:border-[#5C5C5C]
text-gray-900 border-e border-r border-[#E7E6EB]
transition-transform duration-300

${isExpanded ? "w-[290px]" : "w-[90px]"}

${isMobileOpen
  ? "translate-x-0"
  : "-translate-x-full lg:translate-x-0"
}
`}
      onMouseEnter={() => !isExpanded}
    >
      <div
        className={`py-8 flex items-center ${!isExpanded
          ? "lg:justify-center"
          : "justify-start gap-3"
          }`}
      >
        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg">
          <span className="text-xl font-bold text-white">B2B</span>
        </div>

        {(isExpanded || isMobileOpen) && (
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              B2B Secure
            </h1>

            <span className="text-xs text-gray-500 dark:text-gray-400">
              Admin Dashboard
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              {renderMenuItems(filteredNavItems)}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
