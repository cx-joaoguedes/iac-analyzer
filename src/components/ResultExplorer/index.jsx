import React, { useEffect, useState } from "react";
import { fetchSourceCode } from "../../utils/github";
import SourceCodeViewer from "../SourceCodeViewer";
import ResultInfo from "../ResultInfo";
import RelatedResults from "../RelatedResults";

const ResultExplorer = ({
  data,
  resultId,
  setSelectedResult,
  updateItem,
  groupData,
  setGroupsData,
}) => {
  const [resultData, setResultData] = useState(null);
  const [relatedResults, setRelatedResults] = useState([]);
  const [fileSource, setFileSource] = useState(null);
  const [currentFilePath, setCurrentFilePath] = useState(null);
  const [fileGroups, setFileGroups] = useState([]);

  const fetchResultData = (id) => {
    return data.find((record) => record.id === id) || null;
  };

  const fetchRelatedResults = (path) => {
    return data.filter(
      (record) =>
        record.file_name.trim().toLowerCase() === path.trim().toLowerCase(),
    );
  };

  const fetchGroups = (path) => {
    return groupData.filter(
      (group) =>
        group.file_name === null ||
        group.file_name.trim().toLowerCase() === path.trim().toLowerCase() ||
        group.file_name === "Not Set",
    );
  };

  const handleGoBack = () => {
    setSelectedResult(null);
    setResultData(null);
    setRelatedResults([]);
    setCurrentFilePath(null);
  };

  useEffect(() => {
    const resultMatchingData = fetchResultData(resultId);
    if (!resultMatchingData) return;

    const relatedMatchingData = fetchRelatedResults(
      resultMatchingData.file_name,
    );

    const matchingGroups = fetchGroups(resultMatchingData.file_name);

    const loadFileSource = async () => {
      if (currentFilePath !== resultMatchingData.file_name) {
        const fileSourceData = await fetchSourceCode(
          resultMatchingData.file_name,
        );
        setFileSource(fileSourceData);
      }

      setResultData(resultMatchingData);
      setRelatedResults(relatedMatchingData);
      setCurrentFilePath(resultMatchingData.file_name);
      setFileGroups(matchingGroups);
    };

    loadFileSource();
  }, [resultId, data]);

  return (
    <div>
      <button onClick={handleGoBack}>Go Back</button>
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        {/* Top Half */}
        <div style={{ display: "flex", flex: "0 0 50%" }}>
          <div style={{ flex: "0 0 60%", overflow: "auto" }}>
            {fileSource && (
              <SourceCodeViewer
                filePath={currentFilePath}
                sourceData={fileSource}
                resultData={resultData}
              />
            )}
          </div>
          <div style={{ flex: "0 0 40%", overflow: "auto" }}>
            {resultData && (
              <ResultInfo
                data={resultData}
                updateItem={updateItem}
                groupsData={fileGroups}
                setGroupsData={setGroupsData}
              />
            )}
          </div>
        </div>

        {/* Bottom Half */}
        <div style={{ flex: "0 0 50%", overflow: "auto" }}>
          <RelatedResults
            data={relatedResults}
            resultId={resultId}
            setSelectedResult={setSelectedResult}
          />
        </div>
      </div>
    </div>
  );
};

export default ResultExplorer;
