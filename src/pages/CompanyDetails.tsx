import { useParams } from "react-router-dom";
import { companiesData, CompanyType } from "../components/Data/dataCompanies";


export default function CompanyDetails() {
  const { id } = useParams();

  const companyId = Number(id);

  const company: CompanyType | undefined = companiesData.find(
    (c) => c.id === companyId
  );

  if (!company) {
    return <div className="p-6">Company not found</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Companies Details</h2>

      <table className="w-full table-auto border-collapse">
        <tbody className="space-y-2">
        <tr className="border-b">
                        <td className="font-semibold py-2">Company Name:</td>
                        <td className="py-2 text-right">{company.name}</td>
                    </tr>

          <tr className="border-b">
            <td className="font-semibold py-2">ID:</td>
            <td className="py-2 text-right">{company.id}</td>
          </tr>

          <tr className="border-b">
            <td className="font-semibold py-2">Email:</td>
            <td className="py-2 text-right">{company.email}</td>
          </tr>

          <tr className="border-b">
            <td className="font-semibold py-2">Date:</td>
            <td className="py-2 text-right">{company.date}</td>
          </tr>

          <tr className="border-b">
            <td className="font-semibold py-2">Status:</td>
            <td className="py-2 text-right">
              <span
                className={
                  company.status === "Completed"
                    ? "text-green-600"
                    : company.status === "Pending"
                      ? "text-yellow-500"
                      : "text-red-600"
                }
              >
                {company.status}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}