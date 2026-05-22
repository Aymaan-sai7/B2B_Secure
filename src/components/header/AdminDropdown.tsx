import { useState } from "react";
import { DropdownItem } from "../ui/DropdownItem";
import { Dropdown } from "../ui/Dropdown";
import { logout } from "../../services/authService";
import { useAdmin } from "../../context/AdminContext";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { admin } = useAdmin();
  if (!admin) return null;
  const getInitial = (name: string) => { return name.charAt(0).toUpperCase();};

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  function handleLogout() {
    logout();
    window.location.href = "/login";
  }

  return (
    <div className="relative">

      {/*dropdown */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 text-[#12033A] dark:text-[#EDEDED]"
      >
        <div className="w-8 h-8 rounded-lg bg-[#12033A] flex items-center justify-center text-white text-sm font-semibold">
          {getInitial(admin.name)}
        </div>
        <span className="hidden sm:block text-sm font-medium">
          {admin?.name}
        </span>
        <svg
          className={`transition-transform duration-200 text-[#9B9B9F] ${isOpen ? "rotate-180" : ""}`}
          width="16"
          height="16"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[17px] w-[240px] rounded-2xl border border-[#E7E6EB] bg-[#FFFFFF] shadow-theme-lg dark:border-[#5C5C5C] dark:bg-gray-dark"
      >
        <div className="px-4 py-3 border-b border-[#E7E6EB] dark:border-[#5C5C5C]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#12033A] flex items-center justify-center text-white font-semibold flex-shrink-0">
                        {getInitial(admin.name)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#12033A] dark:text-[#F3F4F6] truncate">
                {admin?.name}
              </p>
              <p className="text-xs text-[#9B9B9F] truncate">
                {admin?.email}
              </p>
            </div>
          </div>
        </div>

        <ul className="p-2">
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              to="/profile"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#12033A] dark:text-[#EDEDED] hover:bg-[#F1F3FA] dark:hover:bg-white/5 transition-colors"
            >
              <svg className="w-4 h-4 text-[#9B9B9F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </DropdownItem>
          </li>
        </ul>
        <div className="p-2 border-t border-[#E7E6EB] dark:border-[#5C5C5C]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#FF4951] hover:bg-[#FEDEDF] dark:hover:bg-[#2A1719] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign out
          </button>
        </div>
      </Dropdown>
    </div>
  );
}