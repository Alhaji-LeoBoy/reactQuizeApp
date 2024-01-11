import { useEffect } from "react";

function Timer({ secondsRemainig, dispatch }) {
  const mins = Math.floor(secondsRemainig / 60);
  const secs = secondsRemainig % 60;
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);
  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins} : {secs < 10 && "0"}
      {secs}
    </div>
  );
}

export default Timer;
