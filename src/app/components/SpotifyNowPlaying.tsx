import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'

interface SpotifyData {
  isPlaying: boolean
  title: string
  artist: string
  albumImageUrl: string
  songUrl: string
  progress_ms: number
  duration_ms: number
  error?: string
}

export default function SpotifyNowPlaying() {
  const [data, setData] = useState<SpotifyData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const progressTimer = useRef<number | null>(null)
  const lastUpdateTime = useRef<number>(Date.now())

  // Function to start the smooth progress timer using requestAnimationFrame
  const startProgressTimer = () => {
    const updateProgress = () => {
      if (!data?.isPlaying) return

      const now = Date.now()
      const timePassed = now - lastUpdateTime.current
      
      setProgress(prev => {
        const newProgress = prev + timePassed
        return Math.min(newProgress, data.duration_ms)
      })
      
      lastUpdateTime.current = now
      progressTimer.current = requestAnimationFrame(updateProgress)
    }

    // Cancel any existing animation frame
    if (progressTimer.current) {
      cancelAnimationFrame(progressTimer.current)
    }

    lastUpdateTime.current = Date.now()
    progressTimer.current = requestAnimationFrame(updateProgress)
  }

  useEffect(() => {
    let fetchInterval: NodeJS.Timeout

    const fetchData = async () => {
      try {
        const response = await fetch('/api/spotify')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const newData = await response.json()
        
        // If we get new data and it's a different song or position, update immediately
        if (newData.isPlaying && (!data || 
            data.title !== newData.title || 
            Math.abs(progress - newData.progress_ms) > 3000)) {
          setProgress(newData.progress_ms)
          lastUpdateTime.current = Date.now()
        }
        
        setData(newData)
        setError(null)
      } catch (error) {
        console.error('Error fetching Spotify data:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }

    // Initial fetch and timer setup
    fetchData()
    startProgressTimer()

    // Fetch new data every 10 seconds
    fetchInterval = setInterval(fetchData, 10000)

    return () => {
      if (progressTimer.current) {
        cancelAnimationFrame(progressTimer.current)
      }
      clearInterval(fetchInterval)
    }
  }, [])

  // Effect to handle play/pause state changes
  useEffect(() => {
    if (data?.isPlaying) {
      startProgressTimer()
    } else if (progressTimer.current) {
      cancelAnimationFrame(progressTimer.current)
    }
  }, [data?.isPlaying])

  if (loading) {
    return (
      <div className="space-y-1.5">
        <h3 className="text-xs font-medium text-[--text-secondary]">What I'm Listening To</h3>
        <div className="animate-pulse rounded-lg bg-[#1a1a1a] p-3">
          <div className="h-8 bg-[#2a2a2a] rounded-md"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-1.5">
        <h3 className="text-xs font-medium text-[--text-secondary]">What I'm Listening To</h3>
        <div className="rounded-lg bg-[#1a1a1a] p-3">
          <p className="text-red-500 text-xs">Error: {error}</p>
        </div>
      </div>
    )
  }

  if (!data?.isPlaying) {
    return (
      <div className="space-y-1.5">
        <h3 className="text-xs font-medium text-[--text-secondary]">What I'm Listening To</h3>
        <div className="rounded-lg bg-[#1a1a1a] p-3">
          <p className="text-[--text-secondary] text-xs">
            {data?.error ? `Error: ${data.error}` : 'Not playing anything'}
          </p>
        </div>
      </div>
    )
  }

  const progressPercent = Math.min((progress / data.duration_ms) * 100, 100)

  return (
    <div className="space-y-1.5">
      <h3 className="text-xs font-medium text-[--text-secondary]">What I'm Listening To</h3>
      <a
        href={data.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg bg-[#1a1a1a] p-3 flex flex-col gap-3 hover:bg-[#2a2a2a] transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 flex-shrink-0">
            <Image
              src={data.albumImageUrl}
              alt={`${data.title} album art`}
              fill
              className="rounded-md object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="font-medium text-xs truncate group-hover:text-[#1DB954]">
              {data.title}
            </p>
            <p className="text-[--text-secondary] text-[11px] truncate">
              {data.artist}
            </p>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="w-full h-0.5 bg-[#2a2a2a] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#1DB954]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        
        {/* Time indicators */}
        <div className="flex justify-between text-[10px] text-[--text-secondary]">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(data.duration_ms)}</span>
        </div>
      </a>
    </div>
  )
}

function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
} 