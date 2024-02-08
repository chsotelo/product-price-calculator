import React from "react";

export const RecordSummary = ({ record, onExpand }) => {
  return (
    <div
      className="bg-gray-800 p-4 mb-4 rounded cursor-pointer"
      onClick={() => onExpand(record)}>
      <p className="text-white">
        {record.caliber.name} - {record.caliber.denomination}
      </p>
      <p className="text-gray-400">Place: {record.place}</p>
      <p className="text-gray-400">Total Amount: ${record.totalAmount}</p>
    </div>
  );
};
