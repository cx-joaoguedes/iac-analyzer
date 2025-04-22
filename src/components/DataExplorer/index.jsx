import React, { useState } from "react";

const fetchResultsByPath = (data, path) => {
  console.log("PATH", path);
  console.log("DATA", data);
  const matchingResults = data.filter((record) => {
    return record.file_name.trim().toLowerCase() === path.trim().toLowerCase();
  });

  console.log(matchingResults);

  return matchingResults[0].id;
};

const DataExplorer = ({ dataPaths, setSelectedResult, resultsData }) => {
  const handleSelectFile = (path) => {
    setSelectedResult(fetchResultsByPath(resultsData, path));
  };

  return (
    <div>
      <h1>Data Explorer</h1>
      <div>
        {dataPaths.map((node, idx) => (
          <TreeNode key={idx} node={node} handleSelectFile={handleSelectFile} />
        ))}
      </div>
    </div>
  );
};

const TreeNode = ({ node, handleSelectFile }) => {
  const [expanded, setExpanded] = useState(false);

  const toggle = () => {
    if (node.type === "folder") {
      setExpanded(!expanded);
    } else {
      handleSelectFile(node.path);
    }
  };

  return (
    <div style={{ marginLeft: "1rem" }}>
      <div
        style={{ cursor: node.type === "folder" ? "pointer" : "default" }}
        onClick={toggle}
      >
        {node.type === "folder" ? (expanded ? "📂" : "📁") : "📄"} {node.name}
      </div>
      {expanded && node.children && (
        <div>
          {node.children.map((child, idx) => (
            <TreeNode
              key={idx}
              node={child}
              handleSelectFile={handleSelectFile}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DataExplorer;
