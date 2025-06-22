"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [logoVisible, setLogoVisible] = useState(false)

  useEffect(() => {
    // Fade in logo after initial mount
    const fadeInTimer = setTimeout(() => {
      setLogoVisible(true)
    }, 300)

    // Start fade out after 2.5 seconds
    const fadeOutTimer = setTimeout(() => {
      setIsVisible(false)
    }, 2500)

    // Complete splash screen after fade out animation
    const completeTimer = setTimeout(() => {
      onComplete()
    }, 3000)

    return () => {
      clearTimeout(fadeInTimer)
      clearTimeout(fadeOutTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-[100] bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="text-center">
        <div className={`transition-all duration-1000 ${logoVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          {/* Luxurious Glow Effects */}
          <div className="relative mb-8">
            {/* Outer golden glow */}
            <div className="absolute inset-0 bg-gradient-radial from-amber-400/20 via-yellow-500/10 to-transparent rounded-full blur-3xl scale-150 animate-pulse"></div>
            {/* Inner candlelight glow */}
            <div className="absolute inset-0 bg-gradient-radial from-amber-300/30 via-orange-400/15 to-transparent rounded-full blur-2xl scale-125 animate-pulse"></div>

            {/* SD Analytics Logo */}
            <Image
              src="/images/sd-analytics-splash-logo.png"
              alt="SD Analytics"
              width={400}
              height={200}
              className="relative z-10 h-24 sm:h-32 md:h-40 w-auto mx-auto filter drop-shadow-2xl"
              priority
            />
          </div>

          {/* Powered by text with luxurious styling */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent blur-sm"></div>
            <p className="relative text-slate-200 text-lg sm:text-xl font-light tracking-[0.2em] font-serif">
              Powered by SD Analytics
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
