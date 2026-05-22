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
    <div className="flex flex-wrap items-center gap-2">
      {/* Search */}
      <div className="relative w-full sm:w-48">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9B9B9F]" />
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-[#E7E6EB] dark:border-[#5C5C5C] bg-[#FFFFFF] dark:bg-white/[0.03] py-2 pl-9 pr-3 text-sm text-[#12033A] dark:text-[#EDEDED] placeholder:text-[#9B9B9F] focus:outline-none focus:border-[#12033A] dark:focus:border-[#F3F4F6] transition-colors"
        />
      </div>
      {/* Filter */}
      <div className="relative">
        <button
          onClick={onFilterClick}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#E7E6EB] dark:border-[#5C5C5C] bg-[#FFFFFF] dark:bg-white/[0.03] px-3 py-2 text-sm text-[#12033A] dark:text-[#EDEDED] hover:bg-[#F1F3FA] dark:hover:bg-white/5 transition-colors"
        >
          <Filter size={15} />
          <span className="hidden sm:inline">Filter: {activeSort}</span>
        </button>
        <Dropdown
          isOpen={isFilterOpen}
          onClose={closeFilterDropdown}
          className="
  absolute z-10 mt-2
  left-1/2 -translate-x-[70%]
  sm:left-auto sm:right-0 sm:translate-x-0
  w-[260px] sm:w-44
  flex flex-col gap-0.5
  rounded-xl border border-[#E7E6EB]
  dark:border-[#5C5C5C]
  bg-[#FFFFFF] dark:bg-[#1E1E1E]
  p-1.5 shadow-lg
">
          {(["all", "state", "Company-name", "date"] as SortType[]).map((sort) => (
            <DropdownItem
              key={sort}
              onClick={() => { onSort(sort); closeFilterDropdown(); }}
              className={`px-3 py-2 rounded-lg text-sm transition capitalize ${activeSort === sort
                  ? "bg-[#DBDDFF] text-[#12033A] font-medium"
                  : "text-[#12033A] dark:text-[#EDEDED] hover:bg-[#F1F3FA] dark:hover:bg-white/5"
                }`}
            >
              {sort === "all" ? "All" : sort === "state" ? "State" : sort === "Company-name" ? "Name" : "Date"}
            </DropdownItem>
          ))}
        </Dropdown>
      </div>
      {/* Report */}
      <button
        onClick={onReportClick}
        className="inline-flex items-center gap-1.5 rounded-lg border border-[#E7E6EB] dark:border-[#5C5C5C] bg-[#FFFFFF] dark:bg-white/[0.03] px-3 py-2 text-sm text-[#12033A] dark:text-[#EDEDED] hover:bg-[#F1F3FA] dark:hover:bg-white/5 transition-colors"
      >
        <FileText size={15} />
        <span className="hidden sm:inline">Report</span>
      </button>
      {/* Add Company */}
      <button
        onClick={onAddClick}
        className="inline-flex items-center gap-1.5 rounded-lg bg-[#12033A] px-3 py-2 text-sm text-white hover:bg-[#1e0a5e] transition-colors"
      >
        <Plus size={15} />
        <span className="hidden sm:inline">Add Company</span>
      </button>
    </div>
  );
}