import React from "react";
import './Heading.css';

export default function Heading({children}) {
  return (
    <h2 className="section-title">{children}</h2>
  )
}
