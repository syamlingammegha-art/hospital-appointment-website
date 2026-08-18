import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export default function Consultation() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [patient, setPatient] = useState(null);

  const [form, setForm] = useState({
    diagnosis: "",
    prescription: "",
    notes: "",
    next_visit: "",
  });

  useEffect(() => {
    loadPatient();
  }, []);

  const loadPatient = async () => {
    try {
      const res = await api.get(`/doctor/patient/${id}`);
      setPatient(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async () => {
    try {
      await api.post(`/doctor/consult/${id}`, form);

      alert("Consultation completed");

      navigate("/doctor-dashboard");
    } catch (err) {
      console.log(err);
      alert("Failed");
    }
  };

  if (!patient) return <p className="p-8">Loading...</p>;

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow p-8">

        <h1 className="text-3xl font-bold mb-6">
          Patient Consultation
        </h1>

        <div className="grid md:grid-cols-2 gap-4 mb-8">

          <div>
            <p className="text-gray-500">Patient Name</p>
            <h2 className="font-bold">{patient.patient_name}</h2>
          </div>

          <div>
            <p className="text-gray-500">OP Number</p>
            <h2 className="font-bold">{patient.op_number}</h2>
          </div>

          <div>
            <p className="text-gray-500">Chief Complaint</p>
            <h2>{patient.chief_complaint}</h2>
          </div>

          <div>
            <p className="text-gray-500">Symptoms</p>
            <h2>{patient.symptoms}</h2>
          </div>

        </div>

        <div className="space-y-5">

          <div>
            <label className="font-semibold">
              Diagnosis
            </label>

            <textarea
              name="diagnosis"
              value={form.diagnosis}
              onChange={handleChange}
              rows="3"
              className="w-full border rounded-xl p-4 mt-2"
              placeholder="Write diagnosis..."
            />
          </div>

          <div>
            <label className="font-semibold">
              Prescription
            </label>

            <textarea
              name="prescription"
              value={form.prescription}
              onChange={handleChange}
              rows="4"
              className="w-full border rounded-xl p-4 mt-2"
              placeholder="Medicine name, dosage..."
            />
          </div>

          <div>
            <label className="font-semibold">
              Doctor Notes
            </label>

            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows="3"
              className="w-full border rounded-xl p-4 mt-2"
              placeholder="Additional notes..."
            />
          </div>

          <div>
            <label className="font-semibold">
              Next Visit Date
            </label>

            <input
              type="date"
              name="next_visit"
              value={form.next_visit}
              onChange={handleChange}
              className="w-full border rounded-xl p-4 mt-2"
            />
          </div>

          <button
            onClick={submit}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold"
          >
            Complete Consultation
          </button>

        </div>

      </div>
    </div>
  );
}