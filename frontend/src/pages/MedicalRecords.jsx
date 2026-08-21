import { useEffect, useState } from "react";
import api from "../services/api";

export default function MedicalRecords() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      const res = await api.get("/patient/medical-records");
      setRecords(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Medical Records
        </h1>

        {records.length === 0 ? (
          <div className="bg-white rounded-3xl shadow p-10 text-center text-gray-500">
            No medical records available.
          </div>
        ) : (
          <div className="space-y-6">

            {records.map((r) => (
              <div
                key={r.id}
                className="bg-white rounded-3xl shadow p-6"
              >
                <div className="flex items-center gap-5">

                  <img
                    src={
                      r.photo
                        ? `http://localhost:5000${r.photo}`
                        : "https://ui-avatars.com/api/?name=Doctor"
                    }
                    className="w-20 h-20 rounded-full object-cover"
                  />

                  <div>

                    <h2 className="text-xl font-bold">
                      {r.doctor_name}
                    </h2>

                    <p className="text-teal-600">
                      {r.specialization}
                    </p>

                    <p className="text-gray-500 text-sm">
                      OP: {r.op_number}
                    </p>

                  </div>

                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-6">

                  <Card
                    title="Diagnosis"
                    value={r.diagnosis}
                  />

                  <Card
                    title="Prescription"
                    value={r.prescription}
                  />

                  <Card
                    title="Doctor Notes"
                    value={r.notes}
                  />

                  <Card
                    title="Next Visit"
                    value={r.next_visit || "Not Required"}
                  />

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
    <div className="bg-slate-50 rounded-xl p-4">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="font-semibold mt-2">{value}</p>
    </div>
  );
}