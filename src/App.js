import "./App.css";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import Split from "react-split";
import { useState, useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";

import { Steps } from "intro.js-react";
// import "intro.js/introjs.css";

import { boilerHtml, boilerCSS, boilerJS } from "./util/boilerPlateCode";

function App() {
  const [collapsedIndex, setCollapsedIndex] = useState(null);
  const [isCollapsed, setIsCollapsed] = useLocalStorage("collapsed", [
    false,
    false,
    false,
  ]);
  const [isTourEnabled, setIsTourEnabled] = useLocalStorage("tour", true);
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

  useEffect(() => {}, []);

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
    <>
      <Steps
        enabled={isTourEnabled}
        steps={[
          {
            title: "Hi there!",
            element: "#root",
            intro: "want a tour of the app?",
            tooltipClass: "myTooltipClass",
            highlightClass: "myHighlightClass",
          },
          {
            element: "#HTML-editor",
            intro: "write your html code here",
            position: "bottom",
            tooltipClass: "myTooltipClass",
            highlightClass: "myHighlightClass",
          },
          {
            element: "#CSS-editor",
            intro: "write your css code here",
            position: "bottom",
            tooltipClass: "myTooltipClass",
            highlightClass: "myHighlightClass",
          },
          {
            element: "#Javascript-editor",
            intro: "write your JS code here",
            position: "bottom",
            tooltipClass: "myTooltipClass",
            highlightClass: "myHighlightClass",
          },
          {
            element: ".preview",
            intro: "preview your code here",
            position: "top",
            tooltipClass: "myTooltipClass",
            highlightClass: "myHighlightClass",
          },
        ]}
        initialStep={0}
        onExit={() => {
          setIsTourEnabled(false);
        }}
        options={{
          showStepNumbers: true,
          showBullets: false,
          exitOnOverlayClick: false,
          exitOnEsc: true,
          nextLabel: "Next",
          prevLabel: "Back",
          skipLabel: "x",
          doneLabel: "Done",
        }}
      />
      <Split
        direction="vertical"
        sizes={[60, 40]}
        minSize={[50, 5]}
        style={{ height: "100%" }}
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
    </>
  );
}

export default App;
