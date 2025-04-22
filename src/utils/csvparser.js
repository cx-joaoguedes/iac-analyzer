import Papa from "papaparse";
import { v4 as uuidv4 } from "uuid";

const normalizePath = (p) => p.replace(/^\/+/, "");

export const parseCSV = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const parsedResults = results.data.map((item) => ({
          ...item,
          file_name: normalizePath(item.file_name),
          line: parseInt(item.line, 10) || 0,
          analysis: item.analysis ?? "Not Analyzed",
          id: item.id ?? uuidv4(),
          comment: item.comment ?? "",
          group_name: item.group_name ?? "Not Set",
        }));
        resolve({
          data: parsedResults,
          fileName: file.name,
          fileSize: file.size,
        });
      },
      error: (err) => {
        reject(err);
      },
    });
  });
};

export const saveCSV = (resultData, groupData) => {
  // Filenames
  const csv_filename = "result_data.csv";
  const json_filename = "groups.json";
  // Convert JSON data to CSV string
  const csv = Papa.unparse(resultData);
  const json = JSON.stringify(groupData);

  // Create a Blob from the CSV string
  const csv_blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const json_blob = new Blob([json], { type: "text/json;charset=utf-8;" });

  // Create a temporary anchor element to trigger the download
  const csv_link = document.createElement("a");
  const csv_url = URL.createObjectURL(csv_blob);
  csv_link.setAttribute("href", csv_url);
  csv_link.setAttribute("download", csv_filename);
  csv_link.style.visibility = "hidden";

  // Create a temporary anchor element to trigger the download
  const json_link = document.createElement("a");
  const json_url = URL.createObjectURL(json_blob);
  json_link.setAttribute("href", json_url);
  json_link.setAttribute("download", json_filename);
  json_link.style.visibility = "hidden";

  if (resultData.length > 0) {
    document.body.appendChild(csv_link);
    csv_link.click();
    document.body.removeChild(csv_link);
  }

  if (groupData.length > 0) {
    document.body.appendChild(json_link);
    json_link.click();
    document.body.removeChild(json_link);
  }
};
