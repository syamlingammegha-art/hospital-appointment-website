import { Bell, Search } from "lucide-react";

export default function DashboardNavbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex justify-between items-center mb-8">
      <div className="relative w-[420px]">
        <Search className="absolute left-4 top-3 text-gray-400" size={20} />
        <input
          placeholder="Search doctors, appointments..."
          className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/70 backdrop-blur-lg border border-white/40 shadow"
        />
      </div>

      <div className="flex items-center gap-4">
        <Bell className="text-blue-600" />

        <div className="flex items-center gap-3 bg-white/70 backdrop-blur-lg px-4 py-2 rounded-2xl shadow">
          <img
            src="https://i.pravatar.cc/100"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">{user?.name || "Patient"}</p>
            <p className="text-xs text-gray-500">Patient</p>
          </div>
        </div>
      </div>
    </div>
  );
}