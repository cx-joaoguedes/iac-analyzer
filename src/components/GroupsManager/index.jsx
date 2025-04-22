import React from "react";

const GroupsManager = ({
  setExpandGroupsManager,
  groupData,
  setGroupsData,
}) => {
  const handleDelete = (index) => {
    if (groupData[index]?.group_name === "Not Set") {
      alert("Cannot delete the 'Not Set' group.");
      return;
    }
    const newGroupData = [...groupData];
    newGroupData.splice(index, 1);
    setGroupsData(newGroupData);
  };

  const handleUpdate = (index, field, value) => {
    if (groupData[index]?.group_name === "Not Set") {
      alert("Cannot update the 'Not Set' group.");
      return;
    }
    const newGroupData = groupData.map((group, i) =>
      i === index ? { ...group, [field]: value } : group,
    );
    setGroupsData(newGroupData);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Groups Manager</h1>
      <button
        style={styles.backButton}
        onClick={() => setExpandGroupsManager(false)}
      >
        Go Back
      </button>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>Group Name</th>
              <th style={styles.th}>File Name</th>
              <th style={styles.th}>Line</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Comment</th>
              <th style={styles.th}>Value</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody style={styles.tbody}>
            {groupData.map((group, index) => (
              <tr key={index} style={styles.tr}>
                <td style={styles.td}>{group.group_name ?? "No Group Name"}</td>
                <td style={styles.td}>{group.file_name ?? "No File Name"}</td>
                <td style={styles.td}>
                  <input
                    type="text"
                    value={group.line ?? ""}
                    onChange={(e) =>
                      handleUpdate(index, "line", e.target.value)
                    }
                    style={styles.input}
                    readOnly={group.group_name === "Not Set"}
                  />
                </td>
                <td style={styles.td}>
                  <input
                    type="text"
                    value={group.description ?? ""}
                    onChange={(e) =>
                      handleUpdate(index, "description", e.target.value)
                    }
                    style={styles.input}
                    readOnly={group.group_name === "Not Set"}
                  />
                </td>
                <td style={styles.td}>
                  <input
                    type="text"
                    value={group.comment ?? ""}
                    onChange={(e) =>
                      handleUpdate(index, "comment", e.target.value)
                    }
                    style={styles.input}
                    readOnly={group.group_name === "Not Set"}
                  />
                </td>
                <td style={styles.td}>
                  <input
                    type="text"
                    value={group.actual_value ?? ""}
                    onChange={(e) =>
                      handleUpdate(index, "actual_value", e.target.value)
                    }
                    style={styles.input}
                    readOnly={group.group_name === "Not Set"}
                  />
                </td>
                <td style={styles.actionsTd}>
                  {group.group_name !== "Not Set" && (
                    <button
                      style={styles.deleteButton}
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f4",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    color: "#333",
    marginBottom: "20px",
    textAlign: "center",
  },
  backButton: {
    backgroundColor: "#5cb85c",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "15px",
    fontSize: "1rem",
  },
  tableContainer: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "white",
    borderRadius: "6px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    border: "1px solid #ddd",
  },
  thead: {
    backgroundColor: "#f0f0f0",
  },
  th: {
    padding: "12px 15px",
    textAlign: "left",
    borderBottom: "2px solid #ccc",
    color: "#333",
    fontWeight: "bold",
    fontSize: "0.9rem",
  },
  tbody: {},
  tr: {
    borderBottom: "1px solid #eee",
  },
  td: {
    padding: "10px 15px",
    fontSize: "0.9rem",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "6px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "0.9rem",
    boxSizing: "border-box",
  },
  actionsTd: {
    padding: "10px 15px",
    textAlign: "center",
  },
  deleteButton: {
    backgroundColor: "#d9534f",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.8rem",
  },
};

export default GroupsManager;
