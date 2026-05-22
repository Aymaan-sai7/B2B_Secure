import { Dropdown } from "../ui/Dropdown";
import { DropdownItem } from "../ui/DropdownItem";
import { useState, useEffect } from "react";
import api from "../../services/axios";

type Notification = {
  id: number;
  title: string;
  time: string;
  isRead: boolean;
};
interface NotificationApiResponse {
  id: number;
  title: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const closeDropdown = () => setIsOpen(false);
  const markAllAsRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  const handleDelete    = (id: number) => setNotifications((prev) => prev.filter((n) => n.id !== id));

  const handleOpen = () => {
    toggleDropdown();
    markAllAsRead();
  };

  useEffect(() => {
  const fetchNotifications = async () => {
    try {
      const res = await api.get("/admin/notifications");
      console.log(res.data);
      const formatted: Notification[] = res.data.data.map(
        (n: NotificationApiResponse) => ({
          id: n.id,
          title: n.title || n.message,
          time: new Date(n.created_at).toLocaleString(),
          isRead: n.is_read,
        })
      );
      setNotifications(formatted);
    } 
    catch (err) {
      console.log(err);
    }
  };
  fetchNotifications();
}, []);

  return (
    <div className="relative">
      <button
        aria-label="Notifications"
        onClick={handleOpen}
        className="relative flex items-center justify-center w-11 h-11 rounded-full border border-gray-200 bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
      >
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold leading-none">
            {unreadCount}
          </span>
        )}
        <svg className="fill-current" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M10.75 2.29248C10.75 1.87827 10.4143 1.54248 10 1.54248C9.58583 1.54248 9.25004 1.87827 9.25004 2.29248V2.83613C6.08266 3.20733 3.62504 5.9004 3.62504 9.16748V14.4591H3.33337C2.91916 14.4591 2.58337 14.7949 2.58337 15.2091C2.58337 15.6234 2.91916 15.9591 3.33337 15.9591H4.37504H15.625H16.6667C17.0809 15.9591 17.4167 15.6234 17.4167 15.2091C17.4167 14.7949 17.0809 14.4591 16.6667 14.4591H16.375V9.16748C16.375 5.9004 13.9174 3.20733 10.75 2.83613V2.29248ZM14.875 14.4591V9.16748C14.875 6.47509 12.6924 4.29248 10 4.29248C7.30765 4.29248 5.12504 6.47509 5.12504 9.16748V14.4591H14.875ZM8.00004 17.7085C8.00004 18.1228 8.33583 18.4585 8.75004 18.4585H11.25C11.6643 18.4585 12 18.1228 12 17.7085C12 17.2943 11.6643 16.9585 11.25 16.9585H8.75004C8.33583 16.9585 8.00004 17.2943 8.00004 17.7085Z" fill="currentColor" />
        </svg>
      </button>
      {/* ── Dropdown ── */}
      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute -right-[240px] lg:right-0 mt-[17px] w-[350px] sm:w-[361px] rounded-2xl border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <h5 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Notifications</h5>
            {notifications.length > 0 && (
              <span className="text-xs text-gray-400 dark:text-gray-500">({notifications.length})</span>
            )}
          </div>
          <button
            aria-label="Close notifications"
            onClick={closeDropdown}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <svg className="fill-current" width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z" fill="currentColor" />
            </svg>
          </button>
        </div>

        <ul className="flex flex-col max-h-[380px] overflow-y-auto custom-scrollbar divide-y divide-gray-100 dark:divide-gray-800">
          {notifications.length === 0 ? (
            <li className="flex flex-col items-center justify-center py-12 text-center">
              <svg className="w-8 h-8 text-gray-300 dark:text-gray-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <p className="text-sm text-gray-400 dark:text-gray-500">No notifications</p>
            </li>
          ) : (
            notifications.map((item) => (
              <li key={item.id}>
                <DropdownItem>
                  <div className={`flex items-start justify-between gap-3 px-4 py-3 transition-colors ${!item.isRead ? "bg-blue-50/50 dark:bg-white/[0.03]" : ""}`}>
                    {/* Dot + text */}
                    <div className="flex items-start gap-2.5 flex-1 min-w-0">
                      <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${!item.isRead ? "bg-[#0047FF]" : "bg-transparent"}`} />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[#12033A] dark:text-white leading-snug">
                          {item.title}
                        </p>
                        <span className="text-xs text-[#12033A] dark:text-gray-400 mt-0.5 block">
                          {item.time}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                      aria-label="Dismiss notification"
                      className="flex-shrink-0 text-gray-300 hover:text-red-400 dark:text-gray-600 dark:hover:text-red-400 transition-colors mt-0.5"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </DropdownItem>
              </li>
            ))
          )}
        </ul>
      </Dropdown>
    </div>
  );
}