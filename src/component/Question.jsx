import React from "react";

export default function Question({ question, currentindex }) {
  return (
    <div className="question-container">
      {++currentindex}. {question}
    </div>
  );
}
