import axios from "axios";

const kics_repo_sources_url =
  "https://raw.githubusercontent.com/Checkmarx/kics/refs/heads/master/assets/queries";

export const fetchSourceCode = async (filePath) => {
  try {
    const sourcePathUrl = `${kics_repo_sources_url}/${filePath}`;
    const api_response = await axios.get(sourcePathUrl);
    console.log("API RESPONSE", api_response);

    return { data: api_response.data, url: sourcePathUrl };
  } catch (error) {
    console.error("Error fetching the source code", error);
    return null;
  }
};
