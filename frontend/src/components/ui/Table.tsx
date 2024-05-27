import React from "react";

interface TableProps {
  data: Record<string, any>[] | null;
  applyAdditionalStyles?: boolean; // Optional prop to toggle additional styles
}

const Table: React.FC<TableProps> = ({ data, applyAdditionalStyles = false }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const columns = Object.keys(data[0]);

  return (
    <div className={`relative overflow-x-auto ${applyAdditionalStyles ? 'shadow-md sm:rounded-lg' : ''}`}>
      <table className={`w-full text-sm text-left rtl:text-right text-gray-500 ${applyAdditionalStyles ? 'dark:text-gray-400' : ''}`}>
        <thead className={`text-xs ${applyAdditionalStyles ? 'text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400' : ''}`}>
          <tr>
            {columns.map((column) => (
              <th className="p-1.5" key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr className={`bg-white border-b ${applyAdditionalStyles ? 'dark:bg-gray-800 dark:border-gray-700' : ''}`} key={index}>
              {columns.map((column) => (
                <td className="p-1.5" key={column}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
