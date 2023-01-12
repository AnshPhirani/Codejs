import React from "react";
import "./Editor.css";
import { BiMinus } from "react-icons/bi";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml"; // html
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";
import { Controlled as ControlledEditor } from "react-codemirror2";

const Editor = (props) => {
  const { index, setCollapsedIndex, displayName, value, language, onChange } =
    props;

  function handleChange(editor, data, value) {
    onChange(value);
  }

  return (
    <div className="editor">
      <div className="editor__header">
        <span>{displayName}</span>
        <button
          type="button"
          onClick={() => {
            setCollapsedIndex(index);
          }}
          value="O/C"
          className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        />
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

// const EditorHeader = ({ displayName }) => {
//   // return (
//   //   <div className="bg-gray-300 relative overflow-hidden">
//   //     <div className="absolute top-2 left-2 flex flex-col space-y-2">
//   //       {children}
//   //     </div>
//   //   </div>
//   // );
// };

// const CollapseButton = ({ onClick }) => {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//     >
//       <BiMinus className="h-5 w-5" aria-hidden="true" />
//     </button>
//   );
// };

export default Editor;
