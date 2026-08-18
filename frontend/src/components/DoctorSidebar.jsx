import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Clock,
  User,
  Settings,
  LogOut,
  HeartPulse,
  Stethoscope,
} from "lucide-react";

export default function DoctorSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/doctor-dashboard" },
    { label: "Appointments", icon: CalendarDays, path: "/doctor-appointments" },
    { label: "My Patients", icon: Users, path: "/doctor-patients" },
    { label: "My Schedule", icon: Clock, path: "/doctor-schedule" },
    { label: "My Profile", icon: User, path: "/doctor-profile" },
    { label: "Settings", icon: Settings, path: "/doctor-settings" },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-72 bg-[#001E2B] text-white flex flex-col shadow-2xl">

      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-teal-400 rounded-2xl flex items-center justify-center">
            <HeartPulse size={30} className="text-black" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">MediCare</h1>
            <p className="text-slate-300">Doctor Portal</p>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="bg-white/5 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-14 h-14 bg-teal-400 rounded-full flex items-center justify-center">
            <Stethoscope className="text-black" />
          </div>

          <div>
            <p className="font-bold">Dr. Doctor</p>
            <p className="text-slate-400 text-sm">Medical Professional</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-5 space-y-2">
        <p className="text-slate-500 text-sm mb-3">MAIN MENU</p>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition ${
                active
                  ? "bg-teal-400 text-black font-semibold"
                  : "hover:bg-white/10"
              }`}
            >
              <Icon size={22} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-5">
        <button
          onClick={logout}
          className="flex items-center gap-4 text-red-300 hover:text-red-200"
        >
          <LogOut size={22} />
          Logout
        </button>
      </div>
    </aside>
  );
}