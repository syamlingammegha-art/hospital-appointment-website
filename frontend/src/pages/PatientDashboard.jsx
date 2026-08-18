import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Plus,
  RefreshCw,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import AppointmentCard from "../components/AppointmentCard";
import api from "../services/api";

export default function PatientDashboard() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await api.get(
        "/appointments/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppointments(response.data);
    } catch (error) {
      console.error(
        "MY APPOINTMENTS ERROR:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (appointment) => {
    const confirmed = window.confirm(
      `Cancel appointment with ${appointment.doctor_name}?`
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");

      await api.patch(
        `/appointments/${appointment.id}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchAppointments();

      alert("Appointment cancelled successfully");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to cancel appointment"
      );
    }
  };

  const rescheduleAppointment = (appointment) => {
    navigate("/book-appointment", {
      state: {
        doctor: {
          id: appointment.doctor_id,
          name: appointment.doctor_name,
          specialization: appointment.specialization,
          consultation_fee:
            appointment.consultation_fee,
          image: appointment.image,
        },
        appointment,
        reschedule: true,
      },
    });
  };

  const upcomingAppointments = appointments.filter(
    (appointment) =>
      appointment.status !== "Cancelled" &&
      appointment.status !== "Completed"
  );

  const completedAppointments = appointments.filter(
    (appointment) =>
      appointment.status === "Completed"
  );

  const cancelledAppointments = appointments.filter(
    (appointment) =>
      appointment.status === "Cancelled"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF6FF] via-[#F8FBFF] to-[#E3F2FD]">

      <Sidebar />

      <main className="ml-[245px] min-h-screen p-7">

        <DashboardNavbar />

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-7">

          <div>
            <p className="text-gray-500">
              Welcome back
            </p>

            <h1 className="text-3xl font-bold text-gray-800">
              {user?.name || "Patient"}
            </h1>

            <p className="text-gray-500 mt-1">
              Manage your hospital appointments.
            </p>
          </div>

          <button
            onClick={() => navigate("/doctors")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <Plus size={19} />
            Book Appointment
          </button>

        </div>

        {/* STAT CARDS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-7">

          <StatCard
            title="Upcoming"
            value={upcomingAppointments.length}
            color="text-blue-600"
          />

          <StatCard
            title="Total"
            value={appointments.length}
            color="text-purple-600"
          />

          <StatCard
            title="Completed"
            value={completedAppointments.length}
            color="text-green-600"
          />

          <StatCard
            title="Cancelled"
            value={cancelledAppointments.length}
            color="text-red-500"
          />

        </div>

        {/* APPOINTMENTS */}
        <section className="bg-white rounded-3xl shadow-sm border border-gray-100">

          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                <CalendarDays
                  size={22}
                  className="text-blue-600"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  My Appointments
                </h2>

                <p className="text-sm text-gray-500">
                  Your appointments from the hospital database
                </p>
              </div>
            </div>

            <button
              onClick={fetchAppointments}
              className="flex items-center gap-2 text-blue-600"
            >
              <RefreshCw size={17} />
              Refresh
            </button>

          </div>

          <div className="p-6">

            {loading ? (
              <div className="py-16 text-center text-gray-500">
                Loading appointments...
              </div>
            ) : appointments.length === 0 ? (

              <div className="py-16 text-center">

                <CalendarDays
                  size={55}
                  className="mx-auto text-blue-300"
                />

                <h3 className="text-xl font-bold mt-5">
                  No appointments yet
                </h3>

                <p className="text-gray-500 mt-2">
                  Book your first appointment with a doctor.
                </p>

                <button
                  onClick={() => navigate("/doctors")}
                  className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl"
                >
                  Find Doctor
                </button>

              </div>

            ) : (

              <div className="space-y-4">

                {appointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    onCancel={cancelAppointment}
                    onReschedule={rescheduleAppointment}
                  />
                ))}

              </div>

            )}

          </div>
        </section>

      </main>
    </div>
  );
}

function StatCard({
  title,
  value,
  color,
}) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">

      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <p className={`text-3xl font-bold mt-2 ${color}`}>
        {value}
      </p>

    </div>
  );
}