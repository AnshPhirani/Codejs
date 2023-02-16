import "./App.css";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import SplashScreen from "./components/SplashScreen";
import Split from "react-split";
import { useState, useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import useSessionStorage from "./hooks/useSessionStorage";

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
  const [showSplash, setShowSplash] = useSessionStorage("splash", true);
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

  if (showSplash) return <SplashScreen setShowSplash={setShowSplash} />;

  return (
    <>
      <Steps
        enabled={isTourEnabled}
        steps={[
          {
            title: "Hey there!",
            element: "#root",
            intro:
              "I'm super excited to give you a personal VIP tour of Codejs! Get ready to be wowed by its features and capabilities. Let's dive in and explore this amazing app together!",
            tooltipClass: "myTooltipClass",
            highlightClass: "myHighlightClass",
          },
          {
            title: "Welcome to the HTML code editor!",
            element: "#HTML-editor",
            intro:
              "Here, you can write and customize your HTML body. Just start typing your HTML code right here, and bring your website to life!",
            position: "bottom",
            tooltipClass: "myTooltipClass",
            highlightClass: "myHighlightClass",
          },
          {
            title: "Ready to add some style to your website?",
            element: "#CSS-editor",
            intro:
              "This is the place to do it! Write your CSS code here and watch your website come alive with custom styles and designs.",
            position: "bottom",
            tooltipClass: "myTooltipClass",
            highlightClass: "myHighlightClass",
          },
          {
            title: "Bring your website to life with dynamic interactivity!",
            element: "#Javascript-editor",
            intro:
              "Write your JavaScript code here and watch your site become more engaging and user-friendly.",
            position: "bottom",
            tooltipClass: "myTooltipClass",
            highlightClass: "myHighlightClass",
          },
          {
            title: "Experience your website like never before!",
            element: ".preview",
            intro:
              "Preview your website as you build it. See HTML, CSS & JS come to life in real-time.",
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
