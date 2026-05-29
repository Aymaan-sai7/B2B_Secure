import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import api from "../../../services/axios";

export interface SummaryReportData {
  companies: {
    total: number;
    active: number;
    suspended: number;
    approved: number;
    pending: number;
  };
  transactions: {
    total: number;
    completed: number;
    pending: number;
    failed: number;
    blocked: number;
    total_volume: number;
  };
  admins: {
    total: number;
    super_admins: number;
    regular_admins: number;
  };
  ai_analysis: {
    pending_scans: number;
    failed_scans: number;
    scanned: number;
  };
  fraud_detection: {
    fraud: number;
    suspicious: number;
    clean: number;
  };
  monthly_transactions: Record<string, number>;
}

export default function useSummaryReport(isOpen: boolean) {
  const [data, setData]     = useState<SummaryReportData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await api.get("/admin/reports/summary");
        setData(res.data.data);
      } catch (err) {
        console.log(err);
        enqueueSnackbar("Failed to load report", { variant: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [isOpen]);

  const handleDownloadPDF = (d: SummaryReportData) => {
    const printContent = `
      <html>
        <head>
          <title>Summary Report</title>
          <style>
            body { font-family: sans-serif; padding: 24px; color: #12033A; }
            h1 { font-size: 20px; margin-bottom: 4px; }
            h2 { font-size: 13px; color: #9B9B9F; margin-bottom: 20px; font-weight: normal; }
            .section { margin-bottom: 24px; }
            .section-title { font-size: 11px; text-transform: uppercase; color: #9B9B9F; margin-bottom: 10px; letter-spacing: 0.05em; }
            .grid { display: flex; gap: 10px; flex-wrap: wrap; }
            .stat { background: #F1F3FA; padding: 12px 16px; border-radius: 8px; min-width: 100px; }
            .stat-value { font-size: 22px; font-weight: bold; }
            .stat-label { font-size: 11px; color: #9B9B9F; }
          </style>
        </head>
        <body>
          <h1>Summary Report</h1>
          <h2>Generated ${new Date().toLocaleDateString("en-GB")}</h2>

          <div class="section">
            <div class="section-title">Companies</div>
            <div class="grid">
              <div class="stat"><div class="stat-value">${d.companies.total}</div><div class="stat-label">Total</div></div>
              <div class="stat"><div class="stat-value" style="color:#04BE7B">${d.companies.approved}</div><div class="stat-label">Approved</div></div>
              <div class="stat"><div class="stat-value" style="color:#E2AE21">${d.companies.pending}</div><div class="stat-label">Pending</div></div>
              <div class="stat"><div class="stat-value" style="color:#FF4951">${d.companies.suspended}</div><div class="stat-label">Suspended</div></div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Transactions</div>
            <div class="grid">
              <div class="stat"><div class="stat-value">${d.transactions.total}</div><div class="stat-label">Total</div></div>
              <div class="stat"><div class="stat-value" style="color:#04BE7B">${d.transactions.completed}</div><div class="stat-label">Completed</div></div>
              <div class="stat"><div class="stat-value" style="color:#E2AE21">${d.transactions.pending}</div><div class="stat-label">Pending</div></div>
              <div class="stat"><div class="stat-value" style="color:#FF4951">${d.transactions.failed}</div><div class="stat-label">Failed</div></div>
              <div class="stat"><div class="stat-value">$${d.transactions.total_volume.toLocaleString()}</div><div class="stat-label">Volume</div></div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Fraud Detection</div>
            <div class="grid">
              <div class="stat"><div class="stat-value" style="color:#04BE7B">${d.fraud_detection.clean}</div><div class="stat-label">Clean</div></div>
              <div class="stat"><div class="stat-value" style="color:#E2AE21">${d.fraud_detection.suspicious}</div><div class="stat-label">Suspicious</div></div>
              <div class="stat"><div class="stat-value" style="color:#FF4951">${d.fraud_detection.fraud}</div><div class="stat-label">Fraud</div></div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Admins</div>
            <div class="grid">
              <div class="stat"><div class="stat-value">${d.admins.total}</div><div class="stat-label">Total</div></div>
              <div class="stat"><div class="stat-value">${d.admins.super_admins}</div><div class="stat-label">Super Admins</div></div>
              <div class="stat"><div class="stat-value">${d.admins.regular_admins}</div><div class="stat-label">Regular Admins</div></div>
            </div>
          </div>
        </body>
      </html>
    `;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(printContent);
    win.document.close();
    win.print();
  };

  return { data, loading, handleDownloadPDF };
}