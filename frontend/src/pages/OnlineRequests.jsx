import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Phone,
  Stethoscope,
  CheckCircle,
  XCircle,
  Search,
} from "lucide-react";
import api from "../services/api";

export default function OnlineRequests() {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchRequests();
    fetchDoctors();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/appointment-requests");
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await api.get("/doctors");
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const approve = async (id) => {
    if (!selectedDoctor[id]) {
      alert("Please select a doctor first.");
      return;
    }

    try {
      const res = await api.put(
        `/appointment-requests/${id}/approve`,
        {
          doctor_id: selectedDoctor[id],
        }
      );

      alert(`Appointment Approved.\n${res.data.opNumber}`);

      fetchRequests();
    } catch (err) {
      console.error(err);
      alert("Unable to approve appointment.");
    }
  };

  const reject = async (id) => {
    try {
      await api.put(`/appointment-requests/${id}/reject`);

      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = requests.filter((r) =>
    r.patient_name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>
            <button
              onClick={() => navigate("/staff-dashboard")}
              className="flex items-center gap-2 text-teal-700 font-semibold hover:text-teal-900 mb-3"
            >
              <ArrowLeft size={18} />
              Back to Dashboard
            </button>

            <h1 className="text-3xl font-bold text-slate-900">
              Online Appointment Requests
            </h1>

            <p className="text-slate-500 mt-1">
              Review, assign a doctor and approve patient appointments.
            </p>
          </div>

          <div className="relative">
            <Search
              className="absolute left-3 top-3 text-slate-400"
              size={18}
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search patient..."
              className="pl-10 pr-4 py-3 rounded-xl border w-72 bg-white"
            />
          </div>

        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-5 mb-8">

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-slate-500">
              Total Requests
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {requests.length}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-slate-500">
              Pending
            </p>

            <h2 className="text-3xl font-bold text-orange-500 mt-2">
              {
                requests.filter(
                  (r) => r.status === "Pending"
                ).length
              }
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-slate-500">
              Approved
            </p>

            <h2 className="text-3xl font-bold text-green-500 mt-2">
              {
                requests.filter(
                  (r) => r.status === "Approved"
                ).length
              }
            </h2>
          </div>

        </div>

        {/* Request Cards */}
        <div className="space-y-6">

          {filtered.length > 0 ? (
            filtered.map((r) => (
              <div
                key={r.id}
                className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden"
              >

                <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-4 flex justify-between items-center">

                  <div>
                    <h2 className="text-xl font-bold">
                      {r.patient_name}
                    </h2>

                    <p className="text-teal-100 text-sm">
                      {r.department}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold ${
                      r.status === "Pending"
                        ? "bg-orange-100 text-orange-700"
                        : r.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {r.status}
                  </span>

                </div>

                <div className="p-6">

                  <div className="grid md:grid-cols-3 gap-5 mb-6">

                    <div className="flex items-center gap-3">
                      <User className="text-teal-600" />
                      <div>
                        <p className="text-sm text-slate-500">
                          Patient
                        </p>

                        <p className="font-semibold">
                          {r.patient_name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="text-teal-600" />
                      <div>
                        <p className="text-sm text-slate-500">
                          Phone
                        </p>

                        <p className="font-semibold">
                          {r.phone || "Not provided"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="text-teal-600" />
                      <div>
                        <p className="text-sm text-slate-500">
                          Date
                        </p>

                        <p className="font-semibold">
                          {r.preferred_date}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="text-teal-600" />
                      <div>
                        <p className="text-sm text-slate-500">
                          Time
                        </p>

                        <p className="font-semibold">
                          {r.preferred_time}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-slate-500 mb-1">
                        Age / Gender
                      </p>

                      <p className="font-semibold">
                        {r.age} • {r.gender}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-500 mb-1">
                        Department
                      </p>

                      <p className="font-semibold">
                        {r.department}
                      </p>
                    </div>

                  </div>

                  <div className="mb-6">

                    <p className="text-sm text-slate-500 mb-2">
                      Chief Complaint
                    </p>

                    <div className="bg-slate-50 rounded-xl p-4">
                      {r.chief_complaint}
                    </div>

                  </div>

                  <div className="mb-6">

                    <p className="text-sm text-slate-500 mb-2">
                      Symptoms
                    </p>

                    <div className="bg-slate-50 rounded-xl p-4">
                      {r.symptoms}
                    </div>

                  </div>

                  {r.status === "Pending" && (
                    <>
                      <div className="mb-6">

                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">

                          <Stethoscope size={18} />

                          Assign Doctor

                        </label>

                        <select
                          value={
                            selectedDoctor[r.id] || ""
                          }
                          onChange={(e) =>
                            setSelectedDoctor({
                              ...selectedDoctor,
                              [r.id]: e.target.value,
                            })
                          }
                          className="w-full rounded-xl border p-3 bg-white"
                        >
                          <option value="">
                            Select Doctor
                          </option>

                          {doctors.map((doc) => (
                            <option
                              key={doc.id}
                              value={doc.id}
                            >
                              {doc.name} •{" "}
                              {doc.specialization}
                            </option>
                          ))}
                        </select>

                      </div>

                      <div className="flex gap-3">

                        <button
                          onClick={() =>
                            approve(r.id)
                          }
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-semibold"
                        >
                          <CheckCircle size={18} />

                          Approve & Generate OP

                        </button>

                        <button
                          onClick={() =>
                            reject(r.id)
                          }
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-semibold"
                        >
                          <XCircle size={18} />

                          Reject

                        </button>

                      </div>
                    </>
                  )}

                </div>

              </div>
            ))
          ) : (
            <div className="bg-white rounded-3xl p-16 text-center shadow">
              <h2 className="text-xl font-semibold text-slate-700">
                No appointment requests found.
              </h2>

              <p className="text-slate-500 mt-2">
                New patient requests will appear here automatically.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}