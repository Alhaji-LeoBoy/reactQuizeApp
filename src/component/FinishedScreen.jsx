function FinishedScreen({ maxPossiblePoint, points, highscore, dispatch }) {
  const percentage = (points / maxPossiblePoint) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <div>
      <>
        <p className="result">
          <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
          <strong>{maxPossiblePoint}</strong> ({Math.ceil(percentage)} %)
        </p>
        <p className="highscore">(Highest Score {highscore} points) </p>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "restart" })}
        >
          Restart Quize
        </button>
      </>
    </div>
  );
}

export default FinishedScreen;
