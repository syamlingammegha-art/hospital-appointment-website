export default function StatCard({ title, value, color }) {
  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/30">
      <p className="text-gray-500">{title}</p>

      <h2 className={`text-4xl font-bold ${color}`}>
        {value}
      </h2>
    </div>
  );
}