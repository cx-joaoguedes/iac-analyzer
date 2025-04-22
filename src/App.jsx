import { useState } from "react";
import { parseCSV } from "./utils/csvparser";
import { parseFilePaths } from "./utils/dataOperations";

import AppInfo from "./components/AppInfo";
import DataExplorer from "./components/DataExplorer";
import DataInfo from "./components/DataInfo";
import ResultExplorer from "./components/ResultExplorer";
import GroupsManager from "./components/GroupsManager";

const default_groups = [
  {
    group_name: "Not Set",
    file_name: null,
  },
];

function App() {
  const [csvData, setCsvData] = useState([]);
  const [groupData, setGroupsData] = useState(default_groups);
  const [dataTree, setDataTree] = useState();
  const [csvMetadata, setCsvMetadata] = useState({});
  const [selectedResult, setSelectedResult] = useState(null);
  const [expandGroupsManager, setExpandGroupsManager] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const parsingResult = await parseCSV(file);
    const parsedData = parsingResult.data;
    const fileMetadata = {
      fileName: parsingResult.fileName,
      fileSize: parsingResult.fileSize,
    };
    const parsedPaths = parseFilePaths(parsedData);

    console.log(parsingResult);

    setCsvData(parsedData);
    setCsvMetadata(fileMetadata);
    setDataTree(parsedPaths);
  };

  const updateItem = (id, updatedFields) => {
    const new_data = csvData.map((item) =>
      item.id === id ? { ...item, ...updatedFields } : item,
    );
    setCsvData(new_data);
  };
  return (
    <>
      <AppInfo />

      {selectedResult ? (
        <ResultExplorer
          data={csvData}
          resultId={selectedResult}
          setSelectedResult={setSelectedResult}
          updateItem={updateItem}
          groupData={groupData}
          setGroupsData={setGroupsData}
        />
      ) : (
        <div>
          {expandGroupsManager ? (
            <GroupsManager
              setExpandGroupsManager={setExpandGroupsManager}
              groupData={groupData}
              setGroupsData={setGroupsData}
            />
          ) : (
            <div>
              {csvData && csvData.length > 0 ? (
                <div>
                  <DataInfo
                    csvData={csvData}
                    csvMetadata={csvMetadata}
                    groupData={groupData}
                    setGroupData={setGroupsData}
                    setExpandGroupsManager={setExpandGroupsManager}
                  />
                  <DataExplorer
                    resultsData={csvData}
                    dataPaths={dataTree}
                    setSelectedResult={setSelectedResult}
                  />
                </div>
              ) : (
                <div
                  style={{ display: "flex", gap: "1rem", alignItems: "center" }}
                >
                  <div>Upload Data CSV</div>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;
