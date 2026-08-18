import { useEffect, useState } from "react";
import api from "../services/api";

export default function OPRegistration() {
  const [doctors, setDoctors] = useState([]);

  const [form, setForm] = useState({
    patient_name: "",
    phone: "",
    age: "",
    gender: "",
    doctor_id: "",
    chief_complaint: "",
    symptoms: "",
    priority: "Normal",
    appointment_date: "",
    appointment_time: "",
  });

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const res = await api.get("/doctors");
      setDoctors(res.data || []);
    } catch (error) {
      console.error("Failed to load doctors:", error);
      alert("Failed to load doctors");
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.doctor_id) {
      alert("Please select a doctor");
      return;
    }

    console.log("Sending OP:", form);

    try {
      const res = await api.post("/op", form);

      alert(`OP Created: ${res.data.op_number}`);

      setForm({
        patient_name: "",
        phone: "",
        age: "",
        gender: "",
        doctor_id: "",
        chief_complaint: "",
        symptoms: "",
        priority: "Normal",
        appointment_date: "",
        appointment_time: "",
      });
    } catch (err) {
      console.error(
        "OP Error:",
        err.response?.data || err
      );

      alert(
        err.response?.data?.message ||
          "Failed to register OP"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-3xl font-bold mb-8 text-slate-800">
          New OP Registration
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid gap-6"
        >

          {/* Patient Details */}
          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="text"
              name="patient_name"
              value={form.patient_name}
              onChange={handleChange}
              placeholder="Patient Name"
              className="border rounded-xl p-4"
              required
            />

            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="border rounded-xl p-4"
              required
            />

            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="Age"
              className="border rounded-xl p-4"
              min="1"
              max="120"
              required
            />

            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="border rounded-xl p-4"
              required
            >
              <option value="">
                Select Gender
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

              <option value="Other">
                Other
              </option>
            </select>

          </div>

          {/* Doctor */}
          <select
            name="doctor_id"
            value={form.doctor_id}
            onChange={handleChange}
            className="border rounded-xl p-4"
            required
          >
            <option value="">
              Select Doctor
            </option>

            {doctors.map((doctor) => (
              <option
                key={doctor.id}
                value={doctor.id}
              >
                Dr. {doctor.name}
                {doctor.specialization
                  ? ` — ${doctor.specialization}`
                  : ""}
              </option>
            ))}
          </select>

          {/* Complaint */}
          <textarea
            name="chief_complaint"
            value={form.chief_complaint}
            onChange={handleChange}
            placeholder="Chief Complaint"
            className="border rounded-xl p-4 h-28"
            required
          />

          {/* Symptoms */}
          <textarea
            name="symptoms"
            value={form.symptoms}
            onChange={handleChange}
            placeholder="Symptoms"
            className="border rounded-xl p-4 h-24"
            required
          />

          {/* Appointment */}
          <div className="grid md:grid-cols-3 gap-5">

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="border rounded-xl p-4"
            >
              <option value="Normal">
                Normal
              </option>

              <option value="Urgent">
                Urgent
              </option>

              <option value="Emergency">
                Emergency
              </option>
            </select>

            <input
              type="date"
              name="appointment_date"
              value={form.appointment_date}
              onChange={handleChange}
              className="border rounded-xl p-4"
              required
            />

            <input
              type="time"
              name="appointment_time"
              value={form.appointment_time}
              onChange={handleChange}
              className="border rounded-xl p-4"
              required
            />

          </div>

          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl p-4 font-semibold"
          >
            Register OP
          </button>

        </form>

      </div>
    </div>
  );
}