import { useEffect, useState } from "react";
import api from "../services/api";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const res = await api.get("/doctors");
      console.log(res.data);
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Doctors</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doc) => (
          <div key={doc.id} className="bg-white rounded-2xl shadow p-6">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                doc.name
              )}&background=0D9488&color=fff&size=256`}
              alt={doc.name}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />

            <h2 className="text-xl font-bold text-center">{doc.name}</h2>

            <p className="text-center text-teal-600">
              {doc.specialization}
            </p>

            <div className="mt-4 space-y-2 text-sm">
              <p>Experience: {doc.experience} years</p>
              <p>Fee: ₹{doc.consultation_fee}</p>
              <p>Available: {doc.available_days}</p>
              <p>Status: {doc.status}</p>
            </div>
          </div>
        ))}
      </div>

      {doctors.length === 0 && (
        <div className="mt-10 text-center text-gray-500">
          No doctors found.
        </div>
      )}
    </div>
  );
}