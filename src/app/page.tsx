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
  const [currentTechCategory, setCurrentTechCategory] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    setMounted(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 100)
  }, [])

  useEffect(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initialTheme = savedTheme || systemTheme;
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

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

  const techCategories = [
    {
      id: "languages",
      title: "Languages",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-yellow-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
        </svg>
      ),
      color: "yellow",
      skills: [
        { name: "Java", color: "#B07219" },
        { name: "Python", color: "#3572A5" },
        { name: "Go", color: "#00ADD8" },
        { name: "JavaScript", color: "#F7DF1E" },
        { name: "TypeScript", color: "#3178C6" }
      ]
    },
    {
      id: "frontend",
      title: "Frontend",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-blue-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      ),
      color: "blue",
      skills: [
        { name: "React", color: "#61DAFB" },
        { name: "Next.js", color: "#FFFFFF" },
        { name: "Tailwind", color: "#38BDF8" },
        { name: "Vite", color: "#646CFF" }
      ]
    },
    {
      id: "backend",
      title: "Backend",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-green-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
        </svg>
      ),
      color: "green",
      skills: [
        { name: "Go", color: "#00ADD8" },
        { name: "Spring", color: "#6DB33F" },
        { name: "Node.js", color: "#339933" },
        { name: "MySQL", color: "#4479A1" }
      ]
    },
    {
      id: "cloud",
      title: "Cloud & DevOps",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-orange-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
        </svg>
      ),
      color: "orange",
      skills: [
        { name: "AWS", color: "#FF9900" },
        { name: "Docker", color: "#2496ED" },
        { name: "Kubernetes", color: "#326CE5" },
        { name: "Git", color: "#F05032" }
      ]
    },
    {
      id: "tools",
      title: "Tools & Protocols",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-purple-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
        </svg>
      ),
      color: "purple",
      skills: [
        { name: "gRPC", color: "#4B275F" },
        { name: "Postman", color: "#FF6C37" },
        { name: "REST", color: "#FFFFFF" },
        { name: "GraphQL", color: "#E10098" }
      ]
    }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (autoScrollEnabled) {
      timer = setInterval(() => {
        setCurrentTechCategory((prev) => (prev + 1) % techCategories.length);
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [autoScrollEnabled]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setAutoScrollEnabled(false);
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setStartY(clientY - scrollY);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const newScrollY = clientY - startY;
    
    // Calculate which category should be active based on scroll position
    const categoryHeight = 75;
    const newCategory = Math.round(Math.abs(newScrollY) / categoryHeight) % techCategories.length;
    setCurrentTechCategory(newCategory);
    setScrollY(newScrollY);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    // Reset scroll position and re-enable auto-scroll after a delay
    setScrollY(-currentTechCategory * 75);
    setTimeout(() => setAutoScrollEnabled(true), 5000);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setAutoScrollEnabled(false);
    
    // Determine scroll direction
    if (e.deltaY > 0) {
      // Scrolling down
      setCurrentTechCategory((prev) => (prev + 1) % techCategories.length);
    } else {
      // Scrolling up
      setCurrentTechCategory((prev) => (prev - 1 + techCategories.length) % techCategories.length);
    }
    
    // Reset scroll position
    setScrollY(-currentTechCategory * 75);
    
    // Re-enable auto-scroll after delay
    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(() => setAutoScrollEnabled(true), 5000);
  };

  let wheelTimer: NodeJS.Timeout;

  useEffect(() => {
    return () => clearTimeout(wheelTimer);
  }, []);

  // Base styles for common components
  const baseButtonStyles = "transition-all hover:scale-105"
  const baseCardStyles = "card rounded-3xl backdrop-blur-lg bg-opacity-10 hover:bg-opacity-20 transition-all"
  const baseTextStyles = "leading-relaxed"

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <div className="flex justify-center">
        {/* Left Side Fixed Content */}
        <div className="fixed left-[max(2rem,calc(50%-42rem))] w-[300px] space-y-4 mt-10">
          {/* Profile Card */}
          <aside className="card p-5 no-hover">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2 solid-blue">Arnav Bhatt</h1>
              <p className="text-[--text-secondary] mb-5 text-sm">CS @ NCSU. I create cool things using code.</p>
              
              <div className="flex justify-center space-x-8 relative z-10">
                <a
                  href="mailto:ambhatt2@ncsu.edu"
                  className="text-[--text-secondary] hover:text-[--text-primary] transition-colors p-2 rounded-full hover:bg-[--card-hover] relative"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">Email</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/arnavbhatt/"
                  className="text-[--text-secondary] hover:text-[--text-primary] transition-colors p-2 rounded-full hover:bg-[--card-hover] relative"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>

              <div className="mt-5 pt-5 border-t border-[--card-border]">
                {mounted && <TimeDisplay />}
              </div>
            </div>
          </aside>

          {/* Spotify Card */}
          <aside className="card spotify-card p-4 no-hover">
            {mounted && <SpotifyNowPlaying />}
          </aside>
        </div>

        {/* Main Content */}
        <main className="ml-[calc(300px+2rem)] flex-1 p-10 max-w-[900px]">
          {/* Navigation */}
          <nav className="glass-nav p-1 mb-8 max-w-2xl">
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
          <div className="max-w-4xl">
            {activeTab === "home" && (
              <div className="animate-fade-in space-y-6">
                <div className="card no-hover p-5">
                  <h2 className="text-xl font-semibold mb-3 gradient-text">Who am I?</h2>
                  <p className="text-[--text-secondary] leading-relaxed">
                    I'm a software engineer with a passion for building scalable applications and solving complex problems. 
                    Currently working at Amazon, I specialize in full-stack development with expertise in Go, Java, and modern web technologies.
                  </p>
                </div>

                {/* Image and Tech Stack Cards */}
                <div className="grid grid-cols-2 gap-4 max-w-[720px]">
                  {/* Image carousel */}
                  <div className="card p-4">
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

                  {/* Tech Stack Card */}
                  <div className="card p-3 h-fit">
                    <h3 className="text-sm font-semibold mb-2 gradient-text">Tech Stack</h3>
                    <div 
                      className="relative h-[75px] overflow-hidden cursor-grab active:cursor-grabbing"
                      onMouseDown={handleDragStart}
                      onMouseMove={handleDragMove}
                      onMouseUp={handleDragEnd}
                      onMouseLeave={handleDragEnd}
                      onTouchStart={handleDragStart}
                      onTouchMove={handleDragMove}
                      onTouchEnd={handleDragEnd}
                      onWheel={handleWheel}
                    >
                      <div 
                        className="absolute w-full transition-all duration-300"
                        style={{ 
                          transform: `translateY(${isDragging ? scrollY : -currentTechCategory * 75}px)`,
                          transition: isDragging ? 'none' : 'transform 300ms ease-out'
                        }}
                      >
                        {techCategories.map((category, index) => (
                          <div 
                            key={category.id}
                            className="h-[75px] transition-all duration-300"
                            style={{
                              opacity: currentTechCategory === index ? 1 : 0.15,
                              transform: `scale(${currentTechCategory === index ? 1 : 0.95})`,
                              filter: `blur(${currentTechCategory === index ? 0 : 1}px)`,
                            }}
                          >
                            <div className="group select-none">
                              <div className="flex items-center gap-2 mb-1.5">
                                <div 
                                  className="w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300"
                                  style={{
                                    backgroundColor: `${category.skills[0].color}25`,
                                    boxShadow: currentTechCategory === index ? `0 0 12px ${category.skills[0].color}15` : 'none'
                                  }}
                                >
                                  {category.icon}
                                </div>
                                <h4 className="text-xs font-medium">{category.title}</h4>
                              </div>
                              <div className="flex gap-1.5 flex-wrap">
                                {category.skills.map((skill) => (
                                  <span 
                                    key={skill.name}
                                    className="px-2 py-0.5 rounded text-[10px]"
                                    style={{
                                      backgroundColor: `${skill.color}20`,
                                      color: skill.color,
                                      borderColor: `${skill.color}40`,
                                      borderWidth: '1px',
                                      boxShadow: `inset 0 0 0.5px ${skill.color}40`
                                    }}
                                  >
                                    {skill.name}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Navigation dots */}
                    <div className="flex justify-center gap-1.5 mt-2">
                      {techCategories.map((category, index) => (
                        <button
                          key={category.id}
                          onClick={() => {
                            setCurrentTechCategory(index);
                            setScrollY(-index * 75);
                          }}
                          className="group p-1"
                          aria-label={`Go to ${category.title}`}
                        >
                          <div 
                            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                            style={{
                              backgroundColor: currentTechCategory === index 
                                ? category.skills[0].color 
                                : `${category.skills[0].color}20`,
                              transform: `scale(${currentTechCategory === index ? 1.2 : 1})`,
                              boxShadow: currentTechCategory === index 
                                ? `0 0 8px ${category.skills[0].color}40` 
                                : 'none'
                            }}
                          />
                        </button>
                      ))}
                    </div>
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
                    <div className="card p-5 hover:scale-[1.01] transition-all duration-300">
                      <h3 className="text-lg font-semibold text-[--text-primary]">LogStream</h3>
                      <p className="text-[--text-secondary] text-sm mt-2">
                        A gRPC-based logging service for distributed systems with Protocol Buffer
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="tag px-2.5 py-0.5 rounded-md text-xs">Go</span>
                        <span className="tag px-2.5 py-0.5 rounded-md text-xs">gRPC</span>
                        <span className="tag px-2.5 py-0.5 rounded-md text-xs">Protocol Buffer</span>
                      </div>
                    </div>

                    <div className="card p-5 hover:scale-[1.01] transition-all duration-300">
                      <h3 className="text-lg font-semibold text-[--text-primary]">Transit Delay Service</h3>
                      <p className="text-[--text-secondary] text-sm mt-2">
                        Real-time transit information service for Raleigh's Metro Transit
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="tag px-2.5 py-0.5 rounded-md text-xs">Java</span>
                        <span className="tag px-2.5 py-0.5 rounded-md text-xs">Spring Boot</span>
                        <span className="tag px-2.5 py-0.5 rounded-md text-xs">AWS</span>
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
                      <div className="card p-5 transition-all duration-300 group">
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
                            <h3 className="text-lg font-semibold text-[--text-primary] transition-all duration-300 group-hover:text-[#FF9900]">Amazon</h3>
                            <p className="text-xs text-[--text-secondary]">Incoming Software Development Engineer Intern • Prime Video</p>
                            <p className="text-xs text-[--text-secondary] mt-1">May 2025 • Seattle, WA</p>
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
                      <div className="card p-5 transition-all duration-300 group">
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
                            <h3 className="text-lg font-semibold text-[--text-primary] transition-all duration-300 group-hover:text-[#00A878]">WillowTree</h3>
                            <p className="text-xs text-[--text-secondary]">Software Engineer Intern</p>
                            <p className="text-xs text-[--text-secondary] mt-1">May 2024 - Aug 2024 • Durham, NC</p>
                            <p className="text-xs text-[--text-secondary] mt-2">Built OAuth 2.0 server and microservices for government savings platform</p>
                          </div>
                        </div>
                      </div>
                    </a>

                    {/* Research Experience */}
                    <div className="mt-8">
                      <div className="flex items-center gap-2 mb-4">
                        <h3 className="text-lg font-bold text-[--text-primary]">Undergrad Research</h3>
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
                        <div className="card p-5 hover:scale-[1.01] transition-all duration-300">
                          <div>
                            <h3 className="text-base font-semibold text-[--text-primary]">Batista Computing Lab</h3>
                            <p className="text-xs text-[--text-secondary]">Research Assistant</p>
                            <p className="text-xs text-[--text-secondary] mt-1">Aug 2024 - Dec 2024 • NC State</p>
                            <p className="text-xs text-[--text-secondary] mt-2">Explored ML optimization through ARM/RISC-V architecture switching</p>
                          </div>
                        </div>

                        <div className="card p-5 hover:scale-[1.01] transition-all duration-300">
                          <div>
                            <h3 className="text-base font-semibold text-[--text-primary]">PICTure Lab</h3>
                            <p className="text-xs text-[--text-secondary]">Research Assistant</p>
                            <p className="text-xs text-[--text-secondary] mt-1">Aug 2023 - May 2024 • NC State</p>
                            <p className="text-xs text-[--text-secondary] mt-2">Built real-time IoT dashboard for stroke rehab patients</p>
                          </div>
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

      <button
        onClick={toggleTheme}
        className="theme-switch"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>
    </div>
  )
}

