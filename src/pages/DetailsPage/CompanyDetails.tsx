import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { getCompanyByIdAPI, approveCompanyAPI } from "../../services/CompanyServices";
import { CompanyApiResponse } from "../../interfaces/Company";


function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#E7E6EB] dark:border-[#5C5C5C] last:border-0">
      <span className="text-sm text-[#9B9B9F]">{label}</span>
      <span className="text-sm font-medium text-[#12033A] dark:text-[#EDEDED]">{value}</span>
    </div>
  );
}


export default function CompanyDetails() {
  const { id }   = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState<CompanyApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        const data = await getCompanyByIdAPI(Number(id));
        setCompany(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCompany();
  }, [id]);

  const handleApprove = async () => {
    if (!company) return;
    try {
      await approveCompanyAPI(company.id);
      setCompany((prev) => prev ? { ...prev, is_approved: true } : prev);
      enqueueSnackbar("Company Approved", { variant: "success" });
    } catch (err) {
      console.log(err);
      enqueueSnackbar("Approve Failed", { variant: "error" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFFFF] dark:bg-[#101010]">
        <div className="w-8 h-8 border-2 border-[#12033A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-3">
        <span className="text-4xl">🏢</span>
        <p className="text-sm text-[#9B9B9F]">Company not found</p>
        <button onClick={() => navigate(-1)} className="text-xs text-[#0047FF] hover:underline">Go back</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-[#9B9B9F] hover:text-[#12033A] dark:hover:text-[#F3F4F6] mb-6 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
        Back to companies
      </button>

      <div className="bg-[#FFFFFF] dark:bg-white/[0.03] border border-[#E7E6EB] dark:border-[#5C5C5C] rounded-2xl overflow-hidden">

        {/* header */}
        <div className="px-6 py-5 border-b border-[#E7E6EB] dark:border-[#5C5C5C] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#12033A] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              {company.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-[#9B9B9F] mb-0.5">Company #{company.id}</p>
              <h2 className="text-lg font-semibold text-[#12033A] dark:text-[#F3F4F6]">{company.name}</h2>
            </div>
          </div>
          <span style={{
            backgroundColor: company.is_approved ? "#D8FFF1" : "#FFFCF1",
            color: company.is_approved ? "#04BE7B" : "#E2AE21",
          }} className="px-2.5 py-1 rounded-full text-xs font-semibold">
            {company.is_approved ? "Approved" : "Pending"}
          </span>
        </div>

        {/* details */}
        <div className="px-6 py-2">
          <Row label="Company ID"   value={`#${company.id}`} />
          <Row label="Email"        value={<a href={`mailto:${company.email}`} className="text-[#0047FF] hover:underline">{company.email}</a>} />
          <Row label="Industry"     value={company.industry || "-"} />
          <Row label="Address"      value={company.address  || "-"} />
          <Row label="Transactions" value={company.tx_count} />
          <Row label="Total amount" value={`$${company.tx_total_amount}`} />
          <Row label="Verified"     value={
            company.is_verified
              ? <span className="text-[#04BE7B] text-xs font-medium">Verified</span>
              : <span className="text-[#FF4951] text-xs font-medium">Not verified</span>
          } />
          <Row label="Active"       value={
            company.is_active
              ? <span className="text-[#04BE7B] text-xs font-medium">Active</span>
              : <span className="text-[#9B9B9F] text-xs font-medium">Inactive</span>
          } />
          <Row label="Registered"   value={new Date(company.created_at).toLocaleDateString("en-GB")} />
        </div>
      </div>

      {/* Pending - approved */}
      {!company.is_approved && (
        <div className="mt-4 rounded-2xl border border-[#E2AE21] bg-[#FFFCF1] dark:bg-[#2A2412] dark:border-[#E2AE21]/40 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-[#E2AE21]">Company Pending Approval</h3>
              <p className="mt-1 text-sm text-[#E2AE21]/80">This company is waiting for administrator approval.</p>
            </div>
            <button
              onClick={handleApprove}
              className="px-4 py-2 rounded-xl bg-[#12033A] text-white text-sm hover:bg-[#1e0a5e] transition-colors whitespace-nowrap"
            >
              Approve
            </button>
          </div>
        </div>
      )}

    </div>
  );
}