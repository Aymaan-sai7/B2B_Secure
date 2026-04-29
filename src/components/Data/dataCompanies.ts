export interface CompanyType {
  id: number;
  name: string;
  date: string;
  email: string;
  status: "Completed" | "Pending" | "Failed";
    action: string;

}

export const companiesData: CompanyType[] = [
  {
    id: 1,
    name: "Apple",
    date: "Sep 11, 2025",
    email: "contact@apple.com",
    status: "Completed",
        action: "icons",

  },
  {
    id: 2,
    name: "Amazon",
    date: "Sep 12, 2025",
    email: "support@amazon.com",
    status: "Failed",
        action: "icons", },
  {
    id: 3,
    name: "Meta",
    date: "Sep 13, 2025",
    email: "info@meta.com",
    status: "Pending",
        action: "icons",
  },
  {
    id: 4,
    name: "Netflix",
    date: "Sep 14, 2025",
    email: "hello@netflix.com",
    status: "Completed",
        action: "icons", },
  {
    id: 5,
    name: "Tesla",
    date: "Sep 15, 2025",
    email: "contact@tesla.com",
    status: "Completed",
        action: "icons",
  },
  {
    id: 6,
    name: "Adobe",
    date: "Sep 16, 2025",
    email: "support@adobe.com",
    status: "Completed",
        action: "icons", },
  {
    id: 7,
    name: "Spotify",
    date: "Sep 17, 2025",
    email: "team@spotify.com",
    status: "Completed",
        action: "icons",
  },
  {
    id: 8,
    name: "Intel",
    date: "Sep 18, 2025",
    email: "info@intel.com",
    status: "Completed",
        action: "icons", },
  {
    id: 9,
    name: "IBM",
    date: "Sep 19, 2025",
    email: "contact@ibm.com",
    status: "Completed",
        action: "icons",
  },
  {
    id: 10,
    name: "Oracle",
    date: "Sep 20, 2025",
    email: "hello@oracle.com",
    status: "Completed",
        action: "icons", },
];