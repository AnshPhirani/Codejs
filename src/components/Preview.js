import React from "react";
import "./Preview.css";
const Preview = ({ srcDoc }) => {
  return (
    <iframe
      className="preview"
      title="preview"
      frameBorder="0"
      sandbox="allow-scripts"
      srcDoc={srcDoc}
    ></iframe>
  );
};

export default Preview;
