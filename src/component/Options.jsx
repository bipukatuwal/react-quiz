import React from "react";

export default function Options({
  question,
  selectedOption,
  onOptionClick,
  isSubmitted,
}) {
  return (
    <div className="options-container">
      {question?.answerOptions?.map((option) => {
        return (
          <div
            key = {option}
            className={`option ${
              selectedOption === option
                ? "selected"
                : !isSubmitted
                ? "not-selected"
                : ""
            } ${
              isSubmitted && option === question.correctAnswer
                ? "correct-answer"
                : ""
            }`}
            onClick={() => onOptionClick(option)}
          >
            {option}
          </div>
        );
      })}
    </div>
  );
}
