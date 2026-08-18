import { ArrowRight } from "lucide-react";

export default function ServiceCard({
  title,
  description,
  icon: Icon,
  color,
  iconColor,
}) {
  return (
    <div className={`${color} rounded-3xl p-6 hover:-translate-y-2 transition-all duration-300 cursor-pointer shadow-lg group`}>
      <div className="flex justify-between items-start">
        <div className={`w-16 h-16 rounded-2xl bg-white/70 flex items-center justify-center`}>
          <Icon className={iconColor} size={30} />
        </div>

        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center group-hover:rotate-45 transition">
          <ArrowRight size={18} />
        </div>
      </div>

      <h3 className="font-bold text-xl mt-5">{title}</h3>

      <p className="text-gray-600 mt-2 text-sm leading-6">
        {description}
      </p>
    </div>
  );
}