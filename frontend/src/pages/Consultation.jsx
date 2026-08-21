import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export default function Consultation() {
  const { id } = useParams();
  const navigate = useNavigate();

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
      console.error(err);
    }
  };

  const submit = async () => {
    try {
      await api.post(`/doctor/consult/${id}`, form);

      alert("Consultation completed successfully");

      navigate("/doctor-dashboard");
    } catch (err) {
      console.error(err);
      alert("Unable to save consultation");
    }
  };

  if (!patient) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-6xl mx-auto">

        <button
          onClick={() => navigate("/doctor-dashboard")}
          className="mb-6 bg-gray-700 text-white px-5 py-2 rounded-xl"
        >
          ← Back
        </button>

        <div className="bg-white rounded-3xl shadow p-8">

          <h1 className="text-3xl font-bold mb-6">
            Patient Consultation
          </h1>

          {/* Patient Info */}

          <div className="grid md:grid-cols-2 gap-6 mb-8">

            <Info label="OP Number" value={patient.op_number} />
            <Info label="Patient Name" value={patient.patient_name} />
            <Info label="Age" value={patient.age} />
            <Info label="Gender" value={patient.gender} />
            <Info label="Phone" value={patient.phone} />
            <Info label="Status" value={patient.status} />

          </div>

          {/* Complaint */}

          <div className="mb-6">

            <label className="font-semibold">
              Chief Complaint
            </label>

            <div className="mt-2 bg-slate-50 border rounded-xl p-4">
              {patient.chief_complaint}
            </div>

          </div>

          <div className="mb-8">

            <label className="font-semibold">
              Symptoms
            </label>

            <div className="mt-2 bg-slate-50 border rounded-xl p-4">
              {patient.symptoms}
            </div>

          </div>

          {/* Doctor Form */}

          <div className="grid gap-6">

            <Field
              title="Diagnosis"
              value={form.diagnosis}
              onChange={(v) =>
                setForm({ ...form, diagnosis: v })
              }
            />

            <Field
              title="Prescription"
              value={form.prescription}
              onChange={(v) =>
                setForm({
                  ...form,
                  prescription: v,
                })
              }
            />

            <Field
              title="Doctor Notes"
              value={form.notes}
              onChange={(v) =>
                setForm({ ...form, notes: v })
              }
            />

            <div>

              <label className="font-semibold">
                Next Visit Date
              </label>

              <input
                type="date"
                value={form.next_visit}
                onChange={(e) =>
                  setForm({
                    ...form,
                    next_visit: e.target.value,
                  })
                }
                className="mt-2 w-full border rounded-xl p-3"
              />

            </div>

          </div>

          <button
            onClick={submit}
            className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg font-bold"
          >
            Complete Consultation
          </button>

        </div>

      </div>

    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="bg-slate-50 border rounded-xl p-4">
      <p className="text-sm text-gray-500">
        {label}
      </p>
      <p className="font-semibold text-lg mt-1">
        {value}
      </p>
    </div>
  );
}

function Field({ title, value, onChange }) {
  return (
    <div>

      <label className="font-semibold">
        {title}
      </label>

      <textarea
        rows={4}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="mt-2 w-full border rounded-xl p-3"
      />

    </div>
  );
}