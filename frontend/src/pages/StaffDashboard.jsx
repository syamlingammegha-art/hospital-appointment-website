import { useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Stethoscope,
  Search,
  Bell,
  LogOut,
  Menu,
  ClipboardList,
  CheckCircle,
  XCircle,
} from "lucide-react";
import api from "../services/api";

export default function StaffDashboard() {
  const navigate = useNavigate();

  const [staff, setStaff] = useState({});
  const [search, setSearch] = useState("");
const location = useLocation();
  const [appointmentRequests, setAppointmentRequests] = useState([]);
  const [opQueue, setOpQueue] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "staff") {
      navigate("/login");
      return;
    }

    setStaff(user);

    fetchData();

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const [reqRes, opRes] = await Promise.all([
        api.get("/appointment-requests"),
        api.get("/op"),
      ]);

      setAppointmentRequests(reqRes.data);
      setOpQueue(opRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const approveRequest = async (id) => {
    try {
      const res = await api.put(`/appointment-requests/${id}/approve`);

      alert(`OP Generated: ${res.data.opNumber}`);

      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const rejectRequest = async (id) => {
    try {
      await api.put(`/appointment-requests/${id}/reject`);

      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/op/${id}/status`, { status });

      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredQueue = opQueue.filter((p) =>
    p.patient_name.toLowerCase().includes(search.toLowerCase())
  );

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* Sidebar */}
      <aside className="w-72 bg-[#06202E] text-white hidden lg:flex flex-col">

        <div className="p-6 border-b border-white/10">
          <h1 className="text-3xl font-bold text-teal-300">MediCare</h1>
          <p className="text-slate-400 text-sm mt-1">
            Reception Staff Portal
          </p>
        </div>

        <nav className="flex-1 p-5 space-y-2">

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-teal-500">
            <LayoutDashboard size={20} />
            Dashboard
          </button>

          <button
            onClick={() => navigate("/op-registration")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10"
          >
            <CalendarDays size={20} />
            New OP
          </button>

          <button
  onClick={() => navigate("/online-requests")}
  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
    location.pathname === "/online-requests"
      ? "bg-teal-500"
      : "hover:bg-white/10"
  }`}
>
  <ClipboardList size={20} />
  Online Requests
</button>

<button
  onClick={() => navigate("/patients")}
  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
    location.pathname === "/patients"
      ? "bg-teal-500"
      : "hover:bg-white/10"
  }`}
>
  <Users size={20}/>
  Patients
</button>

<button
  onClick={() => navigate("/doctors-management")}
  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
    location.pathname === "/doctors-management"
      ? "bg-teal-500"
      : "hover:bg-white/10"
  }`}
>
  <Stethoscope size={20}/>
  Doctors
</button>
          
        </nav>

        <button
          onClick={logout}
          className="m-5 flex items-center gap-3 px-4 py-3 rounded-xl text-red-300 hover:bg-red-500/10"
        >
          <LogOut size={20} />
          Logout
        </button>

      </aside>

      {/* Main */}
      <main className="flex-1">

        <header className="bg-white px-6 py-4 flex justify-between items-center shadow-sm">

          <div className="flex items-center gap-3">

            <Menu className="lg:hidden" />

            <div className="relative">

              <Search
                className="absolute left-3 top-3 text-slate-400"
                size={18}
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search patient..."
                className="pl-10 pr-4 py-2 rounded-xl border w-72"
              />

            </div>

          </div>

          <div className="flex items-center gap-4">

            <Bell className="text-slate-500" />

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold">
                {staff.name?.charAt(0)}
              </div>

              <div>
                <p className="font-semibold">{staff.name}</p>
                <p className="text-xs text-slate-500">
                  Reception Staff
                </p>
              </div>

            </div>

          </div>

        </header>

        <div className="p-6">

          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-3xl p-8 mb-6">
            <h1 className="text-3xl font-bold">
              Welcome back, {staff.name}
            </h1>

            <p className="mt-2 text-teal-100">
              Manage online appointments and OP registrations.
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-5 mb-6">

            <StatCard
              title="Online Requests"
              value={appointmentRequests.length}
            />

            <StatCard
              title="Pending"
              value={appointmentRequests.filter(a => a.status === "Pending").length}
              color="text-orange-500"
            />

            <StatCard
              title="Today's OP"
              value={opQueue.length}
              color="text-blue-500"
            />

            <StatCard
              title="Completed"
              value={opQueue.filter(a => a.status === "Completed").length}
              color="text-green-500"
            />

          </div>

          {/* Online Requests */}
          <div className="bg-white rounded-3xl shadow overflow-hidden mb-8">

            <div className="p-5 border-b">
              <h2 className="text-xl font-bold">
                Online Appointment Requests
              </h2>
            </div>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-slate-50 text-sm">

                  <tr>
                    <th className="p-4 text-left">Patient</th>
                    <th className="p-4 text-left">Department</th>
                    <th className="p-4 text-left">Date</th>
                    <th className="p-4 text-left">Time</th>
                    <th className="p-4 text-left">Problem</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-left">Action</th>
                  </tr>

                </thead>

                <tbody>

                  {appointmentRequests.length > 0 ? (
                    appointmentRequests.map(item => (
                      <tr key={item.id} className="border-t">

                        <td className="p-4">
                          <div>
                            <p className="font-semibold">
                              {item.patient_name}
                            </p>
                            <p className="text-xs text-slate-500">
                              {item.phone}
                            </p>
                          </div>
                        </td>

                        <td className="p-4">
                          {item.department}
                        </td>

                        <td className="p-4">
                          {item.preferred_date}
                        </td>

                        <td className="p-4">
                          {item.preferred_time}
                        </td>

                        <td className="p-4 max-w-xs truncate">
                          {item.chief_complaint}
                        </td>

                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs ${
                            item.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : item.status === "Approved"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}>
                            {item.status}
                          </span>
                        </td>

                        <td className="p-4">
                          {item.status === "Pending" && (
                            <div className="flex gap-2">

                              <button
                                onClick={() => approveRequest(item.id)}
                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-xs flex items-center gap-1"
                              >
                                <CheckCircle size={14} />
                                Approve
                              </button>

                              <button
                                onClick={() => rejectRequest(item.id)}
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-xs flex items-center gap-1"
                              >
                                <XCircle size={14} />
                                Reject
                              </button>

                            </div>
                          )}
                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="p-8 text-center text-slate-500">
                        No appointment requests.
                      </td>
                    </tr>
                  )}

                </tbody>

              </table>

            </div>

          </div>

          {/* OP Queue */}
          <div className="bg-white rounded-3xl shadow overflow-hidden">

            <div className="p-5 border-b flex justify-between items-center">

              <h2 className="font-bold text-xl">
                Live OP Queue
              </h2>

              <button
                onClick={() => navigate("/op-registration")}
                className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-xl"
              >
                New OP
              </button>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-slate-50 text-sm">

                  <tr>
                    <th className="p-4 text-left">OP No</th>
                    <th className="p-4 text-left">Patient</th>
                    <th className="p-4 text-left">Complaint</th>
                    <th className="p-4 text-left">Priority</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-left">Action</th>
                  </tr>

                </thead>

                <tbody>

                  {filteredQueue.length > 0 ? (
                    filteredQueue.map(item => (
                      <tr key={item.id} className="border-t">

                        <td className="p-4 font-semibold">
                          {item.op_number}
                        </td>

                        <td className="p-4">
                          {item.patient_name}
                        </td>

                        <td className="p-4">
                          {item.chief_complaint}
                        </td>

                        <td className="p-4">
                          {item.priority}
                        </td>

                        <td className="p-4">
                          {item.status}
                        </td>

                        <td className="p-4">

                          {item.status === "Pending" && (
                            <button
                              onClick={() =>
                                updateStatus(item.id, "In Consultation")
                              }
                              className="bg-blue-500 text-white px-3 py-2 rounded-lg text-xs"
                            >
                              Call
                            </button>
                          )}

                          {item.status === "In Consultation" && (
                            <button
                              onClick={() =>
                                updateStatus(item.id, "Completed")
                              }
                              className="bg-green-500 text-white px-3 py-2 rounded-lg text-xs"
                            >
                              Complete
                            </button>
                          )}

                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-slate-500">
                        No OP records.
                      </td>
                    </tr>
                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

function StatCard({ title, value, color = "text-slate-900" }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow">
      <p className="text-slate-500 text-sm">{title}</p>
      <h2 className={`text-3xl font-bold mt-2 ${color}`}>
        {value}
      </h2>
    </div>
  );
}