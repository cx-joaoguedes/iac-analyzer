import React, { useState, useEffect } from "react";

const ResultInfo = ({ data, updateItem, groupsData, setGroupsData }) => {
  const [selectedAnalysis, setSelectedAnalysis] = useState(
    data.analysis || "Not Analyzed",
  );
  const [comment, setComment] = useState(data.comment || "");
  const [groupName, setGroupName] = useState("");
  const [selectedGroupName, setSelectedGroupName] = useState(
    data.group_name || null,
  );

  const handleChange = (e) => {
    try {
      const newValue = e.target.value;
      setSelectedAnalysis(newValue);
      updateItem(data.id, { analysis: newValue });
    } catch (error) {
      console.error("Failed to update item", error);
      return null;
    }
  };

  const handleGroupChange = (e) => {
    const newValue = e.target.value;
    setSelectedGroupName(newValue);
    updateItem(data.id, { group_name: newValue });
  };

  const handleChangeComment = (e) => {
    const newValue = e.target.value;
    setComment(comment + newValue);
    updateItem(data.id, { comment: newValue });
  };

  const handleCreateLink = () => {
    const newGroup = {
      group_name: groupName,
      file_name: data.file_name,
      line: data.line,
      description: data.description,
      comment: data.comment,
      actual_value: data.actual_value,
    };
    setGroupsData((prev) => {
      const updated = [...prev, newGroup];
      return updated;
    });
    updateItem(data.id, { group_name: groupName });
  };

  useEffect(() => {
    console.log(data);
    console.log(groupsData);
    setSelectedAnalysis(data.analysis ?? "Not Analyzed");
    setComment(data.comment);
    setSelectedGroupName(data.group_name ?? "Not Set");
  }, [data, groupsData]);

  return (
    <div
      style={{ padding: "1rem", border: "1px solid #ddd", borderRadius: "8px" }}
    >
      <h2>Result Details</h2>
      <div style={{ display: "flex", gap: "1rem" }}>
        <input
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <button onClick={handleCreateLink}>Create Link on this result</button>
      </div>
      <p>
        <strong>File Name:</strong> {data.file_name}
      </p>
      <p>
        <strong>Source:</strong> {data.source}
      </p>
      <p>
        <strong>Line:</strong> {data.line}
      </p>
      <p>
        <strong>Description:</strong> {data.description}
      </p>
      <p>
        <strong>Confidence:</strong> {parseInt(data.confidence)}
      </p>
      <p>
        <strong>Actual Value:</strong> {data.actual_value}
      </p>
      <p>
        <strong>Severity:</strong> {data.severity}
      </p>
      <p>
        <strong>Linked Results:</strong> {data.linkedResults}
      </p>
      <p>
        <strong>Identifier:</strong> {data.id}
      </p>
      <div style={{ marginTop: "1rem" }}>
        <label htmlFor="analysis-select">
          <strong>Analysis:</strong>
        </label>
        <select
          id="analysis-select"
          value={selectedAnalysis}
          onChange={handleChange}
          style={{ marginLeft: "0.5rem", padding: "0.3rem" }}
        >
          <option value="True Positive">True Positive</option>
          <option value="False Positive">False Positive</option>
          <option value="Not Exploitable">Not Exploitable</option>
          <option value="Not Analyzed">Not Analyzed</option>
        </select>
      </div>
      <div style={{ marginTop: "1rem" }}>
        <label htmlFor="comment">
          <strong>Comment:</strong>
        </label>
        <textarea
          id="comment"
          rows="5"
          cols="50"
          onChange={handleChangeComment}
        >
          {comment}
        </textarea>
      </div>
      <div style={{ marginTop: "1rem" }}>
        <label htmlFor="link-group">
          <strong>Link Group:</strong>
        </label>
        <select
          id="link-group"
          value={selectedGroupName}
          onChange={handleGroupChange}
        >
          {groupsData.map((group) => (
            <option>{group.group_name}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ResultInfo;
