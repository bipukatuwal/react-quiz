import React from "react";
import { Result, Button } from "antd";

export default function DisplayResult({ score, startQuiz }) {
  return (
    <Result
      status="success"
      title="Quiz Over"
      subTitle={`Your final score is ${score}`}
      extra={[
        <Button key="buy" onClick={() => startQuiz()}>
          Restart Quiz
        </Button>,
      ]}
    />
  );
}
