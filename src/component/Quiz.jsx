import React, { useEffect, useState } from "react";
import Question from "./Question";
import Options from "./Options";
import { Button } from "antd";
import Qdata from "../constants/Qdata";
import Score from "./Score";
import DisplayResult from "./DisplayResult";
import { UserOutlined } from "@ant-design/icons";

import { Layout } from "antd";
import Cookies from "js-cookie";
import { useHistory } from "react-router";

const { Content } = Layout;

export default function Quiz() {
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const username = Cookies.get("username");
  const history = useHistory();

  useEffect(() => {
    startQuiz(true);
  }, []);

  const onOptionClick = (selectedOption) => {
    if (!isSubmitted) {
      setSelectedOption(selectedOption);
      setIsOptionSelected(true);
    }
  };

  const startQuiz = (initialStart = false) => {
    let shuffleQuestions = getShuffledQuestions();
    setQuestions(shuffleQuestions);
    setCurrentQuestion(shuffleQuestions[0]);
    if (!initialStart) {
      setCurrentQuestionIndex(0);
      setIsGameOver(false);
      setScore(0);
      setIsOptionSelected(false);
      setSelectedOption(null);
      setIsSubmitted(false);
    }
  };

  const getShuffledQuestions = () => {
    let questions = Qdata.questions;
    questions.sort(() => 0.5 - Math.random());
    questions.forEach((question) => {
      question.answerOptions.sort(() => 0.5 - Math.random());
    });
    return questions;
  };

  const onSubmitOrNext = () => {
    if (!isSubmitted) {
      if (selectedOption === currentQuestion.correctAnswer) {
        setScore((prevScore) => ++prevScore);
      }
      setIsSubmitted(true);
    } else if (currentQuestionIndex === questions.length - 1) {
      setIsGameOver(true);
    } else {
      nextQuestion();
    }
  };

  const logout = () => {
    history.push("/login");
  };

  const nextQuestion = () => {
    const nextQuestion = questions[currentQuestionIndex + 1];
    setIsSubmitted(false);
    setSelectedOption(null);
    setIsOptionSelected(false);
    setCurrentQuestion(nextQuestion);
    setCurrentQuestionIndex((prevIndex) => ++prevIndex);
  };

  return (
    <>
      <div className="nav">
        <div className="logo">Quiz App</div>
        <div className="right-menu">
          <UserOutlined
            style={{ color: "white", fontSize: "20px", marginTop: "5px" }}
          />
          <span className="user-span"> {username ? username : ""}</span>
          <Button type="link" block onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
      <Content style={{ padding: "0 50px" }}>
        {isGameOver ? (
          <DisplayResult score={score} startQuiz={startQuiz} />
        ) : (
          <>
            <Score score={score} />
            <br />
            <Question
              question={currentQuestion.question}
              currentindex={currentQuestionIndex}
            />
            <Options
              question={currentQuestion}
              onOptionClick={onOptionClick}
              selectedOption={selectedOption}
              isSubmitted={isSubmitted}
            />
            <br />
            <Button
              type={isSubmitted ? "primary" : ""}
              disabled={!isOptionSelected}
              style={{ float: "right", marginRight: "150px", width: "100px" }}
              onClick={onSubmitOrNext}
            >
              {isSubmitted ? "Next" : "Submit"}
            </Button>
          </>
        )}
      </Content>
    </>
  );
}
