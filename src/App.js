import "./App.css";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import Split from "react-split";
import { useState } from "react";

function App() {
  const [collapsedIndex, setCollapsedIndex] = useState(null);
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");

  const srcDoc = `
    <html>
      <body>${html}</body>
      <style>${css}</style>
      <script>${js}</script>
    </html>
  `;

  return (
    <Split
      direction="vertical"
      sizes={[60, 40]}
      minSize={[10, 10]}
      style={{ height: "100vh" }}
    >
      <Split className="d-flex" collapsed={collapsedIndex}>
        <Editor
          index={0}
          setCollapsedIndex={setCollapsedIndex}
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          index={1}
          setCollapsedIndex={setCollapsedIndex}
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          index={2}
          setCollapsedIndex={setCollapsedIndex}
          language="javascript"
          displayName="JavaSript"
          value={js}
          onChange={setJs}
        />
      </Split>
      <Preview srcDoc={srcDoc} />
    </Split>
  );
}

export default App;
