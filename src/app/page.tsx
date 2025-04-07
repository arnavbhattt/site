"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import clsx from 'clsx'
import dynamic from 'next/dynamic'

// Import TimeDisplay with no SSR to prevent hydration issues
const TimeDisplay = dynamic(() => import('./components/TimeDisplay'), {
  ssr: false,
})

const SpotifyNowPlaying = dynamic(() => import('./components/SpotifyNowPlaying'), {
  ssr: false,
})

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("home")
  const [activeProjectTab, setActiveProjectTab] = useState("featured")
  const [activeExpTab, setActiveExpTab] = useState("work")
  const [isLoading, setIsLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    setMounted(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 100)
  }, [])

  const tabs = [
    { id: "home", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
  ]

  const projectTabs = [
    { id: "featured", label: "Featured" },
    { id: "all", label: "All Projects" },
  ]

  const expTabs = [
    { id: "work", label: "Work" },
    { id: "research", label: "Research" },
  ]

  const images = [
    "/images/coding.jpg",
    "/images/pic2.png",
    "/images/pic3.png"
  ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  // Base styles for common components
  const baseButtonStyles = "transition-all hover:scale-105"
  const baseCardStyles = "card rounded-3xl backdrop-blur-lg bg-opacity-10 hover:bg-opacity-20 transition-all"
  const baseTextStyles = "leading-relaxed"

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="flex">
        {/* Left Side Fixed Content */}
        <div className="fixed w-[300px] space-y-4 mx-10 mt-10">
          {/* Profile Card */}
          <aside className="card p-5 bg-[#111111]/80">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2 gradient-text">Arnav Bhatt</h1>
              <p className="text-[--text-secondary] mb-5 text-sm">CS @ NCSU. I create cool things using code.</p>
              
              <div className="flex justify-center space-x-8">
                <Link
                  href="mailto:ambhatt2@ncsu.edu"
                  className="text-[--text-secondary] hover:text-white transition-colors"
                >
                  <span className="sr-only">Email</span>
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </Link>
                <Link
                  href="https://linkedin.com/in/arnavbhatt"
                  className="text-[--text-secondary] hover:text-white transition-colors"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Link>
              </div>

              <div className="mt-5 pt-5 border-t border-white/5">
                {mounted && <TimeDisplay />}
              </div>
            </div>
          </aside>

          {/* Spotify Card */}
          <aside className="card p-4 bg-[#111111]/80">
            {mounted && <SpotifyNowPlaying />}
          </aside>
        </div>

        {/* Main Content */}
        <main className="ml-[350px] flex-1 p-10">
          {/* Navigation */}
          <nav className="glass-nav p-1 mb-8 bg-[#111111]/50 max-w-2xl">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={clsx(
                    "nav-item flex-1 text-center text-sm py-2",
                    activeTab === tab.id && "active"
                  )}
                >
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* Content */}
          <div className="max-w-3xl">
            {activeTab === "home" && (
              <div className="animate-fade-in space-y-6">
                <div className="card p-6 bg-[#111111]/80">
                  <h2 className="text-xl font-bold mb-4">Who am I?</h2>
                  <p className="text-[--text-secondary] text-base leading-relaxed">
                    I'm a Computer Science student at North Carolina State University with a strong foundation in
                    software development. I specialize in building efficient and
                    scalable applications using modern technologies.
                  </p>
                </div>

                {/* Image carousel */}
                <div className="card p-4 w-[350px] bg-[#111111]/80">
                  <div className="relative h-[175px] w-full">
                    <Image
                      src={images[currentImageIndex]}
                      alt="Arnav Bhatt"
                      fill
                      className={clsx(
                        "object-cover rounded-lg",
                        currentImageIndex === 0 && "object-[center_40%]"
                      )}
                      priority
                    />
                    
                    {/* Navigation arrows */}
                    <button 
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-1.5 rounded-full transition-all"
                      aria-label="Previous image"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                    
                    <button 
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-1.5 rounded-full transition-all"
                      aria-label="Next image"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "projects" && (
              <div className="animate-fade-in">
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                    <h2 className="text-xl font-bold gradient-text animate-gradient">
                      Projects
                    </h2>
                    <div className="flex space-x-2 bg-[#111111]/80 rounded-xl p-1.5">
                      {projectTabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveProjectTab(tab.id)}
                          className={clsx(
                            "px-3 py-1.5 rounded-lg text-sm",
                            baseButtonStyles,
                            {
                              "bg-[#222222] text-white": activeProjectTab === tab.id,
                              "text-gray-400 hover:text-white": activeProjectTab !== tab.id
                            }
                          )}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="card p-5 bg-[#111111]/80 hover:scale-[1.01] transition-all duration-300">
                      <h3 className="text-lg font-semibold">LogStream</h3>
                      <p className="text-gray-400 text-sm mt-2">
                        A gRPC-based logging service for distributed systems with Protocol Buffer
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="tag px-2.5 py-0.5 rounded-md text-xs">
                          Go
                        </span>
                        <span className="tag px-2.5 py-0.5 rounded-md text-xs">
                          gRPC
                        </span>
                        <span className="tag px-2.5 py-0.5 rounded-md text-xs">
                          Protocol Buffer
                        </span>
                      </div>
                    </div>

                    <div className="card p-5 bg-[#111111]/80 hover:scale-[1.01] transition-all duration-300">
                      <h3 className="text-lg font-semibold">Transit Delay Service</h3>
                      <p className="text-gray-400 text-sm mt-2">
                        Real-time transit information service for Raleigh's Metro Transit
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="tag px-2.5 py-0.5 rounded-md text-xs">
                          Java
                        </span>
                        <span className="tag px-2.5 py-0.5 rounded-md text-xs">
                          Spring Boot
                        </span>
                        <span className="tag px-2.5 py-0.5 rounded-md text-xs">
                          AWS
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "experience" && (
              <div className="animate-fade-in">
                <div className="space-y-6">
                  <h2 className="text-xl font-bold gradient-text animate-gradient">
                    Experience
                  </h2>

                  <div className="space-y-4">
                    {/* Work Experience */}
                    <a 
                      href="https://www.amazon.com/gp/video/storefront" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="card p-5 bg-[#111111]/80 transition-all duration-300 group">
                        <div className="flex items-center gap-4">
                          <div className="relative w-10 h-10 rounded-full overflow-hidden">
                            <Image
                              src="https://companieslogo.com/img/orig/AMZN-e9f942e4.png?t=1632523695"
                              alt="Amazon Logo"
                              fill
                              className="object-contain p-1"
                              priority
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "https://logo.clearbit.com/amazon.com";
                              }}
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold transition-all duration-300 group-hover:text-[#FF9900]">Amazon</h3>
                            <p className="text-xs text-gray-400">Incoming Software Development Engineer Intern • Prime Video</p>
                            <p className="text-xs text-gray-500 mt-1">May 2025 • Seattle, WA</p>
                          </div>
                        </div>
                      </div>
                    </a>

                    <a 
                      href="https://www.willowtreeapps.com" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="card p-5 bg-[#111111]/80 transition-all duration-300 group">
                        <div className="flex items-center gap-4">
                          <div className="relative w-10 h-10 rounded-full overflow-hidden">
                            <Image
                              src="/images/willowtree.png"
                              alt="WillowTree Logo"
                              fill
                              className="object-contain p-1"
                              priority
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold transition-all duration-300 group-hover:text-[#00A878]">WillowTree</h3>
                            <p className="text-xs text-gray-400">Software Engineer Intern</p>
                            <p className="text-xs text-gray-500 mt-1">May 2024 - Aug 2024 • Durham, NC</p>
                            <p className="text-xs text-gray-400 mt-2">Built OAuth 2.0 server and microservices for government savings platform</p>
                          </div>
                        </div>
                      </div>
                    </a>

                    {/* Research Experience */}
                    <div className="flex items-center gap-2 mb-4">
                      <h3 className="text-lg font-bold">Undergrad Research</h3>
                      <div className="relative w-6 h-6">
                        <Image
                          src="/images/ncsu-wolfpack.png"
                          alt="NCSU Wolfpack Logo"
                          fill
                          className="object-contain"
                          priority
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="card p-5 bg-[#111111]/80 hover:scale-[1.01] transition-all duration-300">
                        <div>
                          <h3 className="text-base font-semibold">Batista Computing Lab</h3>
                          <p className="text-xs text-gray-400">Research Assistant</p>
                          <p className="text-xs text-gray-500 mt-1">Aug 2024 - Dec 2024 • NC State</p>
                          <p className="text-xs text-gray-400 mt-2">Explored ML optimization through ARM/RISC-V architecture switching</p>
                        </div>
                      </div>

                      <div className="card p-5 bg-[#111111]/80 hover:scale-[1.01] transition-all duration-300">
                        <div>
                          <h3 className="text-base font-semibold">PICTure Lab</h3>
                          <p className="text-xs text-gray-400">Research Assistant</p>
                          <p className="text-xs text-gray-500 mt-1">Aug 2023 - May 2024 • NC State</p>
                          <p className="text-xs text-gray-400 mt-2">Built real-time IoT dashboard for stroke rehab patients</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

