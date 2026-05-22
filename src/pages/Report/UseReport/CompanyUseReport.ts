import { useEffect, useMemo, useState } from "react";
import Papa from "papaparse";
import { enqueueSnackbar } from "notistack";

import api from "../../../services/axios";

export interface CompanyReportRow {
  ID: string;
  Name: string;
  Email: string;
  Industry: string;
  "Is Verified": string;
  "Is Approved": string;
  "Is Active": string;
  "Date Registered": string;
}

export default function useCompanyReport(isOpen: boolean) {
  const [rows, setRows] = useState<CompanyReportRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [csvText, setCsvText] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    const fetchReport = async () => {
      try {
        setLoading(true);
        const res = await api.get("/admin/reports/companies/export",{ responseType: "text" });
        setCsvText(res.data);
        Papa.parse<CompanyReportRow>(res.data, {header: true,skipEmptyLines: true,complete: (results) => {setRows(results.data);},
        });
      } 
      catch (err) {
        console.log(err);
        enqueueSnackbar("Failed to load report", {variant: "error",});
      } 
      finally {setLoading(false);}
    };
    fetchReport();
  }, [isOpen]);

  const stats = useMemo(() => {
    const total = rows.length;
    const approved = rows.filter(
        (r) => r["Is Approved"] === "Yes"
    ).length;
    const pending = rows.filter(
      (r) => r["Is Approved"] === "No"
    ).length;
    const active = rows.filter(
      (r) => r["Is Active"] === "Yes"
    ).length;
    const verified = rows.filter(
      (r) => r["Is Verified"] === "Yes"
    ).length;
    return {total,approved,pending,active,verified,
    };
  }, [rows]);
   const handleDownloadCSV = () => {
    const blob = new Blob([csvText], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "companies_report.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    enqueueSnackbar("CSV downloaded", { variant: "success" });
  };

   const handleDownloadPDF = () => {
    const printContent = `
      <html>
        <head>
          <title>Companies Report</title>
          <style>
            body { font-family: sans-serif; padding: 24px; color: #12033A; }
            h1 { font-size: 20px; margin-bottom: 16px; }
            .stats { display: flex; gap: 16px; margin-bottom: 24px; }
            .stat { background: #F1F3FA; padding: 12px 16px; border-radius: 8px; }
            .stat-value { font-size: 24px; font-weight: bold; }
            .stat-label { font-size: 12px; color: #9B9B9F; }
            table { width: 100%; border-collapse: collapse; font-size: 13px; }
            th { background: #F1F3FA; padding: 8px 12px; text-align: left; font-size: 11px; text-transform: uppercase; color: #9B9B9F; }
            td { padding: 8px 12px; border-bottom: 1px solid #E7E6EB; }
          </style>
        </head>
        <body>
          <h1>Companies Report</h1>
          <div class="stats">
            <div class="stat"><div class="stat-value">${stats.total}</div><div class="stat-label">Total</div></div>
            <div class="stat"><div class="stat-value" style="color:#04BE7B">${stats.approved}</div><div class="stat-label">Approved</div></div>
            <div class="stat"><div class="stat-value" style="color:#E2AE21">${stats.pending}</div><div class="stat-label">Pending</div></div>
            <div class="stat"><div class="stat-value" style="color:#0047FF">${stats.active}</div><div class="stat-label">Active</div></div>
          </div>
          <table>
            <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Industry</th><th>Approved</th><th>Verified</th><th>Date</th></tr></thead>
            <tbody>
              ${rows.map((r, i) => `
                <tr>
                  <td>${i + 1}</td>
                  <td>${r.Name}</td>
                  <td>${r.Email}</td>
                  <td>${r.Industry || "-"}</td>
                  <td>${r["Is Approved"]}</td>
                  <td>${r["Is Verified"]}</td>
                  <td>${r["Date Registered"]}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(printContent);
    win.document.close();
    win.print();
  };
  return {rows,loading,csvText,stats,handleDownloadCSV,handleDownloadPDF,
  };
}