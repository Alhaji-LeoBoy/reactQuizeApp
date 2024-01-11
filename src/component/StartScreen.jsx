function StartScreen({ numQuestion, dispatch }) {
  return (
    <div className="start">
      <h2> Welcome to the React Quize </h2>
      <h4>{numQuestion} Questions to test your React Mastery</h4>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Lets Start
      </button>
    </div>
  );
}

export default StartScreen;
