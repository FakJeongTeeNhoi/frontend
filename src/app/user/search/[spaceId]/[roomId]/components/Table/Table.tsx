import RemoveButton from "../RemoveButton/RemoveButton";
import { ParticipantTable } from "../../page";

interface TableProps {
  participants: ParticipantTable[];
  onDelete: (userId: number) => void;
}

export default function Table({ participants, onDelete }: TableProps) {
  return (
    <div className="relative overflow-x-auto rounded-t-xl">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              USER ID
            </th>
            <th scope="col" className="px-6 py-3">
              NAME
            </th>
            <th scope="col" className="px-6 py-3">
              FACULTY
            </th>
            <th scope="col" className="px-6 py-3">
              TYPE
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant) => (
            <tr
              key={participant.userId}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-4">{participant.userId}</td>
              <td className="px-6 py-4">
                <p>{participant.name}</p>
                <p>{participant.email}</p>
              </td>
              <td className="px-6 py-4">Faculty: {participant.faculty}</td>
              <td className="px-6 py-4">{participant.type}</td>
              <td className="px-6 py-4">
                <RemoveButton
                  onClick={() => {
                    onDelete(participant.userId);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
