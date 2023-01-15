import "./App.css";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import Split from "react-split";
import { useState, useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";

import { boilerHtml, boilerCSS, boilerJS } from "./util/boilerPlateCode";

function App() {
  const [collapsedIndex, setCollapsedIndex] = useState(null);
  const [isCollapsed, setIsCollapsed] = useLocalStorage("collapsed", [
    false,
    false,
    false,
  ]);
  const [html, setHtml] = useLocalStorage("html", boilerHtml);
  const [css, setCss] = useLocalStorage("css", boilerCSS);
  const [js, setJs] = useLocalStorage("js", boilerJS);
  const [srcDoc, setSrcDoc] = useState("");
  const [sizes, setSizes] = useLocalStorage("sizes", [33.333, 33.333, 33.333]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html lang="en">
        <head>
          <title>Previewle></title>
          <style> ${css} </style>
        </head>
        <body>
          ${html}
          <script> ${js} </script>
        </body>
      </html>`);
    }, 500);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const handleResize = (sizes) => {
    setCollapsedIndex(null);
    console.log(sizes);
    setSizes(sizes);
    setIsCollapsed((prev) => {
      const newIsCollapsed = [false, false, false];
      if (sizes[0] < 17) newIsCollapsed[0] = true;
      if (sizes[1] < 17) newIsCollapsed[1] = true;
      if (sizes[2] < 20) newIsCollapsed[2] = true;
      return newIsCollapsed;
    });
  };

  return (
    <Split
      direction="vertical"
      sizes={[60, 40]}
      minSize={[50, 5]}
      style={{ height: "100vh" }}
    >
      <Split
        className="d-flex"
        sizes={sizes}
        minSize={[110, 95, 130]}
        expandToMin={true}
        collapsed={collapsedIndex}
        onDragEnd={handleResize}
      >
        <Editor
          sizes={sizes}
          setSizes={setSizes}
          setIsCollapsed={setIsCollapsed}
          isCollapsed={isCollapsed}
          index={0}
          setCollapsedIndex={setCollapsedIndex}
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          sizes={sizes}
          setSizes={setSizes}
          setIsCollapsed={setIsCollapsed}
          isCollapsed={isCollapsed}
          index={1}
          setCollapsedIndex={setCollapsedIndex}
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          sizes={sizes}
          setSizes={setSizes}
          setIsCollapsed={setIsCollapsed}
          isCollapsed={isCollapsed}
          index={2}
          setCollapsedIndex={setCollapsedIndex}
          language="javascript"
          displayName="Javascript"
          value={js}
          onChange={setJs}
        />
      </Split>
      <Preview srcDoc={srcDoc} />
    </Split>
  );
}

export default App;
