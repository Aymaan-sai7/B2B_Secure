



export type AdminRole = "Admin" | "Moderator" | "User" | "Support"|"Admin Management";

// Define the TypeScript interface for the table rows
export interface AdminType {
  id: number; // Unique identifier for each product
  name: string; // Product name
  createAt: string; // Number of variants (e.g., "1 Variant", "2 Variants")
  email: string; // Category of the product
  role: AdminRole;
  action: string;
}

// Define the table data using the interface
export const tableData: AdminType[] = [
  {
    id: 1,
    name: "Ahmed Hassan",
    createAt: "Sep 9, 2025",
    email: "ahmed.hassan@gmail.com",
    role: "Admin",
    action: "icons",
  },
  {
    id: 2,
    name: "Mohamed Ali",
    createAt: "Aug 21, 2025",
    email: "mohamed.ali@gmail.com",
    role: "Admin Management",
    action: "icons",
  },
  {
    id: 3,
    name: "Omar Khaled",
    createAt: "Jul 14, 2025",
    email: "omar.khaled@gmail.com",
    role: "Moderator",
    action: "icons",
  },
  {
    id: 4,
    name: "Youssef Ibrahim",
    createAt: "Jun 30, 2025",
    email: "youssef.ibrahim@gmail.com",
    role: "Admin",
    action: "icons",
  },
  {
    id: 5,
    name: "Mahmoud Adel",
    createAt: "May 18, 2025",
    email: "mahmoud.adel@gmail.com",
    role: "Support",
    action: "icons",
  },
  {
    id: 6,
    name: "Karim Mostafa",
    createAt: "Apr 12, 2025",
    email: "karim.mostafa@gmail.com",
    role: "User",
    action: "icons",
  },
  {
    id: 7,
    name: "Hassan Tarek",
    createAt: "Mar 5, 2025",
    email: "hassan.tarek@gmail.com",
    role: "User",
    action: "icons",
  },];