import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Clock3,
  UserRound,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
  CheckCircle2,
  Clock,
  XCircle,
  Stethoscope,
  Activity,
  CalendarCheck,
  Settings,
  HeartPulse,
} from "lucide-react";

export default function DoctorDashboard() {

  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);

  const [patients, setPatients] = useState([]);

  const [loading, setLoading] = useState(true);

  const [mobileMenu, setMobileMenu] =
    useState(false);


  // ==========================================
  // GET LOGGED-IN DOCTOR
  // ==========================================

  useEffect(() => {

    const storedUser =
      localStorage.getItem("user");

    const token =
      localStorage.getItem("token");

    if (!storedUser || !token) {
      navigate("/login");
      return;
    }

    try {

      const user =
        JSON.parse(storedUser);

      if (user.role !== "doctor") {
        navigate("/login");
        return;
      }

      setDoctor(user);

    } catch (error) {

      console.error(
        "User parsing error:",
        error
      );

      navigate("/login");
    }

  }, [navigate]);


  // ==========================================
  // LOAD DOCTOR QUEUE
  // ==========================================

  useEffect(() => {

    loadQueue();

  }, []);


  const loadQueue = async () => {

    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      console.log(
        "Loading doctor queue..."
      );

      const res =
        await api.get("/doctor/queue");

      console.log(
        "Doctor queue:",
        res.data
      );

      setPatients(
        Array.isArray(res.data)
          ? res.data
          : []
      );

    } catch (error) {

      console.error(
        "Failed to fetch doctor queue:",
        error.response?.data || error
      );

      if (
        error.response?.status === 401
      ) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

        return;
      }

      setPatients([]);

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };


  // ==========================================
  // TODAY
  // ==========================================

  const today =
    new Date()
      .toISOString()
      .split("T")[0];


  const todayPatients =
    patients.filter(
      (patient) =>
        patient.appointment_date === today
    );


  // ==========================================
  // STATISTICS
  // ==========================================

  const completedPatients =
    patients.filter(
      (patient) =>
        patient.status?.toLowerCase() ===
        "completed"
    );


  const pendingPatients =
    patients.filter(
      (patient) =>
        patient.status?.toLowerCase() ===
        "pending"
    );


  const cancelledPatients =
    patients.filter(
      (patient) =>
        patient.status?.toLowerCase() ===
        "cancelled"
    );


  // ==========================================
  // START CONSULTATION
  // ==========================================

  const startConsultation = (patient) => {

    navigate(
      `/consultation/${patient.id}`
    );

  };


  // ==========================================
  // STATUS STYLE
  // ==========================================

  const getStatusStyle = (status) => {

    switch (
      status?.toLowerCase()
    ) {

      case "completed":
        return "bg-green-50 text-green-600";

      case "cancelled":
        return "bg-red-50 text-red-600";

      case "confirmed":
        return "bg-blue-50 text-blue-600";

      default:
        return "bg-orange-50 text-orange-600";
    }

  };


  // ==========================================
  // SIDEBAR
  // ==========================================

  const Sidebar = () => (

    <aside
      className={`
        fixed left-0 top-0 z-50 h-screen w-72
        bg-[#06202e] text-white
        transition-transform duration-300
        lg:translate-x-0
        ${
          mobileMenu
            ? "translate-x-0"
            : "-translate-x-full"
        }
      `}
    >

      {/* Logo */}

      <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">

        <Link
          to="/doctor-dashboard"
          className="flex items-center gap-3"
        >

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-400 text-[#06202e]">

            <HeartPulse size={25} />

          </div>

          <div>

            <h1 className="text-xl font-bold">
              MediCare
            </h1>

            <p className="text-xs text-slate-400">
              Doctor Portal
            </p>

          </div>

        </Link>

        <button
          onClick={() =>
            setMobileMenu(false)
          }
          className="lg:hidden"
        >
          <X size={22} />
        </button>

      </div>


      {/* Doctor */}

      <div className="mx-5 mt-6 rounded-2xl bg-white/5 p-4">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-400 text-[#06202e]">

            {doctor?.photo ? (

              <img
                src={doctor.photo}
                alt="Doctor"
                className="h-full w-full rounded-full object-cover"
              />

            ) : (

              <Stethoscope size={22} />

            )}

          </div>

          <div className="min-w-0">

            <p className="truncate font-semibold">

              Dr.{" "}
              {doctor?.full_name ||
                doctor?.name ||
                "Doctor"}

            </p>

            <p className="text-xs text-slate-400">
              Medical Professional
            </p>

          </div>

        </div>

      </div>


      {/* Navigation */}

      <nav className="mt-8 px-4">

        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Main Menu
        </p>

        <SidebarItem
          icon={
            <LayoutDashboard
              size={19}
            />
          }
          label="Dashboard"
          active
        />

        <SidebarItem
          icon={
            <CalendarDays
              size={19}
            />
          }
          label="Appointments"
          onClick={() =>
            navigate(
              "/doctor-appointments"
            )
          }
        />

        <SidebarItem
          icon={
            <Users size={19} />
          }
          label="My Patients"
          onClick={() =>
            navigate(
              "/doctor-patients"
            )
          }
        />

        <SidebarItem
          icon={
            <Clock3 size={19} />
          }
          label="My Schedule"
          onClick={() =>
            navigate(
              "/doctor-schedule"
            )
          }
        />

        <p className="mb-3 mt-8 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Account
        </p>

        <SidebarItem
          icon={
            <UserRound size={19} />
          }
          label="My Profile"
          onClick={() =>
            navigate(
              "/doctor-profile"
            )
          }
        />

        <SidebarItem
          icon={
            <Settings size={19}
            />
          }
          label="Settings"
          onClick={() =>
            navigate(
              "/doctor-settings"
            )
          }
        />

      </nav>


      {/* Logout */}

      <div className="absolute bottom-5 left-0 w-full px-4">

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-red-500/10 hover:text-red-400"
        >

          <LogOut size={19} />

          <span className="font-medium">
            Logout
          </span>

        </button>

      </div>

    </aside>

  );


  // ==========================================
  // SIDEBAR ITEM
  // ==========================================

  const SidebarItem = ({
    icon,
    label,
    active,
    onClick,
  }) => (

    <button
      onClick={onClick}
      className={`
        mb-1 flex w-full items-center gap-3
        rounded-xl px-4 py-3
        text-sm font-medium
        transition
        ${
          active
            ? "bg-teal-400 text-[#06202e]"
            : "text-slate-300 hover:bg-white/5 hover:text-white"
        }
      `}
    >

      {icon}

      <span>
        {label}
      </span>

    </button>

  );


  // ==========================================
  // RETURN
  // ==========================================

  return (

    <div className="min-h-screen bg-[#f5f8fa]">

      <Sidebar />


      {mobileMenu && (

        <div
          onClick={() =>
            setMobileMenu(false)
          }
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />

      )}


      <main className="lg:ml-72">

        {/* HEADER */}

        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-5 sm:px-8">

          <div className="flex items-center gap-4">

            <button
              onClick={() =>
                setMobileMenu(true)
              }
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            >
              <Menu size={24} />
            </button>

            <div>

              <h1 className="text-xl font-bold text-slate-900">
                Doctor Dashboard
              </h1>

              <p className="hidden text-xs text-slate-500 sm:block">
                Manage your patients and today's queue
              </p>

            </div>

          </div>


          <div className="flex items-center gap-3">

            <button className="rounded-xl p-2.5 text-slate-500 hover:bg-slate-100">
              <Bell size={20} />
            </button>

            <div className="hidden items-center gap-3 border-l border-slate-200 pl-4 sm:flex">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-700">

                <Stethoscope size={19} />

              </div>

              <div>

                <p className="text-sm font-semibold text-slate-800">

                  Dr.{" "}
                  {doctor?.full_name ||
                    doctor?.name ||
                    "Doctor"}

                </p>

                <p className="text-xs text-slate-400">
                  Doctor
                </p>

              </div>

            </div>

          </div>

        </header>


        {/* CONTENT */}

        <div className="p-5 sm:p-8">

          {/* WELCOME */}

          <section className="mb-8 rounded-3xl bg-gradient-to-r from-[#06202e] to-[#0b5960] p-7 text-white shadow-xl">

            <p className="mb-2 text-sm font-medium text-teal-300">
              Good day, Doctor 👋
            </p>

            <h2 className="text-3xl font-bold">
              Welcome back, Dr.{" "}
              {doctor?.full_name ||
                doctor?.name ||
                "Doctor"}
            </h2>

            <p className="mt-3 text-sm text-slate-300">
              Here is your current patient queue.
            </p>

          </section>


          {/* STATISTICS */}

          <section className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

            <StatCard
              title="Today's Patients"
              value={
                todayPatients.length
              }
              icon={
                <CalendarCheck
                  size={23}
                />
              }
              iconBg="bg-blue-50"
              iconColor="text-blue-600"
            />

            <StatCard
              title="Total Patients"
              value={patients.length}
              icon={
                <Users size={23} />
              }
              iconBg="bg-purple-50"
              iconColor="text-purple-600"
            />

            <StatCard
              title="Completed"
              value={
                completedPatients.length
              }
              icon={
                <CheckCircle2
                  size={23}
                />
              }
              iconBg="bg-green-50"
              iconColor="text-green-600"
            />

            <StatCard
              title="Pending"
              value={
                pendingPatients.length
              }
              icon={
                <Clock size={23} />
              }
              iconBg="bg-orange-50"
              iconColor="text-orange-600"
            />

          </section>


          {/* PATIENT QUEUE */}

          <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-slate-100 p-6">

              <div>

                <h3 className="text-lg font-bold text-slate-900">
                  Today's Patient Queue
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Patients assigned to you
                </p>

              </div>

              <button
                onClick={loadQueue}
                className="text-sm font-semibold text-teal-600 hover:text-teal-700"
              >
                Refresh
              </button>

            </div>


            {/* LOADING */}

            {loading ? (

              <div className="flex h-60 items-center justify-center">

                <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-teal-500" />

              </div>

            ) : todayPatients.length === 0 ? (

              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">

                  <Users
                    size={28}
                    className="text-slate-400"
                  />

                </div>

                <h4 className="font-semibold text-slate-800">
                  No patients in today's queue
                </h4>

                <p className="mt-1 text-sm text-slate-500">
                  Patients assigned to you will appear here.
                </p>

              </div>

            ) : (

              <div className="divide-y divide-slate-100">

                {todayPatients.map(
                  (patient) => (

                    <div
                      key={patient.id}
                      className="flex flex-col gap-4 p-5 hover:bg-slate-50 lg:flex-row lg:items-center lg:justify-between"
                    >

                      {/* Patient */}

                      <div className="flex items-center gap-4">

                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 font-bold text-teal-700">

                          {patient.patient_name
                            ?.charAt(0)
                            .toUpperCase() ||
                            "P"}

                        </div>

                        <div>

                          <h4 className="font-semibold text-slate-800">

                            {patient.patient_name}

                          </h4>

                          <p className="text-xs text-slate-500">

                            OP:{" "}
                            {patient.op_number}

                          </p>

                          <p className="text-xs text-slate-500">

                            Age:{" "}
                            {patient.age}
                            {" • "}
                            {patient.gender}

                          </p>

                        </div>

                      </div>


                      {/* Time */}

                      <div className="flex items-center gap-2 text-sm text-slate-600">

                        <Clock3
                          size={17}
                          className="text-teal-500"
                        />

                        {patient.appointment_time ||
                          "Time not set"}

                      </div>


                      {/* Priority */}

                      <span className="w-fit rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">

                        {patient.priority ||
                          "Normal"}

                      </span>


                      {/* Status */}

                      <span
                        className={`w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                          patient.status
                        )}`}
                      >

                        {patient.status ||
                          "Pending"}

                      </span>


                      {/* Consultation */}

                      <button
                        onClick={() =>
                          startConsultation(
                            patient
                          )
                        }
                        disabled={
                          patient.status?.toLowerCase() ===
                          "completed"
                        }
                        className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                      >

                        {patient.status?.toLowerCase() ===
                        "completed"
                          ? "Completed"
                          : "Start Consultation"}

                      </button>

                    </div>

                  )
                )}

              </div>

            )}

          </section>

        </div>

      </main>

    </div>

  );
}


// ==========================================
// STAT CARD
// ==========================================

function StatCard({
  title,
  value,
  icon,
  iconBg,
  iconColor,
}) {

  return (

    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </h3>

        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconBg} ${iconColor}`}
        >
          {icon}
        </div>

      </div>

      <div className="mt-4 flex items-center gap-1 text-xs text-slate-400">

        <Activity size={13} />

        Updated automatically

      </div>

    </div>

  );
}