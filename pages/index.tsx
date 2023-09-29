import Stopwatch from "@/components/stopwatch/stopwatch";
import Timer from "@/components/timer/timer";
export default function Index() {
  return (
    <div>
      <h1 className="text-5xl font-bold text-center mb-5 mt-5">Timer-Stopwatch App</h1>
      <Stopwatch />
      <Timer />
    </div>
  )
}