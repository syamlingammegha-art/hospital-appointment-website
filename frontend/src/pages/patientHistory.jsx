import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { generatePrescription } from "../utils/PrescriptionPDF";
import api from "../services/api";

export default function PatientHistory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const res = await api.get(`/staff/patient-history/${id}`);
      setRecords(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate("/patients")}
          className="mb-6 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-xl flex items-center gap-2"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h1 className="text-3xl font-bold mb-6">Patient Consultation History</h1>

        {records.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center shadow">
            No consultation history found.
          </div>
        ) : (
          <div className="space-y-6">
            {records.map((r) => (
              <div key={r.id} className="bg-white rounded-3xl shadow p-6">
                {/* Header */}
                <div className="flex items-center gap-5 border-b pb-5">
                  <img
                    src={
                      r.photo
                        ? `http://localhost:5000${r.photo}`
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            r.doctor_name || "Doctor"
                          )}&background=0D9488&color=fff`
                    }
                    alt={r.doctor_name}
                    className="w-20 h-20 rounded-full object-cover"
                  />

                  <div className="flex-1">
                    <h2 className="text-2xl font-bold">{r.doctor_name}</h2>
                    <p className="text-teal-600">{r.specialization}</p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
                      <span>OP: {r.op_number || "N/A"}</span>
                      <span>
                        {r.created_at
                          ? new Date(r.created_at).toLocaleDateString()
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Consultation Details */}
                <div className="grid md:grid-cols-2 gap-5 mt-6">
                  <Card title="Diagnosis" value={r.diagnosis} />
                  <Card title="Prescription" value={r.prescription} />
                  <Card title="Doctor Notes" value={r.notes} />
                  <Card title="Next Visit" value={r.next_visit || "Not Required"} />
                </div>

                {/* Download Button */}
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => generatePrescription(r)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition"
                  >
                    <Download size={18} />
                    Download Prescription PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-slate-50 rounded-xl p-4 border">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="font-semibold mt-2 whitespace-pre-wrap">{value || "-"}</p>
    </div>
  );
}