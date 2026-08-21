import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarPlus,
  ClipboardList,
  Users,
  Stethoscope,
  FileText,
  LogOut,
  HeartPulse,
  Phone,
} from "lucide-react";
export default function StaffSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/staff-dashboard",
    },
    {
      label: "Online Requests",
      icon: ClipboardList,
      path: "/online-requests",
    },
    {
      label: "New OP",
      icon: CalendarPlus,
      path: "/op-registration",
    },
    {
      label: "Patients",
      icon: Users,
      path: "/patients",
    },
    {
      label: "Doctors",
      icon: Stethoscope,
      path: "/doctors",
    },
    {
  label: "Medical Records",
  icon: FileText,
  path: "/medical-records",
}
  ];

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[250px] bg-gradient-to-b from-[#06202E] to-[#03141E] text-white flex flex-col z-50 shadow-2xl">

      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-teal-400 flex items-center justify-center shadow-lg">
            <HeartPulse size={28} className="text-[#06202E]" />
          </div>

          <div>
            <h1 className="text-xl font-bold">MediCare</h1>
            <p className="text-[10px] tracking-[0.3em] text-slate-300">
              STAFF PORTAL
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-5">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;

            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                  active
                    ? "bg-teal-500 shadow-lg scale-[1.02]"
                    : "hover:bg-white/10 hover:translate-x-1"
                }`}
              >
                <Icon size={20} />
                <span className="text-[15px] font-medium">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Emergency */}
      <div className="px-4 pb-4">
        <button
          onClick={() => (window.location.href = "tel:108")}
          className="w-full bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-4 text-left shadow-xl hover:scale-[1.02] transition"
        >
          <div className="flex items-center gap-3">
            <Phone size={24} />
            <div>
              <p className="font-bold">Emergency</p>
              <p className="text-xs text-red-100">24/7 Ambulance Support</p>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <p className="text-sm font-semibold">Call 108</p>
            <span className="text-lg">→</span>
          </div>
        </button>
      </div>

      {/* Logout */}
      <div className="border-t border-white/10 px-5 py-5">
        <button
          onClick={logout}
          className="flex items-center gap-3 hover:text-red-300 transition"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}