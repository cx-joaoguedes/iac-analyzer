import React, { useState } from "react";

const RelatedResultsTable = ({ data, resultId, setSelectedResult }) => {
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleSelection = (id) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id],
    );
  };

  const isSelected = (id) => selectedIds.includes(id);

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border border-gray-300 rounded-xl">
        <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
          <tr>
            <th className="p-3">
              <input
                type="checkbox"
                checked={selectedIds.length === data.length}
                onChange={() => {
                  if (selectedIds.length === data.length) {
                    setSelectedIds([]);
                  } else {
                    setSelectedIds(data.map((item) => item.id));
                  }
                }}
              />
            </th>
            <th className="p-3">File</th>
            <th className="p-3">Line</th>
            <th className="p-3">Description</th>
            <th className="p-3">Source</th>
            <th className="p-3">Analysis</th>
            <th className="p-3">Severity</th>
            <th className="p-3">Confidence</th>
            <th className="p-3">Comment</th>
            <th className="p-3">Link</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-800">
          {data.map((item) => (
            <tr
              key={item.id}
              style={item.id === resultId ? { color: "blue" } : null}
            >
              <td className="p-3">
                <input
                  type="checkbox"
                  checked={isSelected(item.id)}
                  onChange={() => toggleSelection(item.id)}
                />
              </td>
              <td className="p-3">{item.file_name}</td>
              <td className="p-3">{item.line}</td>
              <td className="p-3">{item.description}</td>
              <td className="p-3">{item.source}</td>
              <td className="p-3">{item.analysis || "N/A"}</td>
              <td className="p-3">{item.severity}</td>
              <td className="p-3">{item.confidence || "N/A"}</td>
              <td className="p-3">{item.comment || ""}</td>
              <td className="p-3">{item.group_name || ""}</td>
              {item.id !== resultId && (
                <div>
                  <td>
                    <button
                      style={{ padding: "0.25rem 1.5rem 0.25rem 1.5rem" }}
                      onClick={() => setSelectedResult(item.id)}
                    >
                      Load
                    </button>
                  </td>
                </div>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {selectedIds.length > 0 && (
        <div className="mt-4 text-sm text-gray-600">
          {selectedIds.length} row{selectedIds.length > 1 ? "s" : ""} selected
        </div>
      )}
    </div>
  );
};

export default RelatedResultsTable;
