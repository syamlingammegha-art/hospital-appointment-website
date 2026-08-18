import {
  FileText,
  CalendarDays,
  UserRound,
  Eye,
  Download,
} from "lucide-react";

export default function MedicalRecords() {
  const records = [
    {
      id: 1,
      title: "General Consultation",
      doctor: "Dr. Ravi Kumar",
      department: "Cardiology",
      date: "10 Aug 2026",
    },
    {
      id: 2,
      title: "Dermatology Consultation",
      doctor: "Dr. Anjali Sharma",
      department: "Dermatology",
      date: "05 Aug 2026",
    },
    {
      id: 3,
      title: "Neurology Consultation",
      doctor: "Dr. Mohit Verma",
      department: "Neurology",
      date: "20 Jul 2026",
    },
  ];

  const handleView = (record) => {
    alert(`Viewing: ${record.title}`);
  };

  const handleDownload = (record) => {
    const content = `
MediCare Hospital
Medical Record

Record: ${record.title}
Doctor: ${record.doctor}
Department: ${record.department}
Date: ${record.date}
`;

    const blob = new Blob([content], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${record.title.replaceAll(" ", "_")}.txt`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#f3f7fd]">
      <main className="ml-[245px] p-7">
        <div className="max-w-7xl mx-auto">

          <div className="mb-7">
            <p className="text-blue-600 font-semibold text-sm">
              PATIENT PORTAL
            </p>

            <h1 className="text-3xl font-bold text-gray-800 mt-1">
              Medical Records
            </h1>

            <p className="text-gray-500 mt-2">
              View and manage your medical history.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-7">

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <FileText className="text-blue-600" />
              <p className="text-gray-500 mt-4">
                Total Records
              </p>
              <h2 className="text-3xl font-bold mt-1">
                {records.length}
              </h2>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <UserRound className="text-green-600" />
              <p className="text-gray-500 mt-4">
                Doctors Consulted
              </p>
              <h2 className="text-3xl font-bold mt-1">
                {new Set(records.map((r) => r.doctor)).size}
              </h2>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <CalendarDays className="text-purple-600" />
              <p className="text-gray-500 mt-4">
                Recent Visits
              </p>
              <h2 className="text-3xl font-bold mt-1">
                {records.length}
              </h2>
            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-sm p-6">

            <h2 className="text-xl font-bold mb-5">
              Medical History
            </h2>

            <div className="space-y-4">

              {records.map((record) => (
                <div
                  key={record.id}
                  className="border border-gray-100 rounded-2xl p-5 hover:shadow-md transition"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-5">

                    <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center">
                      <FileText
                        size={25}
                        className="text-blue-600"
                      />
                    </div>

                    <div className="flex-1">

                      <h3 className="text-lg font-bold">
                        {record.title}
                      </h3>

                      <p className="text-blue-600 mt-1">
                        {record.department}
                      </p>

                      <div className="flex flex-wrap gap-5 text-sm text-gray-500 mt-3">

                        <span className="flex items-center gap-1">
                          <UserRound size={15} />
                          {record.doctor}
                        </span>

                        <span className="flex items-center gap-1">
                          <CalendarDays size={15} />
                          {record.date}
                        </span>

                      </div>

                    </div>

                    <div className="flex gap-2">

                      <button
                        onClick={() => handleView(record)}
                        className="border border-blue-500 text-blue-600 px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-50"
                      >
                        <Eye size={17} />
                        View
                      </button>

                      <button
                        onClick={() => handleDownload(record)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700"
                      >
                        <Download size={17} />
                        Download
                      </button>

                    </div>

                  </div>
                </div>
              ))}

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}