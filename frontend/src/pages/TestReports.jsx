import { useState } from "react";
import {
  Search,
  FileText,
  Download,
  Eye,
  CalendarDays,
  FlaskConical,
  Activity,
  HeartPulse,
  X,
} from "lucide-react";

export default function TestReports() {
  const [search, setSearch] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);

  const reports = [
    {
      id: 1,
      name: "Complete Blood Count (CBC)",
      category: "Blood Test",
      date: "2026-08-10",
      doctor: "Dr. Ravi Kumar",
      status: "Normal",
      lab: "MediCare Diagnostics",
    },
    {
      id: 2,
      name: "Blood Glucose Test",
      category: "Blood Test",
      date: "2026-08-08",
      doctor: "Dr. Anjali Sharma",
      status: "Normal",
      lab: "MediCare Diagnostics",
    },
    {
      id: 3,
      name: "Lipid Profile",
      category: "Blood Test",
      date: "2026-08-05",
      doctor: "Dr. Ravi Kumar",
      status: "Normal",
      lab: "MediCare Diagnostics",
    },
    {
      id: 4,
      name: "Chest X-Ray",
      category: "Radiology",
      date: "2026-07-28",
      doctor: "Dr. Mohit Verma",
      status: "Reviewed",
      lab: "MediCare Imaging",
    },
    {
      id: 5,
      name: "ECG Report",
      category: "Cardiology",
      date: "2026-07-22",
      doctor: "Dr. Ravi Kumar",
      status: "Normal",
      lab: "MediCare Cardiology",
    },
  ];

  const filteredReports = reports.filter((report) => {
    const text = search.toLowerCase();

    return (
      report.name.toLowerCase().includes(text) ||
      report.category.toLowerCase().includes(text) ||
      report.doctor.toLowerCase().includes(text)
    );
  });

  const downloadReport = (report) => {
    const content = `
MediCare Hospital
Test Report

Report: ${report.name}
Category: ${report.category}
Date: ${report.date}
Doctor: ${report.doctor}
Laboratory: ${report.lab}
Result Status: ${report.status}

This is a sample digital report.
    `;

    const blob = new Blob([content], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${report.name.replaceAll(" ", "_")}.txt`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#f3f7fd]">

      {/* HEADER */}
      <div className="ml-[245px] p-7">

        <div className="max-w-7xl mx-auto">

          {/* TITLE */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-7">

            <div>
              <p className="text-blue-600 font-semibold text-sm">
                PATIENT PORTAL
              </p>

              <h1 className="text-3xl font-bold text-gray-800 mt-1">
                Test Reports
              </h1>

              <p className="text-gray-500 mt-2">
                View and manage your laboratory and diagnostic reports.
              </p>
            </div>

            {/* SEARCH */}
            <div className="relative w-full md:w-[360px]">

              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search reports..."
                className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

          </div>

          {/* SUMMARY CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-7">

            <SummaryCard
              icon={FileText}
              title="Total Reports"
              value={reports.length}
              color="blue"
            />

            <SummaryCard
              icon={FlaskConical}
              title="Blood Tests"
              value={
                reports.filter(
                  (report) => report.category === "Blood Test"
                ).length
              }
              color="red"
            />

            <SummaryCard
              icon={Activity}
              title="Radiology"
              value={
                reports.filter(
                  (report) => report.category === "Radiology"
                ).length
              }
              color="purple"
            />

            <SummaryCard
              icon={HeartPulse}
              title="Normal Results"
              value={
                reports.filter(
                  (report) => report.status === "Normal"
                ).length
              }
              color="green"
            />

          </div>

          {/* REPORT LIST */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">

            <div className="px-6 py-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">
                Recent Reports
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Your latest diagnostic results
              </p>
            </div>

            <div className="p-5">

              {filteredReports.length === 0 ? (

                <div className="text-center py-16">
                  <FileText
                    size={48}
                    className="mx-auto text-gray-300"
                  />

                  <h3 className="text-xl font-bold mt-4">
                    No reports found
                  </h3>

                  <p className="text-gray-500 mt-2">
                    Try a different search term.
                  </p>
                </div>

              ) : (

                <div className="space-y-4">

                  {filteredReports.map((report) => (
                    <ReportCard
                      key={report.id}
                      report={report}
                      onView={() => setSelectedReport(report)}
                      onDownload={() => downloadReport(report)}
                    />
                  ))}

                </div>

              )}

            </div>

          </div>

        </div>
      </div>

      {/* REPORT DETAILS MODAL */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-5">

          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl">

            <div className="flex justify-between items-center p-6 border-b">

              <div>
                <h2 className="text-xl font-bold">
                  Report Details
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {selectedReport.name}
                </p>
              </div>

              <button
                onClick={() => setSelectedReport(null)}
                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
              >
                <X size={20} />
              </button>

            </div>

            <div className="p-6 space-y-5">

              <DetailRow
                label="Test"
                value={selectedReport.name}
              />

              <DetailRow
                label="Category"
                value={selectedReport.category}
              />

              <DetailRow
                label="Date"
                value={formatDate(selectedReport.date)}
              />

              <DetailRow
                label="Doctor"
                value={selectedReport.doctor}
              />

              <DetailRow
                label="Laboratory"
                value={selectedReport.lab}
              />

              <DetailRow
                label="Status"
                value={selectedReport.status}
              />

            </div>

            <div className="p-6 pt-0">

              <button
                onClick={() => downloadReport(selectedReport)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                <Download size={19} />
                Download Report
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

function SummaryCard({
  icon: Icon,
  title,
  value,
  color,
}) {
  const styles = {
    blue: "bg-blue-50 text-blue-600",
    red: "bg-red-50 text-red-500",
    purple: "bg-purple-50 text-purple-600",
    green: "bg-green-50 text-green-600",
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${styles[color]}`}
      >
        <Icon size={23} />
      </div>

      <p className="text-gray-500 text-sm mt-4">
        {title}
      </p>

      <p className="text-3xl font-bold mt-1">
        {value}
      </p>

    </div>
  );
}

function ReportCard({
  report,
  onView,
  onDownload,
}) {
  return (
    <div className="border border-gray-100 rounded-2xl p-5 hover:shadow-md transition">

      <div className="flex flex-col lg:flex-row lg:items-center gap-5">

        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
          <FileText
            size={25}
            className="text-blue-600"
          />
        </div>

        <div className="flex-1">

          <div className="flex flex-wrap items-center gap-3">

            <h3 className="text-lg font-bold">
              {report.name}
            </h3>

            <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-semibold">
              {report.status}
            </span>

          </div>

          <p className="text-blue-600 font-medium mt-1">
            {report.category}
          </p>

          <div className="flex flex-wrap gap-5 text-sm text-gray-500 mt-3">

            <span className="flex items-center gap-1">
              <CalendarDays size={15} />
              {formatDate(report.date)}
            </span>

            <span>
              Doctor: {report.doctor}
            </span>

            <span>
              {report.lab}
            </span>

          </div>

        </div>

        <div className="flex gap-2">

          <button
            onClick={onView}
            className="border border-blue-500 text-blue-600 px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-blue-50"
          >
            <Eye size={17} />
            View
          </button>

          <button
            onClick={onDownload}
            className="bg-blue-600 text-white px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-blue-700"
          >
            <Download size={17} />
            Download
          </button>

        </div>

      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between gap-5 border-b border-gray-100 pb-3">
      <span className="text-gray-500">
        {label}
      </span>

      <span className="font-semibold text-right">
        {value}
      </span>
    </div>
  );
}

function formatDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}