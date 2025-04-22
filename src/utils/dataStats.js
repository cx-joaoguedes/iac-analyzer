export const calculateGlobalStats = (data) => {
  const stats_data = {
    total_count: data.length,
    analyzed: data.filter((record) => record.analysis != "Not Analyzed").length,
    to_analyze: data.filter((record) => record.analysis === "Not Analyzed")
      .length,
  };

  return stats_data;
};
