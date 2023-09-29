import React, { useState, useRef, useEffect } from "react";

export default function Stopwatch() {
  const [remainingTime, setRemainingTime] = useState(0);
  const [isStopwatchActive, setIsStopwatchActive] = useState(false);
  const stopwatchRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isStopwatchActive) {
      stopwatchRef.current = setInterval(() => {
        setRemainingTime((prevRemainingTime) => prevRemainingTime + 1);
      }, 1000);
    } else {
      clearInterval(stopwatchRef.current!);
    }

    return () => {
      clearInterval(stopwatchRef.current!);
    };
  }, [isStopwatchActive]);

  const handleStartStopwatch = () => {
    if (!isStopwatchActive) {
      setIsStopwatchActive(true);
    }
  };

  const handlePauseStopwatch = () => {
    setIsStopwatchActive(false);
  };

  const handleResetStopwatch = () => {
    setIsStopwatchActive(false);
    setRemainingTime(0);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="bg-gray-100 p-4 rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Stopwatch</h1>
      <button
        onClick={handleStartStopwatch}
        className={`px-4 py-2 rounded ${
          isStopwatchActive
            ? "bg-red-500 text-white"
            : "bg-green-500 text-white"
        }`}
        disabled={isStopwatchActive}
      >
        Start Stopwatch
      </button>
      <button
        onClick={handlePauseStopwatch}
        className="px-4 py-2 ml-2 bg-yellow-500 text-white rounded"
        disabled={!isStopwatchActive}
      >
        Pause Stopwatch
      </button>
      <button
        onClick={handleResetStopwatch}
        className="px-4 py-2 ml-2 bg-blue-500 text-white rounded"
        disabled={!isStopwatchActive && remainingTime === 0}
      >
        Reset Stopwatch
      </button>
      <h2 className="text-xl mt-4">
        Elapsed Time (Stopwatch): {formatTime(remainingTime)}
      </h2>
    </div>
  );
}
