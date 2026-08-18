import { useNavigate } from "react-router-dom";
import { Calendar, Award } from "lucide-react";

export default function DoctorCard({ doctor }) {
  const navigate = useNavigate();

  // Use uploaded image first, then photo column, then avatar fallback
  const imageUrl =
    doctor.image
      ? `http://localhost:5000${doctor.image}`
      : doctor.photo
      ? `http://localhost:5000${doctor.photo}`
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          doctor.name
        )}&background=0D9488&color=fff&size=256`;

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

      {/* Doctor Image */}
      <div className="relative">
        <img
          src={imageUrl}
          alt={doctor.name}
          className="w-full h-64 object-cover"
        />

        <span className="absolute top-4 right-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
          Available
        </span>
      </div>

      {/* Doctor Details */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-slate-900">
          {doctor.name}
        </h2>

        <p className="text-teal-600 font-semibold mt-1">
          {doctor.specialization}
        </p>

        <div className="mt-4 space-y-3 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Award size={18} className="text-teal-600" />
            {doctor.experience} Years Experience
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-teal-600" />
            {doctor.available_days}
          </div>

          <p className="font-semibold text-slate-800">
            Consultation Fee: ₹{doctor.consultation_fee}
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/book-appointment", { state: { doctor } })
          }
          className="w-full bg-gradient-to-r from-teal-700 to-cyan-600 text-white py-3 rounded-xl mt-6 hover:from-teal-800 hover:to-cyan-700 transition"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}