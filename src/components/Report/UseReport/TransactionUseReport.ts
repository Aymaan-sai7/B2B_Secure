import { useEffect, useMemo, useState } from "react";
import Papa from "papaparse";
import { enqueueSnackbar } from "notistack";
import api from "../../../services/axios";


export interface TransactionReportRow {
  ID: string;
  Sender: string;
  Receiver: string;
  Status: string;
  "AI Status": string;
  "AI Risk Score": string;
  Date: string;
}


export default function useTransactionReport(isOpen: boolean) {
  const [rows, setRows]       = useState<TransactionReportRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [csvText, setCsvText] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const fetchReport = async () => {
      try {
        setLoading(true);
        const res = await api.get("/admin/reports/transactions/export", { responseType: "text" });
        setCsvText(res.data);
        Papa.parse<TransactionReportRow>(res.data, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => { setRows(results.data); },
        });
      } catch (err) {
        console.log(err);
        enqueueSnackbar("Failed to load report", { variant: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [isOpen]);

  const stats = useMemo(() => ({
    total:      rows.length,
    completed:  rows.filter((r) => r.Status === "completed").length,
    pending:    rows.filter((r) => r.Status === "pending").length,
    failed:     rows.filter((r) => r.Status === "failed").length,
    aiApproved: rows.filter((r) => r["AI Status"].toLowerCase().includes("approved")).length,
    aiRejected: rows.filter((r) => r["AI Status"].toLowerCase().includes("rejected")).length,
    highRisk:   rows.filter((r) => Number(r["AI Risk Score"]) >= 65).length,
  }), [rows]);

  const handleDownloadCSV = () => {
    const blob = new Blob([csvText], { type: "text/csv" });
    const url  = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href  = url;
    link.setAttribute("download", "transactions_report.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    enqueueSnackbar("CSV downloaded", { variant: "success" });
  };

  const handleDownloadPDF = () => {
    const { total, completed, pending, failed, highRisk } = stats;
    const printContent = `
      <html>
        <head>
          <title>Transactions Report</title>
          <style>
            body { font-family: sans-serif; padding: 24px; color: #12033A; }
            h1 { font-size: 20px; margin-bottom: 8px; }
            h2 { font-size: 14px; color: #9B9B9F; margin-bottom: 16px; font-weight: normal; }
            .stats { display: flex; gap: 12px; margin-bottom: 24px; flex-wrap: wrap; }
            .stat { background: #F1F3FA; padding: 12px 16px; border-radius: 8px; min-width: 100px; }
            .stat-value { font-size: 22px; font-weight: bold; }
            .stat-label { font-size: 11px; color: #9B9B9F; }
            table { width: 100%; border-collapse: collapse; font-size: 12px; }
            th { background: #F1F3FA; padding: 8px 10px; text-align: left; font-size: 10px; text-transform: uppercase; color: #9B9B9F; }
            td { padding: 7px 10px; border-bottom: 1px solid #E7E6EB; }
          </style>
        </head>
        <body>
          <h1>Transactions Report</h1>
          <h2>Generated ${new Date().toLocaleDateString("en-GB")}</h2>
          <div class="stats">
            <div class="stat"><div class="stat-value">${total}</div><div class="stat-label">Total</div></div>
            <div class="stat"><div class="stat-value" style="color:#04BE7B">${completed}</div><div class="stat-label">Completed</div></div>
            <div class="stat"><div class="stat-value" style="color:#E2AE21">${pending}</div><div class="stat-label">Pending</div></div>
            <div class="stat"><div class="stat-value" style="color:#FF4951">${failed}</div><div class="stat-label">Failed</div></div>
            <div class="stat"><div class="stat-value" style="color:#FF4951">${highRisk}</div><div class="stat-label">High Risk</div></div>
          </div>
          <table>
            <thead>
              <tr><th>#</th><th>Sender</th><th>Receiver</th><th>Status</th><th>AI Status</th><th>Risk Score</th><th>Date</th></tr>
            </thead>
            <tbody>
              ${rows.map((r, i) => `
                <tr>
                  <td>${i + 1}</td>
                  <td>${r.Sender}</td>
                  <td>${r.Receiver}</td>
                  <td>${r.Status}</td>
                  <td>${r["AI Status"].replace(/[✅❌]/g, "").trim()}</td>
                  <td>${r["AI Risk Score"]}</td>
                  <td>${r.Date}</td>
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

  return { rows, loading, csvText, stats, handleDownloadCSV, handleDownloadPDF };
}