export const parseFilePaths = (data) => {
  const parsedPaths = data.map((file) => file.file_name);
  const uniquePaths = new Set(parsedPaths);
  const fileTree = buildFileTree(Array.from(uniquePaths));
  return fileTree;
};

export function buildFileTree(paths) {
  const root = [];

  const isFile = (segment) => /\.[^\/]+$/.test(segment); // Checks for file extension

  for (const fullPath of paths) {
    const parts = fullPath.split("/").filter(Boolean);
    let current = root;
    let pathSoFar = "";

    for (let i = 0; i < parts.length; i++) {
      const name = parts[i];
      pathSoFar += (pathSoFar ? "/" : "") + name;

      const existing = current.find((item) => item.name === name);

      if (existing) {
        current = existing.children ?? [];
      } else {
        const isLast = i === parts.length - 1;
        const fileLike =
          isFile(name) ||
          (isLast && !paths.some((p) => p.startsWith(fullPath + "/")));

        const newNode = {
          name,
          path: pathSoFar,
          type: fileLike ? "file" : "folder",
          ...(fileLike ? {} : { children: [] }),
        };

        current.push(newNode);

        if (!fileLike) {
          current = newNode.children;
        }
      }
    }
  }

  return root;
}
