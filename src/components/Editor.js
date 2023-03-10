import React from "react";
import "./Editor.css";
import { FiMinimize2, FiMaximize2 } from "react-icons/fi";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml"; // html
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";
import { Controlled as ControlledEditor } from "react-codemirror2";

const Editor = (props) => {
  const {
    index,
    setCollapsedIndex,
    isCollapsed,
    setIsCollapsed,
    setSizes,
    displayName,
    value,
    language,
    onChange,
  } = props;

  function handleChange(editor, data, value) {
    onChange(value);
  }

  function handleExpand() {
    setCollapsedIndex(null);

    setSizes((prev) => {
      const newSizes = [15, 15, 15];
      newSizes[index] = 70;
      return newSizes;
    });

    setIsCollapsed((prev) => {
      const newIsCollapsed = [true, true, true];
      newIsCollapsed[index] = false;
      return newIsCollapsed;
    });
  }

  function handleCollapse() {
    setCollapsedIndex(index);
    setIsCollapsed((isCollapsed) => {
      if (isCollapsed.filter((ele) => ele).length === 2) {
        isCollapsed[index] = true;
        if (index === 2) isCollapsed[1] = false;
        else isCollapsed[index + 1] = false;
        setSizes((prev) => {
          prev.unshift(prev.pop());
          return prev;
        });
      } else {
        isCollapsed[index] = true;
      }
      return isCollapsed;
    });
  }

  return (
    <div className="editor" id={`${displayName}-editor`}>
      <div className="editor__header">
        <span>{displayName}</span>
        <button
          type="button"
          onClick={isCollapsed[index] ? handleExpand : handleCollapse}
        >
          {!isCollapsed[index] ? <FiMinimize2 /> : <FiMaximize2 />}
        </button>
      </div>
      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className="editor__codemirror"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: "material",
          lineNumbers: true,
          autocorrect: true,
        }}
      />
    </div>
  );
};

export default Editor;
