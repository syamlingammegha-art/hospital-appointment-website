import { useEffect, useState } from "react";
import api from "../services/api";

export default function AppointmentRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    const res = await api.get("/appointment-requests");
    setRequests(res.data);
  };

  const approve = async (id) => {
    await api.put(`/appointment-requests/${id}/approve`);
    loadRequests();
  };

  const reject = async (id) => {
    await api.put(`/appointment-requests/${id}/reject`);
    loadRequests();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Appointment Requests
      </h1>

      <div className="space-y-4">
        {requests.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-2xl shadow p-5 flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold text-lg">
                {r.patient_name}
              </h2>

              <p className="text-slate-500">
                {r.department}
              </p>

              <p className="text-sm">
                {r.preferred_date} • {r.preferred_time}
              </p>

              <p className="mt-2">
                {r.chief_complaint}
              </p>

              <span className="inline-block mt-3 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">
                {r.status}
              </span>
            </div>

            {r.status === "Pending" && (
              <div className="flex gap-3">
                <button
                  onClick={() => approve(r.id)}
                  className="bg-green-600 text-white px-5 py-2 rounded-xl"
                >
                  Approve
                </button>

                <button
                  onClick={() => reject(r.id)}
                  className="bg-red-600 text-white px-5 py-2 rounded-xl"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}