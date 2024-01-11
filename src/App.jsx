import { useEffect } from "react";
import Header from "./component/Header";
import Main from "./component/Main";
import { useReducer } from "react";
import Loader from "./component/Loader";
import Error from "./component/Error";
import StartScreen from "./component/StartScreen";
import Question from "./component/Question";
import NextButton from "./component/NextButton";
import "./index.css";
import Progress from "./component/Progress";
import FinishedScreen from "./component/FinishedScreen";
import Footer from "./component/Footer";
import Timer from "./component/Timer";
const initailState = {
  questions: [],
  // loading error read active finshing
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemainig: null,
};
const SEC_PER_QUES = 30;
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemainig: state.questions.length * SEC_PER_QUES,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      // return {
      //   ...state,
      //   status: "ready",
      //   index: 0,
      //   highscore: 0,
      //   answer: null,
      //   points: 0,
      // };
      return { ...initailState, questions: state.questions, status: "ready" };
    case "tick":
      return {
        ...state,
        secondsRemainig: state.secondsRemainig - 1,
        status: state.secondsRemainig === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action is Unkonw");
  }
}
function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemainig },
    dispatch,
  ] = useReducer(reducer, initailState);

  const numQuestion = questions?.length;
  const maxPossiblePoint = questions?.reduce(
    (prev, cur) => prev + cur.points,
    0
  );
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <>
      <div className="app">
        <Header />
        <Main>
          {status === "loading" && <Loader />}
          {status === "error" && <Error />}
          {status === "ready" && (
            <StartScreen numQuestion={numQuestion} dispatch={dispatch} />
          )}

          {status === "active" && (
            <>
              <Progress
                index={index}
                numQuestion={numQuestion}
                points={points}
                maxPossiblePoint={maxPossiblePoint}
                answer={answer}
              />
              <Question
                question={questions[index]}
                dispatch={dispatch}
                answer={answer}
              />
              <Footer>
                <Timer secondsRemainig={secondsRemainig} dispatch={dispatch} />
                <NextButton
                  dispatch={dispatch}
                  answer={answer}
                  index={index}
                  numQuestion={numQuestion}
                />
              </Footer>
            </>
          )}

          {status === "finished" && (
            <FinishedScreen
              maxPossiblePoint={maxPossiblePoint}
              points={points}
              highscore={highscore}
              dispatch={dispatch}
            />
          )}
        </Main>
      </div>
    </>
  );
}

export default App;
