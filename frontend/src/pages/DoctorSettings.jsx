import DoctorSidebar from "../components/DoctorSidebar";

export default function DoctorSettings() {
  return (
    <div className="flex">
      <DoctorSidebar />
      <main className="ml-72 p-8 w-full">
        <h1 className="text-3xl font-bold">Settings</h1>
      </main>
    </div>
  );
}