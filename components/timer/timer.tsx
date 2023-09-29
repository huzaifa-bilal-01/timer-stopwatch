import React, { useState, useRef, useEffect } from "react";

export default function Timer() {
    const [inputTimerTime, setInputTimerTime] = useState(0);
    const [remainingTime, setRemainingTime] = useState(0);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isTimerActive) {
            timerRef.current = setInterval(() => {
                setRemainingTime((prevRemainingTime) => prevRemainingTime - 1);
            }, 1000);
        } else {
            clearInterval(timerRef.current!);
        }

        return () => {
            clearInterval(timerRef.current!);
        };
    }, [isTimerActive]);

    const handleStartTimer = () => {
        if (inputTimerTime > 0 && !isTimerActive) {
            setRemainingTime(inputTimerTime);
            setIsTimerActive(true);
        }
    };

    const handlePauseTimer = () => {
        setIsTimerActive(false);
    };

    const handleResetTimer = () => {
        setIsTimerActive(false);
        setRemainingTime(0);
        setInputTimerTime(0);
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };

    return (
        <div className="bg-gray-100 p-4 rounded shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Timer</h1>
            <input
                type="number"
                min="0"
                placeholder="Enter timer time in seconds"
                className="px-2 py-1 border rounded"
                value={inputTimerTime}
                onChange={(e) => setInputTimerTime(Number(e.target.value))}
                disabled={isTimerActive}
            />
            <button
                onClick={handleStartTimer}
                className={`px-4 py-2 rounded ${isTimerActive ? "bg-red-500 text-white" : "bg-green-500 text-white"
                    }`}
                disabled={isTimerActive}
            >
                Start Timer
            </button>
            <button
                onClick={handlePauseTimer}
                className="px-4 py-2 ml-2 bg-yellow-500 text-white rounded"
                disabled={!isTimerActive}
            >
                Pause Timer
            </button>
            <button
                onClick={handleResetTimer}
                className="px-4 py-2 ml-2 bg-blue-500 text-white rounded"
                disabled={!isTimerActive && inputTimerTime === 0}
            >
                Reset Timer
            </button>
            <h2 className="text-xl mt-4">
                Remaining Time (Timer): {formatTime(remainingTime)}
            </h2>
        </div>

    );
}
