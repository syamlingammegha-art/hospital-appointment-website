import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HeartPulse,
  Bone,
  Brain,
  Baby,
  Eye,
  Stethoscope,
  Pill,
  Microscope,
  X,
} from "lucide-react";

export default function Services() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 1,
      title: "Cardiology",
      icon: HeartPulse,
      short: "Heart and blood vessel care.",
      full: "Our Cardiology Department provides ECG, Echo, TMT tests, preventive heart checkups, and 24×7 emergency cardiac care with experienced specialists.",
      fee: "₹500",
      timing: "9:00 AM - 8:00 PM",
      doctors: 3,
      features: ["ECG", "Echo Test", "TMT Test", "Heart Checkup", "Emergency Care"],
    },
    {
      id: 2,
      title: "Orthopedics",
      icon: Bone,
      short: "Bone and joint treatment.",
      full: "Advanced orthopedic care including fractures, joint replacement, spine treatment, and physiotherapy support.",
      fee: "₹400",
      timing: "9:00 AM - 7:00 PM",
      doctors: 4,
      features: ["Fracture Care", "Joint Replacement", "Spine Care", "Physiotherapy"],
    },
    {
      id: 3,
      title: "Neurology",
      icon: Brain,
      short: "Brain and nervous system care.",
      full: "Specialized treatment for stroke, migraines, epilepsy, and other neurological conditions.",
      fee: "₹600",
      timing: "10:00 AM - 6:00 PM",
      doctors: 2,
      features: ["Stroke Care", "Migraine Treatment", "EEG", "Nerve Testing"],
    },
    {
      id: 4,
      title: "Pediatrics",
      icon: Baby,
      short: "Child healthcare.",
      full: "Complete healthcare for infants and children including vaccinations and emergency pediatric care.",
      fee: "₹350",
      timing: "8:00 AM - 8:00 PM",
      doctors: 5,
      features: ["Vaccination", "Newborn Care", "Growth Monitoring", "Child Emergency Care"],
    },
    {
      id: 5,
      title: "Ophthalmology",
      icon: Eye,
      short: "Eye care and vision treatment.",
      full: "Comprehensive eye examinations, cataract surgery, glaucoma care, and vision correction.",
      fee: "₹450",
      timing: "9:00 AM - 6:00 PM",
      doctors: 3,
      features: ["Eye Test", "Cataract Surgery", "Vision Correction", "Glaucoma Care"],
    },
    {
      id: 6,
      title: "General Medicine",
      icon: Stethoscope,
      short: "Primary healthcare.",
      full: "Diagnosis and treatment for fever, diabetes, blood pressure, infections, and routine consultations.",
      fee: "₹300",
      timing: "24 Hours",
      doctors: 8,
      features: ["Fever Treatment", "Diabetes Care", "BP Check", "Health Checkup"],
    },
    {
      id: 7,
      title: "Pharmacy",
      icon: Pill,
      short: "Hospital medicines.",
      full: "24×7 pharmacy providing prescription medicines, OTC medicines, and emergency medications.",
      fee: "-",
      timing: "24 Hours",
      doctors: 0,
      features: ["Prescription Medicines", "OTC Medicines", "Emergency Medicines"],
    },
    {
      id: 8,
      title: "Laboratory",
      icon: Microscope,
      short: "Diagnostic tests.",
      full: "Modern laboratory for blood tests, urine tests, thyroid tests, and advanced diagnostics.",
      fee: "From ₹200",
      timing: "7:00 AM - 9:00 PM",
      doctors: 6,
      features: ["Blood Tests", "Urine Tests", "Thyroid Test", "Advanced Diagnostics"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold">Our Medical Services</h1>
          <p className="mt-4 text-blue-100 text-lg">
            World-class healthcare with experienced doctors and advanced technology.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.id}
                className="bg-white rounded-3xl shadow-md hover:shadow-xl transition duration-300 p-6 border border-blue-100 hover:-translate-y-2"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
                  <Icon size={34} className="text-blue-600" />
                </div>

                <h3 className="text-xl font-bold mt-5">{service.title}</h3>

                <p className="text-gray-500 mt-2 text-sm">
                  {service.short}
                </p>

                <button
                  onClick={() => setSelectedService(service)}
                  className="mt-6 text-blue-600 font-semibold hover:text-blue-700"
                >
                  Learn More →
                </button>
              </div>
            );
          })}

        </div>

      </div>

      {/* Learn More Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">

            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center rounded-t-3xl">

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <selectedService.icon size={34} className="text-blue-600" />
                </div>

                <div>
                  <h2 className="text-3xl font-bold">{selectedService.title}</h2>
                  <p className="text-gray-500">{selectedService.short}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedService(null)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X />
              </button>

            </div>

            <div className="p-6">

              <p className="text-gray-700 leading-7">
                {selectedService.full}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mt-8">

                <InfoCard label="Specialist Doctors" value={`${selectedService.doctors}`} />
                <InfoCard label="Consultation Fee" value={selectedService.fee} />
                <InfoCard label="Available Timings" value={selectedService.timing} />
                <InfoCard label="Emergency Support" value="Available" />

              </div>

              <div className="mt-8">

                <h3 className="text-xl font-bold mb-4">
                  Available Treatments
                </h3>

                <div className="grid sm:grid-cols-2 gap-3">

                  {selectedService.features.map((item) => (
                    <div
                      key={item}
                      className="bg-blue-50 rounded-xl px-4 py-3 text-blue-800 font-medium"
                    >
                      ✓ {item}
                    </div>
                  ))}

                </div>

              </div>

              <button
                onClick={() => navigate("/doctors")}
                className="mt-10 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold"
              >
                Book Appointment
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-xl font-bold text-gray-800 mt-2">{value}</p>
    </div>
  );
}