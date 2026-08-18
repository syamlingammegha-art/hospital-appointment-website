import { useEffect, useState } from "react";
import api from "../services/api";

export default function OPQueue() {
  const [queue, setQueue] = useState([]);

  const fetchQueue = async () => {
    const res = await api.get("/op/today");
    setQueue(res.data);
  };

  useEffect(() => {
    fetchQueue();

    const interval = setInterval(fetchQueue, 5000);

    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/op/${id}/status`, {
      status,
      room_number:
        status === "In Consultation"
          ? "Room-101"
          : null,
    });

    fetchQueue();
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Live OP Queue
      </h1>

      <div className="bg-white rounded-3xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-50">
            <tr>
              <th className="p-4">Token</th>
              <th>Patient</th>
              <th>Complaint</th>
              <th>Room</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {queue.map((item) => (
              <tr
                key={item.id}
                className="border-t"
              >

                <td className="p-4 font-bold">
                  {item.token_number}
                </td>

                <td>

                  <div className="flex items-center gap-3">

                    <img
                      src={`https://ui-avatars.com/api/?name=${item.patient_name}`}
                      className="w-10 h-10 rounded-full"
                    />

                    <div>

                      <p className="font-semibold">
                        {item.patient_name}
                      </p>

                      <p className="text-sm text-slate-500">
                        {item.phone}
                      </p>

                    </div>

                  </div>

                </td>

                <td>{item.chief_complaint}</td>

                <td>{item.room_number || "-"}</td>

                <td>

                  <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
                    {item.status}
                  </span>

                </td>

                <td>

                  <div className="flex gap-2">

                    <button
                      onClick={() =>
                        updateStatus(
                          item.id,
                          "In Consultation"
                        )
                      }
                      className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm"
                    >
                      Call
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          item.id,
                          "Completed"
                        )
                      }
                      className="bg-green-500 text-white px-3 py-2 rounded-lg text-sm"
                    >
                      Complete
                    </button>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}