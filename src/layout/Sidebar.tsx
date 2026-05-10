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
import { useLanguage } from "../context/LanguageContext";



type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
};

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
    name: "System setting",
    path: "/settings",
  },
];

const Sidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
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
              className={`menu-item group ${isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
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
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );


  const { language } = useLanguage()
  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 start-0 bg-white/80 backdrop-blur-xl dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-e border-r border-gray-200
        ${isExpanded || isMobileOpen
          ? "w-[290px]"
          : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen
          ? "translate-x-0"
          : language === "ar"
            ? "translate-x-full"
            : "-translate-x-full"
        }
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex items-center ${!isExpanded && !isHovered
            ? "lg:justify-center"
            : "justify-start gap-3"
          }`}
      >
        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg">
          <span className="text-xl font-bold text-white">B2B</span>
        </div>

        {(isExpanded || isHovered || isMobileOpen) && (
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
              {renderMenuItems(navItems)}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
