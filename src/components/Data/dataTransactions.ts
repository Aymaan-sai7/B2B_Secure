export interface transaction {
  id: number;
  date: string; // تاريخ الإنشاء للـ transaction
  senderCompany: string;
  receiverCompany: string;
  state: string;
  amountSend: number;
  productType: string;
  product: string;
  transactionDate: string;
  companyWorkingHours: string;
  action: string;
  status: "Completed" | "Pending" | "Failed";

}




export const transactions: transaction[] = [
  {
    id: 1,
    date: "Mar 21, 2026",
    senderCompany: "Microsoft",
    receiverCompany: "Google",
    state: "Completed",
    amountSend: 15000,
    productType: "Software",
    product: "Office 365",
    transactionDate: "Mar 20, 2026",
    companyWorkingHours: "9:00 - 18:00",
        status: "Completed",
    action: "icons",

  },
  {
    id: 2,
    date: "Mar 22, 2026",
    senderCompany: "Apple",
    receiverCompany: "Amazon",
    state: "Pending",
    amountSend: 25000,
    productType: "Hardware",
    product: "iPhone 14",
    transactionDate: "Mar 21, 2026",
    companyWorkingHours: "8:00 - 17:00",
        status: "Completed",
action: "icons",
  },
  {
    id: 3,
    date: "Mar 23, 2026",
    senderCompany: "Tesla",
    receiverCompany: "SpaceX",
    state: "Completed",
    amountSend: 50000,
    productType: "Vehicle",
    product: "Model S",
    transactionDate: "Mar 22, 2026",
    companyWorkingHours: "10:00 - 19:00",
        status: "Pending",
action: "icons",
  },
  {
    id: 4,
    date: "Mar 24, 2026",
    senderCompany: "Netflix",
    receiverCompany: "Hulu",
    state: "Cancelled",
    amountSend: 8000,
    productType: "Subscription",
    product: "Streaming Plan",
    transactionDate: "Mar 23, 2026",
    companyWorkingHours: "9:30 - 18:30",
        status: "Completed",
action: "icons",
  },
  {
    id: 5,
    date: "Mar 25, 2026",
    senderCompany: "Adobe",
    receiverCompany: "Canva",
    state: "Completed",
    amountSend: 12000,
    productType: "Software",
    product: "Photoshop",
    transactionDate: "Mar 24, 2026",
    companyWorkingHours: "8:30 - 17:30",
        status: "Pending",
action: "icons",
  },
  {
    id: 6,
    date: "Mar 26, 2026",
    senderCompany: "Intel",
    receiverCompany: "AMD",
    state: "Pending",
    amountSend: 30000,
    productType: "Hardware",
    product: "CPU Chips",
    transactionDate: "Mar 25, 2026",
    companyWorkingHours: "9:00 - 18:00",
        status: "Pending",
action: "icons",
  },
  {
    id: 7,
    date: "Mar 27, 2026",
    senderCompany: "Spotify",
    receiverCompany: "Apple Music",
    state: "Completed",
    amountSend: 7000,
    productType: "Subscription",
    product: "Premium Plan",
    transactionDate: "Mar 26, 2026",
    companyWorkingHours: "10:00 - 19:00",
        status: "Failed",
action: "icons",
  },
  {
    id: 8,
    date: "Mar 28, 2026",
    senderCompany: "IBM",
    receiverCompany: "Oracle",
    state: "Completed",
    amountSend: 45000,
    productType: "Software",
    product: "Database License",
    transactionDate: "Mar 27, 2026",
    companyWorkingHours: "9:00 - 18:00",
        status: "Completed",
action: "icons",
  },
  {
    id: 9,
    date: "Mar 29, 2026",
    senderCompany: "Meta",
    receiverCompany: "Snapchat",
    state: "Pending",
    amountSend: 18000,
    productType: "Advertising",
    product: "Ad Campaign",
    transactionDate: "Mar 28, 2026",
    companyWorkingHours: "8:00 - 17:00",
        status: "Completed",
action: "icons",
  },
  {
    id: 10,
    date: "Mar 30, 2026",
    senderCompany: "Amazon",
    receiverCompany: "eBay",
    state: "Completed",
    amountSend: 22000,
    productType: "E-commerce",
    product: "Logistics Service",
    transactionDate: "Mar 29, 2026",
    companyWorkingHours: "9:30 - 18:30",
        status: "Failed",
action: "icons",
  },
];