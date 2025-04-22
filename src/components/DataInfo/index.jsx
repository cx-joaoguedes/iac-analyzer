import React, { useEffect, useState } from "react";
import { calculateGlobalStats } from "../../utils/dataStats";

import { saveCSV } from "../../utils/csvparser";

const DataInfo = ({
  csvData,
  csvMetadata,
  groupData,
  setGroupData,
  setExpandGroupsManager,
}) => {
  const [globalStats, setGlobalStats] = useState({
    total_count: 0,
    analyzed: 0,
    to_analyze: 0,
  });

  useEffect(() => {
    const globals = calculateGlobalStats(csvData);
    setGlobalStats(globals);
  }, [csvData]);

  const handleSaveData = () => {
    try {
      saveCSV(csvData, groupData);
    } catch (error) {
      console.error("Error exporting csv", error);
      return null;
    }
  };

  const handleGroupFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        if (!groupData.find((group) => group.group_name === "Not Set")) {
          const newGroupData = groupData.concat(json);
          setGroupData(newGroupData);
        }
        setGroupData(json);
      } catch (err) {
        console.error("Invalid JSON file:", err);
      }
    };

    reader.onerror = () => {
      console.error("Failed to read file");
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <h1>Data Info</h1>
      <h3>Results File</h3>
      <div>
        CSV File:
        {csvData && csvMetadata && csvData.length > 0
          ? ` Name: ${csvMetadata.fileName} | Size: ${csvMetadata.fileSize}`
          : "No file"}
      </div>
      <div>
        <h3>Groups File</h3>
        {!groupData || groupData.length === 1 ? (
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <div>Upload Groups File</div>
            <input
              type="file"
              accept=".json"
              onChange={handleGroupFileUpload}
            />
          </div>
        ) : (
          <button onClick={() => setExpandGroupsManager(true)}>
            Manage Groups
          </button>
        )}
      </div>
      <div>
        <h3>Data Stats</h3>
        <div>
          Total Results: {globalStats.total_count} | Analyzed Results:{" "}
          {globalStats.analyzed} | To Analyze: {globalStats.to_analyze}
        </div>
        <div>{groupData.length} Groups</div>
      </div>
      <button onClick={handleSaveData}>Save Data</button>
    </div>
  );
};

export default DataInfo;
