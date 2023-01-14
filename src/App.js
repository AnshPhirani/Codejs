import "./App.css";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import Split from "react-split";
import { useState, useEffect } from "react";

function App() {
  const [collapsedIndex, setCollapsedIndex] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState([false, false, false]);
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [srcDoc, setSrcDoc] = useState("");
  const [sizes, setSizes] = useState([33.333, 33.333, 33.333]);

  useEffect(() => {
    setHtml(`<!-- These are called comments! You can use them to leave notes about your code for yourself or other people -->
      
    <!-- Here's the html's body part of your website -->
    <header>
      <h1>Hello my name is:<br />[WRITE YOUR NAME]</h1>
    </header>  
    
    <!-- This is where you can edit the middle part of your website -->
    <main>
        <aside id="me">
          <h2>About Me</h2>
          <p>[WRITE 3 SENTENCES ABOUT YOURSELF]</p>
          
          <h2>These are my four favorite animals:</h2>
          <!-- Ordered list -->
          <ol>
            <li>[FIRST FAVORITE ANIMAL]</li>
            <li>[SECOND FAVORITE ANIMAL]</li>
            <li>[THIRD FAVORITE ANIMAL]</li>
            <li>[FOURTH FAVORITE ANIMAL]</li> 
          </ol>  
        </aside>
    
      <section id="my-family">
          <h3>About My Family</h3>
          <p>[WRITE 3 SENTENCES ABOUT YOUR FAMILY]</p>
      </section>  
    </main>  
    
    <section id="anything">
      <h3>[THIS SECTION IS ABOUT....]</h3>
      <p>[WRITE 3 SENTENCES ABOUT ANYTHING YOU WANT]</p>
    </section>
    
    <!-- This is where bottom part of your website starts -->
    <footer>
      Thanks for looking at my BEAUTIFUL website!<br />
      Coded by: Ansh Phirani on <strong>December 10th, 2023</strong>
    </footer>`);

    setCss(`/* This is how you write comments for CSS */

    /* Change the size, style, and color of your border. 
    The color names that the web accepts can be found here: https://www.w3schools.com/cssref/css_colornames.asp */
    body{
      border:5px solid black;
    }
    
    /* Edit the background and text color for your header section. */
    header {
      background-color:white;
      color:black;
      text-align:center;
    }
    
    /* Pick a new font family and size for "Hello my name is: your name" */
    h1{
      font-family:Times;
      font-size:28px;
    }
    
    /* Pick a new font family and size for "These are my four favorite animals" */
    h2{
      font-family:Times;
      font-size:24px;
    }
    
    /* Change the width of the left side of your website, watch how it also changes the right side! */
    main aside {
      background-color:lightgray;
      color:black;
      font-family:Times;
      font-size:16px;
      width: 30%;
    }
    
    /* These are the styles for the right side of your website */
    main section {
      background-color:gray;
      color:black;
      font-family:Times;
      font-size:16px;
    }
    
    section{
      background-color:linen;
      color:black;
      font-family:Times;
      font-size:16px;
    }
    
    /* These are the styles for the bottom part of your website */
    footer {
      background-color:black;
      color:white;
      font-family:Times;
      font-size:20px;
      text-align:center;
    }
    
    /*///////////////////////// 
    Feel free to explore these later, they are more advanced styles that control the layout of the site. You can read more about each property and selector here: https://www.w3schools.com/css/default.asp
    /////////////////////////*/
    * {
      box-sizing:border-box;
	}

    main {
      display:table;
      width:100%;
    }
    
    ol li {
      margin-bottom:30px;
    }
    
    main aside {
      display:table-cell;
      padding:20px;
    }
    
    main section {
      display:table-cell;
      padding:20px;
    }
    
    section {
      display:table;
      padding:20px;
      width:100%;
    }
    
    footer {
      padding:60px;
    }`);

    setJs(`// This is how you write comments for JavaScript

function sayHello(){
  console.log("Hello World!");
}
sayHello();`);
  }, []);

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
