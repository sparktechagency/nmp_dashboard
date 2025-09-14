"use client"

import { useState, useEffect } from "react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface CountdownTimerProps {
  targetDate: string
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isExpired, setIsExpired] = useState(false)


  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
    const localDate = new Date("2025-09-13T11:00:00");
    const difference = localDate.getTime() - Date.now();

      if (difference <= 0) {
        setIsExpired(true)
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    // Calculate initial time
    setTimeLeft(calculateTimeLeft())

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  if (isExpired) {
    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary">Time's Up! 🎉</h2>
        <p className="text-muted-foreground mt-2">The moment has arrived!</p>
      </div>
    )
  }

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ]

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
      {timeUnits.map(({ label, value }) => (
        <div key={label} className="p-4 md:p-6 min-w-[80px] md:min-w-[100px]">
          <div className="text-center">
            <div className="text-2xl md:text-4xl font-bold text-primary tabular-nums">
              {value.toString().padStart(2, "0")}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide mt-1">{label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
