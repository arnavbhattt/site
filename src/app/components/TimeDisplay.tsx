"use client"

import { useEffect, useState } from "react"
import clsx from "clsx"

export default function TimeDisplay() {
  const [time, setTime] = useState<Date | null>(null)

  useEffect(() => {
    setTime(new Date())
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date | null) => {
    if (!date) return "--:--:--"
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  return (
    <div className="time-card rounded-2xl p-4 md:p-6 text-center">
      <div className="text-3xl md:text-4xl font-bold gradient-text">{formatTime(time)}</div>
      <div className="text-gray-400 text-base md:text-lg mt-2">Raleigh, NC</div>
    </div>
  )
} 