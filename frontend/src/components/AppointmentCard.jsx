import {
  CalendarDays,
  Clock3,
  IndianRupee,
  X,
  RefreshCw,
} from "lucide-react";

export default function AppointmentCard({
  appointment,
  onCancel,
  onReschedule,
}) {
  const getStatusStyle = () => {
    switch (appointment.status) {
      case "Approved":
        return "bg-green-100 text-green-700";

      case "Completed":
        return "bg-blue-100 text-blue-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition">

      <div className="flex flex-col md:flex-row md:items-center gap-5">

        <img
          src={
            appointment.image ||
            "https://randomuser.me/api/portraits/men/32.jpg"
          }
          alt={appointment.doctor_name}
          className="w-16 h-16 rounded-2xl object-cover"
        />

        <div className="flex-1">

          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-lg font-bold text-gray-800">
              {appointment.doctor_name}
            </h3>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle()}`}
            >
              {appointment.status}
            </span>
          </div>

          <p className="text-blue-600 font-medium mt-1">
            {appointment.specialization}
          </p>

          <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">

            <span className="flex items-center gap-1">
              <CalendarDays size={16} />
              {formatDate(appointment.appointment_date)}
            </span>

            <span className="flex items-center gap-1">
              <Clock3 size={16} />
              {formatTime(appointment.appointment_time)}
            </span>

            <span className="flex items-center gap-1">
              <IndianRupee size={16} />
              {appointment.consultation_fee}
            </span>

          </div>
        </div>

        {appointment.status !== "Cancelled" &&
          appointment.status !== "Completed" && (
            <div className="flex gap-2">

              <button
                onClick={() => onReschedule(appointment)}
                className="flex items-center gap-2 border border-blue-500 text-blue-600 px-4 py-2 rounded-xl hover:bg-blue-50"
              >
                <RefreshCw size={16} />
                Reschedule
              </button>

              <button
                onClick={() => onCancel(appointment)}
                className="flex items-center gap-2 border border-red-500 text-red-500 px-4 py-2 rounded-xl hover:bg-red-50"
              >
                <X size={16} />
                Cancel
              </button>

            </div>
          )}

      </div>
    </div>
  );
}

function formatDate(date) {
  if (!date) return "";

  const d = new Date(date);

  if (Number.isNaN(d.getTime())) {
    return date;
  }

  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(time) {
  if (!time) return "";

  const [hour, minute] = String(time).split(":");

  const d = new Date();
  d.setHours(Number(hour));
  d.setMinutes(Number(minute));

  return d.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });
}