import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Stethoscope,
  Building2,
  HeartPulse,
  Search,
  MapPin,
  Phone,
  TestTube,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DoctorCard from "../components/DoctorCard";
import ServiceCard from "../components/ServiceCard";
import api from "../services/api";

export default function Home() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const res = await api.get("/doctors");
      setDoctors(res.data.slice(0, 3));
    } catch (err) {
      console.log(err);
    }
  };

  const services = [
    {
      title: "Book Appointment",
      description: "Easy appointment booking.",
      icon: Calendar,
      color: "bg-yellow-100",
      iconColor: "text-yellow-700",
    },
    {
      title: "Find Doctor",
      description: "Choose the right specialist.",
      icon: Stethoscope,
      color: "bg-cyan-100",
      iconColor: "text-cyan-700",
    },
    {
      title: "Find Hospitals",
      description: "Locate nearby hospitals.",
      icon: Building2,
      color: "bg-pink-100",
      iconColor: "text-pink-700",
    },
    {
      title: "Health Check-up",
      description: "Complete health packages.",
      icon: HeartPulse,
      color: "bg-blue-100",
      iconColor: "text-blue-700",
    },
  ];

  const departments = [
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Dermatology",
    "Oncology",
    "Gynecology",
    "Pediatrics",
    "Radiology",
  ];

  return (
    <>
      <Navbar />

      <div className="bg-[#F7FAFC]">

        {/* Search Bar */}
        
<section className="relative z-20 -mt-10 px-6">
  <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-4 grid md:grid-cols-3 gap-4">

    <div className="flex items-center border rounded-xl px-4">
      <MapPin className="text-teal-700 mr-2"/>
      <input
        placeholder="Your Location"
        className="w-full py-3 outline-none"
      />
    </div>

    <div className="flex items-center border rounded-xl px-4">
      <Search className="text-teal-700 mr-2"/>
      <input
        placeholder="Search doctors, hospitals..."
        className="w-full py-3 outline-none"
      />
    </div>

    <button className="bg-teal-700 text-white rounded-xl font-bold hover:bg-teal-800">
      Search
    </button>

  </div>
</section>
        {/* Hero Banner */}
        
{/* FULL SCREEN HERO */}
<section className="relative w-full min-h-[92vh] bg-gradient-to-br from-[#006D77] via-[#007A83] to-[#008B8B] overflow-hidden">

  {/* Background Circles */}
  <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl"></div>
  <div className="absolute bottom-0 -right-20 w-[500px] h-[500px] bg-teal-300/10 rounded-full blur-3xl"></div>

  <div className="grid lg:grid-cols-2 min-h-[92vh] items-center">

    {/* LEFT CONTENT */}
    <div className="px-8 lg:px-20 py-16 text-white">

      <p className="uppercase tracking-[6px] text-teal-100 text-sm">
        MEDICARE HOSPITAL
      </p>

      <h1 className="text-5xl md:text-6xl xl:text-7xl font-black leading-tight mt-6">
        The MediCare
        <br />
        World of Care
      </h1>

      <p className="mt-6 text-xl text-teal-100 leading-9 max-w-xl">
        Trusted doctors, secure appointments, emergency support,
        and world-class healthcare for every patient.
      </p>

      <div className="flex flex-wrap gap-5 mt-10">

        <button
          onClick={() => navigate("/doctors")}
          className="bg-yellow-400 text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition duration-300 shadow-xl"
        >
          Book Appointment
        </button>

        <button className="border border-white px-8 py-4 rounded-full hover:bg-white hover:text-teal-800 transition duration-300">
          Learn More
        </button>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-5 mt-12 max-w-xl">

        <Stat value="11,000+" label="Treatments" />
        <Stat value="700+" label="Doctors" />
        <Stat value="6,000+" label="Patients" />
        <Stat value="10,000+" label="Health Checks" />

      </div>

    </div>

    {/* RIGHT IMAGE */}
    <div className="relative h-full flex items-end justify-center">

      <img
        src="/images/hero-doctors.png"
        alt="Doctors"
        className="h-[90vh] object-contain z-10"
      />

      {/* Floating Cards */}

      <div className="absolute top-20 left-6 bg-white text-teal-700 rounded-2xl px-5 py-4 shadow-2xl">
        ❤️ 24×7 Emergency
      </div>

      <div className="absolute bottom-28 right-8 bg-white text-teal-700 rounded-2xl px-5 py-4 shadow-2xl">
        ⭐ 98% Satisfaction
      </div>

      <div className="absolute top-1/2 right-6 bg-white text-teal-700 rounded-2xl px-5 py-4 shadow-2xl">
        👨‍⚕️ 700+ Specialists
      </div>

    </div>

  </div>

</section>
        {/* Service Cards */}
        <section className="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}

          </div>
        </section>

        {/* Clinical Excellence */}
        <section className="max-w-6xl mx-auto px-6 mt-16">
          <div className="bg-white rounded-[30px] shadow-lg p-8 grid lg:grid-cols-2 gap-8 items-center">

            <img
              src="/images/surgery.jpg"
              alt="Surgery"
              className="rounded-2xl w-full h-[320px] object-cover"
            />

            <div>

              <span className="bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm">
                Clinical Excellence
              </span>

              <h2 className="text-4xl font-bold mt-5">
                Explore Our Centres of Excellence
              </h2>

              <p className="text-gray-600 mt-5 leading-8">
                Advanced departments equipped with experienced doctors and
                modern medical technology.
              </p>

              <div className="grid grid-cols-2 gap-3 mt-6">

                {departments.map((dept) => (
                  <button
                    key={dept}
                    className="border rounded-xl py-3 hover:bg-teal-700 hover:text-white transition"
                  >
                    {dept}
                  </button>
                ))}

              </div>

            </div>

          </div>
        </section>

        {/* Featured Doctors */}
        <section className="max-w-6xl mx-auto px-6 mt-16">

          <div className="flex justify-between items-center mb-8">

            <div>

              <h2 className="text-4xl font-bold text-teal-800">
                Our Expert Doctors
              </h2>

              <p className="text-gray-500 mt-2">
                Experienced specialists ready to help you.
              </p>

            </div>

            <button
              onClick={() => navigate("/doctors")}
              className="text-teal-700 font-semibold"
            >
              View All →
            </button>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}

          </div>

        </section>

        {/* Why Choose Us */}
        <section className="max-w-6xl mx-auto px-6 mt-16 mb-16">

          <div className="rounded-[30px] bg-gradient-to-r from-[#006D77] to-[#008B8B] text-white p-10 grid lg:grid-cols-2 gap-10 items-center">

            <div>

              <h2 className="text-4xl font-bold">
                Why Choose MediCare?
              </h2>

              <p className="mt-5 text-teal-100 leading-8">
                Advanced treatment, trusted specialists,
                secure appointments,
                and compassionate patient care.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8">

                <MiniFeature title="Experienced Doctors" />
                <MiniFeature title="Advanced Technology" />
                <MiniFeature title="Personalized Care" />
                <MiniFeature title="24×7 Emergency" />

              </div>

              <button className="mt-8 bg-yellow-400 text-black px-6 py-3 rounded-full font-bold flex items-center gap-2">
                <Phone size={20} />
                Call Emergency
              </button>

            </div>

            <img
              src="/images/hospital-building.jpg"
              alt="Hospital"
              className="rounded-2xl w-full h-[330px] object-cover"
            />

          </div>

        </section>

      </div>

      <Footer />
    </>
  );
}

function Stat({ value, label }) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-teal-100 mt-1">{label}</p>
    </div>
  );
}

function MiniFeature({ title }) {
  return (
    <div className="bg-white/10 rounded-xl p-4 text-center">
      <TestTube className="mx-auto mb-2" />
      <p className="text-sm">{title}</p>
    </div>
  );
}