

import { Dropdown } from "../Dropdown";
import { DropdownItem } from "../DropdownItem";


import { Search, Filter, FileText, Plus } from "lucide-react";

type SortType = "all" | "state" | "Company-name" | "date";

interface Props {
    search: string;
    setSearch: (value: string) => void;

    onFilterClick: () => void;
    activeSort: SortType;

    isFilterOpen: boolean;
    closeFilterDropdown: () => void;
    onSort: (value: SortType) => void;

    onReportClick: () => void;
    onAddClick: () => void;
}

export default function CompanyToolbar({
    search,
    setSearch,
    onFilterClick,
    activeSort,
    isFilterOpen,
    closeFilterDropdown,
    onSort,
    onReportClick,
    onAddClick,
}: Props) {
    return (
        <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
                <Search size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm font-medium text-gray-700 shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:placeholder:text-gray-500"/>
            </div>

            {/* Filter */}
            <div className="relative">
                <button onClick={onFilterClick}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                    <Filter size={18} />
                    
                    Filter: {activeSort}
                    
                </button>

                <Dropdown
                    isOpen={isFilterOpen}
                    onClose={closeFilterDropdown}
                    className="absolute right-0 mt-2 w-48 flex flex-col gap-1 rounded-xl border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-800"
                >
                    <DropdownItem
                        onClick={() => { onSort("all"); closeFilterDropdown(); }}
                        className={`px-3 py-2 rounded-lg transition hover:bg-gray-100 ${activeSort === "all" ? "bg-gray-100 font-semibold" : ""
                            }`}
                    >
                        All
                    </DropdownItem>

                    <DropdownItem
                        onClick={() => { onSort("state"); closeFilterDropdown(); }}
                        className={`px-3 py-2 rounded-lg transition hover:bg-gray-100 ${activeSort === "state" ? "bg-gray-100 font-semibold" : ""
                            }`}
                    >
                        State
                    </DropdownItem>

                    <DropdownItem
                        onClick={() => { onSort("Company-name"); closeFilterDropdown(); }}
                        className={`px-3 py-2 rounded-lg transition hover:bg-gray-100 ${activeSort === "Company-name" ? "bg-blue-100 text-blue-700 font-semibold" : ""
                            }`}
                    >
                        Company-Name
                    </DropdownItem>

                    <DropdownItem
                        onClick={() => { onSort("date"); closeFilterDropdown(); }}
                        className={`px-3 py-2 rounded-lg transition hover:bg-gray-100 ${activeSort === "date" ? "bg-gray-100 font-semibold" : ""
                            }`}
                    >
                        Date
                    </DropdownItem>
                </Dropdown>
            </div>

            {/* Report */}
            <button onClick={onReportClick}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                <FileText size={18} /> Report
            </button>

            {/* Add */}
            <button onClick={onAddClick}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                <Plus size={18} /> Add Company
            </button>
        </div>
    );
}