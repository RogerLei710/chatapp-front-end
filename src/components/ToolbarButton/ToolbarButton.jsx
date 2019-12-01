import React from "react";
import "./ToolbarButton.css";

export default function ToolbarButton(props) {
  const { icon, func, title } = props;
  return (
    <i className={`toolbar-button ${icon}`} onClick={func} title={title} />
  );
}
