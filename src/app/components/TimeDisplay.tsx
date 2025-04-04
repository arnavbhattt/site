"use client"

import { useEffect, useState } from "react"

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
    <div className="time-card">
      <div className="text-2xl md:text-3xl font-bold">{formatTime(time)}</div>
      <div className="text-[--text-secondary] text-sm md:text-base mt-1">Raleigh, NC</div>
    </div>
  )
} 