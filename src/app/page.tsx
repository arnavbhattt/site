"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import clsx from 'clsx'
import dynamic from 'next/dynamic'

// Import TimeDisplay with no SSR to prevent hydration issues
const TimeDisplay = dynamic(() => import('./components/TimeDisplay'), {
  ssr: false,
})

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("home")
  const [activeProjectTab, setActiveProjectTab] = useState("featured")
  const [activeExpTab, setActiveExpTab] = useState("work")
  const [isLoading, setIsLoading] = useState(true)

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

  // Base styles for common components
  const baseButtonStyles = "transition-all hover:scale-105"
  const baseCardStyles = "card rounded-3xl backdrop-blur-lg bg-opacity-10 hover:bg-opacity-20 transition-all"
  const baseTextStyles = "leading-relaxed"

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className={clsx(isLoading ? "opacity-0" : "animate-fade-in")}>
        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* Sidebar - Profile */}
          <aside className="lg:sticky lg:top-0 lg:h-screen w-full lg:w-[400px] xl:w-[450px] p-6">
            <div className={clsx(baseCardStyles, "p-8 md:p-10 h-full")}>
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text animate-gradient">Arnav Bhatt</h1>
                <p className="text-gray-400 text-lg md:text-xl">CS @ NCSU. I create cool things using code.</p>
              </div>

              <div className="flex justify-center space-x-8 mt-6 md:mt-8">
                <Link
                  href="mailto:ambhatt2@ncsu.edu"
                  className={clsx("text-gray-400 hover:text-white", baseButtonStyles)}
                >
                  <span className="sr-only">Email</span>
                  <svg className="h-6 w-6 md:h-8 md:w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </Link>
                <Link
                  href="https://linkedin.com/in/arnavbhat"
                  className={clsx("text-gray-400 hover:text-white", baseButtonStyles)}
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6 md:h-8 md:w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Link>
              </div>

              <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-800">
                {mounted && <TimeDisplay />}
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-h-screen flex flex-col items-center">
            {/* Navigation */}
            <nav className="glass-effect sticky top-6 z-10 rounded-3xl p-4 mx-auto mb-8 w-fit">
              <div className="flex space-x-4 md:space-x-8 lg:space-x-12">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={clsx(
                      "nav-item px-4 py-3 md:px-6 md:py-4 lg:px-10 lg:py-5",
                      "rounded-xl md:rounded-2xl text-lg md:text-xl lg:text-2xl font-semibold",
                      baseButtonStyles,
                      {
                        "text-white active bg-[#1a1a1a]": activeTab === tab.id,
                        "text-gray-400 hover:text-white": activeTab !== tab.id
                      }
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </nav>

            {/* Content Sections */}
            <div className="w-full flex-1 flex items-center justify-center p-4 md:p-8 lg:p-12">
              {/* About Section */}
              {activeTab === "home" && mounted && (
                <section className="w-full max-w-[900px] animate-fade-in">
                  <div className={clsx(baseCardStyles, "p-6 md:p-10 lg:p-12")}>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 lg:mb-10 gradient-text animate-gradient">
                      Who am I?
                    </h2>
                    <p className={clsx(baseTextStyles, "text-gray-300 text-lg md:text-xl lg:text-2xl")}>
                      I'm a Computer Science student at North Carolina State University with a strong foundation in
                      software development. Currently maintaining a GPA of 3.86, I specialize in building efficient and
                      scalable applications using modern technologies.
                    </p>
                  </div>
                </section>
              )}

              {/* Projects Section */}
              {activeTab === "projects" && mounted && (
                <section className="w-full max-w-[1000px] animate-fade-in">
                  <div className="space-y-6 md:space-y-8 lg:space-y-10">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 md:mb-8 lg:mb-12">
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text animate-gradient">
                        Projects
                      </h2>
                      <div className="flex space-x-2 md:space-x-4 bg-[#1a1a1a] rounded-xl md:rounded-2xl p-2 md:p-3">
                        {projectTabs.map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveProjectTab(tab.id)}
                            className={clsx(
                              "px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4",
                              "rounded-lg lg:rounded-xl text-base md:text-lg",
                              baseButtonStyles,
                              {
                                "bg-[#2a2a2a] text-white": activeProjectTab === tab.id,
                                "text-gray-400 hover:text-white": activeProjectTab !== tab.id
                              }
                            )}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6 md:space-y-8 lg:space-y-10">
                      <div className="card rounded-3xl p-6 md:p-8 lg:p-12 hover:scale-105 transition-all duration-300 backdrop-blur-lg bg-opacity-10 hover:bg-opacity-20">
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold">LogStream</h3>
                        <p className="text-gray-400 text-lg md:text-xl lg:text-2xl mt-4 md:mt-6 lg:mt-8">
                          A gRPC-based logging service for distributed systems with Protocol Buffer
                        </p>
                        <div className="flex flex-wrap gap-2 md:gap-3 lg:gap-4 mt-6 md:mt-8 lg:mt-10">
                          <span className="tag px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-lg lg:rounded-xl text-base lg:text-lg">
                            Go
                          </span>
                          <span className="tag px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-lg lg:rounded-xl text-base lg:text-lg">
                            gRPC
                          </span>
                          <span className="tag px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-lg lg:rounded-xl text-base lg:text-lg">
                            Protocol Buffer
                          </span>
                        </div>
                      </div>

                      <div className="card rounded-3xl p-6 md:p-8 lg:p-12 hover:scale-105 transition-all duration-300 backdrop-blur-lg bg-opacity-10 hover:bg-opacity-20">
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold">Transit Delay Service</h3>
                        <p className="text-gray-400 text-lg md:text-xl lg:text-2xl mt-4 md:mt-6 lg:mt-8">
                          Real-time transit information service for Raleigh's Metro Transit
                        </p>
                        <div className="flex flex-wrap gap-2 md:gap-3 lg:gap-4 mt-6 md:mt-8 lg:mt-10">
                          <span className="tag px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-lg lg:rounded-xl text-base lg:text-lg">
                            Java
                          </span>
                          <span className="tag px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-lg lg:rounded-xl text-base lg:text-lg">
                            Spring Boot
                          </span>
                          <span className="tag px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-lg lg:rounded-xl text-base lg:text-lg">
                            AWS
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Experience Section */}
              {activeTab === "experience" && mounted && (
                <section className="w-full max-w-[1000px] animate-fade-in">
                  <div className="space-y-6 md:space-y-8 lg:space-y-10">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 md:mb-8 lg:mb-12">
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text animate-gradient">
                        Experience
                      </h2>
                      <div className="flex space-x-2 md:space-x-4 bg-[#1a1a1a] rounded-xl md:rounded-2xl p-2 md:p-3">
                        {expTabs.map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveExpTab(tab.id)}
                            className={clsx(
                              "px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4",
                              "rounded-lg lg:rounded-xl text-base md:text-lg",
                              baseButtonStyles,
                              {
                                "bg-[#2a2a2a] text-white": activeExpTab === tab.id,
                                "text-gray-400 hover:text-white": activeExpTab !== tab.id
                              }
                            )}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6 md:space-y-8 lg:space-y-10">
                      <div className="card rounded-3xl p-6 md:p-8 lg:p-12 hover:scale-105 transition-all duration-300 backdrop-blur-lg bg-opacity-10 hover:bg-opacity-20">
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold">Amazon</h3>
                        <p className="text-gray-400 text-lg md:text-xl lg:text-2xl mt-3 md:mt-4 lg:mt-6">
                          Incoming Software Development Engineer Intern
                        </p>
                        <p className="text-gray-500 text-base md:text-lg lg:text-xl mt-2 md:mt-3">
                          May 2025 • Seattle, WA
                        </p>
                      </div>

                      <div className="card rounded-3xl p-6 md:p-8 lg:p-12 hover:scale-105 transition-all duration-300 backdrop-blur-lg bg-opacity-10 hover:bg-opacity-20">
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
                          Batista Computing Lab - NC State
                        </h3>
                        <p className="text-gray-400 text-lg md:text-xl lg:text-2xl mt-3 md:mt-4 lg:mt-6">
                          Undergraduate Researcher - Embedded ML
                        </p>
                        <p className="text-gray-500 text-base md:text-lg lg:text-xl mt-2 md:mt-3">
                          Aug. 2024 - Dec. 2024 • Raleigh, NC
                        </p>
                        <ul className="list-disc list-inside text-gray-400 space-y-3 md:space-y-4 lg:space-y-5 mt-4 md:mt-6 lg:mt-8 text-lg md:text-xl lg:text-2xl">
                          <li>
                            Engineered LOGCAT, a low-overhead intrusion classification model for Controller Area
                            Networks (CAN)
                          </li>
                          <li>
                            Designed autoboot functionality in FreeRTOS to dynamically switch between ARM and RISC-V
                            architectures
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

