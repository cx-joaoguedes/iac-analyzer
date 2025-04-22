import React, { useRef, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

const SourceCodeViewer = ({ filePath, sourceData, resultData }) => {
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const [decorationIds, setDecorationIds] = useState([]);

  const handleEditorMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // If we already have a line to highlight, do it after mount
    if (resultData?.line) {
      highlightLine(resultData.line);
    }
  };

  const highlightLine = (lineNumber) => {
    const editor = editorRef.current;
    const monaco = monacoRef.current;

    if (!editor || !monaco || !lineNumber) return;

    const model = editor.getModel();
    const totalLines = model.getLineCount();

    if (lineNumber > totalLines) return;

    const decorations = [
      {
        range: new monaco.Range(lineNumber, 1, lineNumber, 1),
        options: {
          isWholeLine: true,
          className: "highlight-line",
        },
      },
    ];

    const newIds = editor.deltaDecorations(decorationIds, decorations);
    setDecorationIds(newIds);

    // Scroll to the highlighted line
    editor.revealLineInCenter(lineNumber);
  };

  useEffect(() => {
    if (editorRef.current && monacoRef.current && resultData?.line) {
      highlightLine(resultData.line);
    }
  }, [resultData?.line, sourceData?.data]);

  return (
    <div>
      <h1>Source Code</h1>
      <h4>
        <a
          href={sourceData?.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontWeight: "normal",
            color: "blue",
            textDecoration: "underline",
          }}
        >
          {filePath}
        </a>
      </h4>

      {sourceData && (
        <Editor
          height="40vh"
          defaultLanguage="javascript"
          value={sourceData.data}
          options={{ readOnly: true }}
          onMount={handleEditorMount}
        />
      )}

      <style>
        {`
          .monaco-editor .highlight-line {
            background-color: rgba(173, 216, 230, 1);
          }
        `}
      </style>
    </div>
  );
};

export default SourceCodeViewer;
