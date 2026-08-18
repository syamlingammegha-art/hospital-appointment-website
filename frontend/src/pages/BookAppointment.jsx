import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Clock3,
  User,
  Phone,
  HeartPulse,
  ClipboardPlus,
  CheckCircle2,
} from "lucide-react";
import api from "../services/api";

export default function BookAppointment() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    patient_id: "",
    patient_name: "",
    phone: "",
    age: "",
    gender: "",
    department: "",
    preferred_date: "",
    preferred_time: "",
    chief_complaint: "",
    symptoms: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login");
      return;
    }

    setForm((prev) => ({
      ...prev,
      patient_id: user.id,
      patient_name: user.name || "",
      phone: user.phone || "",
      age: user.age || "",
      gender: user.gender || "",
    }));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/appointment-requests", form);

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Failed to send appointment request.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-10 text-center max-w-md">
          <CheckCircle2 className="mx-auto text-green-500" size={70} />
          <h2 className="text-3xl font-bold mt-5">Request Submitted</h2>
          <p className="text-slate-600 mt-3">
            Your appointment request has been sent to the reception staff.
            You'll receive an OP number once it is approved.
          </p>

          <button
            onClick={() => navigate("/my-requests")}
            className="mt-6 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl"
          >
            View My Requests
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-5xl mx-auto">

        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-3xl text-white p-8 mb-8">
          <div className="flex items-center gap-4">
            <HeartPulse size={42} />
            <div>
              <h1 className="text-4xl font-bold">
                Book an Appointment
              </h1>
              <p className="text-teal-100 mt-2">
                Submit your appointment request. Our reception team will verify
                your request and generate your official OP number.
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-xl p-8 space-y-8"
        >
          {/* Patient Details */}
          <div>
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
              <User className="text-teal-600" />
              Patient Details
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              <input
                value={form.patient_name}
                disabled
                className="border rounded-xl p-4 bg-slate-100"
              />

              <input
                value={form.phone}
                disabled
                className="border rounded-xl p-4 bg-slate-100"
              />

              <input
                value={form.age}
                disabled
                className="border rounded-xl p-4 bg-slate-100"
              />

              <input
                value={form.gender}
                disabled
                className="border rounded-xl p-4 bg-slate-100"
              />
            </div>
          </div>

          {/* Department */}
          <div>
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
              <ClipboardPlus className="text-teal-600" />
              Department
            </h2>

            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              required
              className="w-full border rounded-xl p-4"
            >
              <option value="">Select Department</option>
              <option>General Medicine</option>
              <option>Cardiology</option>
              <option>Orthopedic</option>
              <option>Neurology</option>
              <option>Dermatology</option>
              <option>Pediatrics</option>
              <option>ENT</option>
            </select>
          </div>

          {/* Date & Time */}
          <div>
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
              <CalendarDays className="text-teal-600" />
              Preferred Schedule
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              <input
                type="date"
                name="preferred_date"
                value={form.preferred_date}
                onChange={handleChange}
                required
                className="border rounded-xl p-4"
              />

              <input
                type="time"
                name="preferred_time"
                value={form.preferred_time}
                onChange={handleChange}
                required
                className="border rounded-xl p-4"
              />
            </div>
          </div>

          {/* Health Problem */}
          <div>
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
              <HeartPulse className="text-teal-600" />
              Tell Us About Your Health
            </h2>

            <textarea
              name="chief_complaint"
              value={form.chief_complaint}
              onChange={handleChange}
              required
              placeholder="Main problem"
              className="w-full border rounded-xl p-4 h-28"
            />

            <textarea
              name="symptoms"
              value={form.symptoms}
              onChange={handleChange}
              placeholder="Describe your symptoms"
              className="w-full border rounded-xl p-4 h-24 mt-4"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white rounded-xl p-4 text-lg font-semibold"
          >
            {loading ? "Submitting..." : "Submit Appointment Request"}
          </button>
        </form>
      </div>
    </div>
  );
}