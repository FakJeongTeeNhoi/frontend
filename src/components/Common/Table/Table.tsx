import React from "react";

interface TableProps {
  headers: string[];
  rows: React.ReactNode;
}

export default function Table({ headers, rows }: TableProps) {
  return (
    <table className="table-auto w-full bg-white border border-gray-300">
      <thead className="bg-gray-100 text-gray-800 font-normal">
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="px-4 py-2">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}
