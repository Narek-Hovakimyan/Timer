import React, { useEffect, useState } from "react";

function Timer() {
  const [time,] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [hours, setHours] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    let timeoutID = null;
    if (isStarted) {
      timeoutID = setTimeout(() => {
        setSeconds(seconds - 1);
        if (seconds === 0) {
          setMinutes(minutes - 1)
          setSeconds(seconds + 59)
        } else if (minutes === 0 && seconds === 1) {
          setHours(hours - 1)
          setMinutes(minutes + 60)
        }
        
        if (minutes === 0 && hours === 0 && seconds === 1) {
          setHours(hours)
          setMinutes(minutes)
          setIsStarted(false)
        }
      }, 1000);
    }
    return () => {
      clearTimeout(timeoutID);
    };
  }, [isStarted, seconds, minutes, hours, time]);

  const handleStart = () => {
    if (time <= 0) {
      handleCalcTime(+value)
      setIsStarted(true);
      setValue("");
    }
  };
  const handleCalcTime = (time) => {
    let
      second = 0,
      minute = 0,
      hour = 0
    for (let i = time; i > 0; i--) {
      second++
      if (second === 60) {
        second = 0
        minute += 1
      } else if (minute === 60) {
        minute = 0
        hour += 1
      }
    }
    setHours(hour)
    setMinutes(minute)
    setSeconds(second)
  }
  return (
    <div>
      <input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        type={"number"}
      />
      <button disabled={!value.trim()} onClick={handleStart}>
        start time
      </button>
      <h1>Timer : {`${hours} : ${minutes} : ${seconds}`} </h1>
      {hours === 0 && minutes === 0 && seconds>0 && (
        <button onClick={() => setIsStarted(!isStarted)}>
          {isStarted ? "pause" : "continoun"} time{" "}
        </button>
      )}
    </div>
  );
}

export default Timer;