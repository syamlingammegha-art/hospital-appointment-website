import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Appointments() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/appointments/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAppointments(response.data);
    } catch (error) {
      console.error(error);
      alert("Unable to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (!confirmCancel) return;

    try {
      const token = localStorage.getItem("token");

      await api.patch(
        `/appointments/${id}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Appointment cancelled");

      loadAppointments();
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Unable to cancel appointment"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f7fd] p-8">

      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-3xl font-bold">
              My Appointments
            </h1>

            <p className="text-gray-500 mt-1">
              Manage your hospital appointments
            </p>
          </div>

          <button
            onClick={() => navigate("/doctors")}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700"
          >
            + Book Appointment
          </button>

        </div>

        {loading ? (
          <div className="bg-white rounded-2xl p-10 text-center">
            Loading appointments...
          </div>
        ) : appointments.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">

            <h2 className="text-xl font-bold">
              No appointments yet
            </h2>

            <p className="text-gray-500 mt-2">
              Book your first appointment with one of our doctors.
            </p>

            <button
              onClick={() => navigate("/doctors")}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl"
            >
              Find Doctors
            </button>

          </div>
        ) : (
          <div className="space-y-4">

            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >

                <div className="flex justify-between items-center">

                  <div>
                    <h2 className="text-xl font-bold text-blue-700">
                      {appointment.doctor_name}
                    </h2>

                    <p className="text-gray-500">
                      {appointment.specialization}
                    </p>

                    <div className="flex gap-6 mt-3 text-sm">
                      <span>
                        📅 {appointment.appointment_date}
                      </span>

                      <span>
                        🕐 {appointment.appointment_time}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        appointment.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : appointment.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : appointment.status === "Completed"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {appointment.status}
                    </span>

                    {appointment.status !== "Cancelled" &&
                      appointment.status !== "Completed" && (
                        <div className="mt-4">

                          <button
                            onClick={() =>
                              cancelAppointment(appointment.id)
                            }
                            className="border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-50"
                          >
                            Cancel
                          </button>

                        </div>
                      )}

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}