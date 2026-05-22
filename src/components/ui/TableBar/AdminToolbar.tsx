import { Search, Filter, Plus, FileText } from "lucide-react";
import { Dropdown } from "../Dropdown";
import { DropdownItem } from "../DropdownItem";
import { useTranslation } from "react-i18next";

type SortType = "all" | "name" | "date";

interface Props {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  isFilterOpen: boolean;
  onFilterClick: () => void;
  closeFilterDropdown: () => void;
  activeSort: SortType;
  onSort: (value: SortType) => void;
  onAddClick: () => void;
  onReportClick: () => void;

}

export default function AdminToolbar({
  searchTerm,
  setSearchTerm,
  isFilterOpen,
  onFilterClick,
  closeFilterDropdown,
  activeSort,
  onSort,
  onAddClick,
  onReportClick,
}: Props) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap items-center gap-2">

      {/* Search */}
      <div className="relative w-full sm:w-48">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9B9B9F]" />
        <input
          type="text"
          placeholder={t("search")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
          <span className="hidden sm:inline">{t("filter")}: {activeSort}</span>
        </button>

        <Dropdown
          isOpen={isFilterOpen}
          onClose={closeFilterDropdown}
          className="
  absolute z-10 mt-2
  left-1/2 -translate-x-[60%]
  sm:left-auto sm:right-0 sm:translate-x-0
  w-[260px] sm:w-44
  flex flex-col gap-0.5
  rounded-xl border border-[#E7E6EB]
  dark:border-[#5C5C5C]
  bg-[#FFFFFF] dark:bg-[#1E1E1E]
  p-1.5 shadow-lg
">
          {(["all", "name", "date"] as SortType[]).map((sort) => (
            <DropdownItem
              key={sort}
              onClick={() => { onSort(sort); closeFilterDropdown(); }}
              className={`px-3 py-2 rounded-lg text-sm transition capitalize ${activeSort === sort
                ? "bg-[#DBDDFF] text-[#12033A] font-medium"
                : "text-[#12033A] dark:text-[#EDEDED] hover:bg-[#F1F3FA] dark:hover:bg-white/5"
                }`}
            >
              {sort === "all" ? t("all") : sort === "name" ? t("name") : t("date")}
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
      {/* Add Admin */}
      <button
        onClick={onAddClick}
        className="inline-flex items-center gap-1.5 rounded-lg bg-[#12033A] px-3 py-2 text-sm text-white hover:bg-[#1e0a5e] transition-colors"
      >
        <Plus size={15} />
        <span className="hidden sm:inline">{t("addAdmin")}</span>
      </button>

    </div>
  );
}