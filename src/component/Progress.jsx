function Progress({ index, numQuestion, points, maxPossiblePoint, answer }) {
  return (
    <header className="progress">
      <progress max={numQuestion} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong>/ <strong> {numQuestion}</strong>
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoint}
      </p>
    </header>
  );
}

export default Progress;
