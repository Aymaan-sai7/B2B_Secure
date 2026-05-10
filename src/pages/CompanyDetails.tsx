
import { useParams } from "react-router-dom";
import { companiesData, CompanyType } from "../components/Data/dataCompanies";
import { useNavigate } from "react-router-dom";

function StatusBadge({ status }: { status: CompanyType["status"] }) {
  const styles = {
    Completed: "bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
    Pending:   "bg-yellow-50 text-yellow-700 border border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800",
    Failed:    "bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
  };
  const icons = { Completed: "✓", Pending: "⏳", Failed: "✕" };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      <span>{icons[status]}</span>
      {status}
    </span>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
      <span className="text-sm font-medium text-gray-800 dark:text-white">{value}</span>
    </div>
  );
}

export default function CompanyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const companyId = Number(id);
  const company: CompanyType | undefined = companiesData.find((c) => c.id === companyId);

  if (!company) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-3">
        <span className="text-4xl">🏢</span>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Company not found</p>
        <button
          onClick={() => navigate(-1)}
          className="text-xs text-[#12033A] dark:text-indigo-400 underline underline-offset-2"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mb-6 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
        Back to companies
      </button>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.03] overflow-hidden">

        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-xl bg-[#12033A] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              {company.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-0.5">
                Company #{company.id}
              </p>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                {company.name}
              </h2>
            </div>
          </div>
          <StatusBadge status={company.status} />
        </div>

        <div className="px-6 py-2">
          <Row label="Company ID" value={`#${company.id}`} />
          <Row label="Email address" value={
            <a href={`mailto:${company.email}`} className="text-[#12033A] dark:text-indigo-400 hover:underline">
              {company.email}
            </a>
          } />
          <Row label="Registered date" value={company.date} />
          <Row label="Status" value={<StatusBadge status={company.status} />} />
        </div>

      </div>
    </div>
  );
}










// import { useParams } from "react-router-dom";
// import { companiesData, CompanyType } from "../components/Data/dataCompanies";


// export default function CompanyDetails() {
//   const { id } = useParams();

//   const companyId = Number(id);

//   const company: CompanyType | undefined = companiesData.find(
//     (c) => c.id === companyId
//   );

//   if (!company) {
//     return <div className="p-6">Company not found</div>;
//   }

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Companies Details</h2>

//       <table className="w-full table-auto border-collapse">
//         <tbody className="space-y-2">
//         <tr className="border-b">
//                         <td className="font-semibold py-2">Company Name:</td>
//                         <td className="py-2 text-right">{company.name}</td>
//                     </tr>

//           <tr className="border-b">
//             <td className="font-semibold py-2">ID:</td>
//             <td className="py-2 text-right">{company.id}</td>
//           </tr>

//           <tr className="border-b">
//             <td className="font-semibold py-2">Email:</td>
//             <td className="py-2 text-right">{company.email}</td>
//           </tr>

//           <tr className="border-b">
//             <td className="font-semibold py-2">Date:</td>
//             <td className="py-2 text-right">{company.date}</td>
//           </tr>

//           <tr className="border-b">
//             <td className="font-semibold py-2">Status:</td>
//             <td className="py-2 text-right">
//               <span
//                 className={
//                   company.status === "Completed"
//                     ? "text-green-600"
//                     : company.status === "Pending"
//                       ? "text-yellow-500"
//                       : "text-red-600"
//                 }
//               >
//                 {company.status}
//               </span>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }