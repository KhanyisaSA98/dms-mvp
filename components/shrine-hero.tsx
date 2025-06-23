"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Flame, Check, Camera, Loader2 } from "lucide-react"
import { useCandleCount } from "@/hooks/use-candle-count"

interface ShrineHeroProps {
  profileImage: string
  onProfileUpload: () => void
  uploadStatus: string
}

export default function ShrineHero({ profileImage, onProfileUpload, uploadStatus }: ShrineHeroProps) {
  const { candleCount, loading: candleLoading, updating, lightCandle } = useCandleCount()
  const [candleLit, setCandleLit] = useState(false)
  const [glowIntensity, setGlowIntensity] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleLightCandle = async () => {
    if (candleLit || updating) return

    setCandleLit(true)

    // Start glow animation
    let intensity = 0
    const glowInterval = setInterval(() => {
      intensity += 0.1
      setGlowIntensity(Math.min(intensity, 1))
      if (intensity >= 1) {
        clearInterval(glowInterval)
      }
    }, 100)

    // Call Firebase function
    const success = await lightCandle()

    if (success) {
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 2000)
    }

    // Reset animation after 10 seconds
    setTimeout(() => {
      setCandleLit(false)
      setGlowIntensity(0)
    }, 10000)
  }

  return (
    <section className="relative py-8 sm:py-12 md:py-16 px-4 text-center">
      {/* Starry background effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-slate-300 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-slate-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-slate-300 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-slate-400 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Shrine Layout - Matching Reference Image */}
        <div className="relative mb-8 sm:mb-12">
          {/* Memorial Portrait - Oval Overlay on Flowers */}
          <div className="relative mb-8 sm:mb-12">
            <div className="w-80 sm:w-96 md:w-[28rem] h-64 sm:h-80 md:h-96 mx-auto relative">
              {/* Flower Base Image */}
              <div className="absolute inset-0">
                <Image
                  src="/images/flower-base.png"
                  alt="Memorial Flowers"
                  width={448}
                  height={384}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>

              {/* Oval Profile Picture Overlay */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group">
                <div className="w-48 sm:w-56 md:w-64 h-60 sm:h-70 md:h-80 relative">
                  {/* Memorial Frame with Graphite Texture and Gold/Silver Accents */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 p-1 shadow-2xl">
                    {/* Inner frame with gold/silver accents */}
                    <div className="absolute inset-1 rounded-full bg-gradient-to-br from-amber-400/20 via-slate-500/40 to-slate-400/30 p-1">
                      {/* Sacred 3D lighting effect */}
                      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-slate-800/80 via-slate-700/60 to-slate-900/90 backdrop-blur-sm shadow-inner animate-spiritual-pulse">
                        {/* Portrait Container */}
                        <div className="absolute inset-2 rounded-full overflow-hidden">
                          <Image
                            src={profileImage || "/placeholder.svg"}
                            alt="Memorial Portrait"
                            width={256}
                            height={320}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Upload overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full">
                          <Button
                            onClick={onProfileUpload}
                            className="bg-amber-600 hover:bg-amber-500 text-white shadow-lg"
                          >
                            <Camera className="w-4 h-4 mr-2" />
                            <span className="hidden sm:inline">Update Portrait</span>
                            <span className="sm:hidden">Update</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Subtle corner accents */}
                  <div className="absolute -top-2 -left-2 w-4 h-4 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full opacity-60 animate-pulse"></div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-slate-300 to-slate-500 rounded-full opacity-60 animate-pulse delay-1000"></div>
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-slate-300 to-slate-500 rounded-full opacity-60 animate-pulse delay-500"></div>
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full opacity-60 animate-pulse delay-1500"></div>
                </div>
              </div>
            </div>

            {/* Upload Status */}
            {uploadStatus && (
              <div className="mt-6 p-3 bg-green-600/20 border border-green-500/50 rounded-lg max-w-sm mx-auto">
                <p className="text-green-400 text-sm flex items-center justify-center">
                  <Check className="w-4 h-4 mr-2" />
                  {uploadStatus}
                </p>
              </div>
            )}
          </div>

          {/* Shrine Arrangement */}
          <div className="relative flex items-end justify-center">
            {/* Left Flowers */}
            <div className="absolute left-0 sm:left-8 md:left-16 bottom-0 w-32 sm:w-48 md:w-64 h-24 sm:h-36 md:h-48">
              <Image
                src="/images/flowers-arrangement.png"
                alt="Memorial Flowers Left"
                width={256}
                height={192}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Right Flowers (Flipped) */}
            <div className="absolute right-0 sm:right-8 md:right-16 bottom-0 w-32 sm:w-48 md:w-64 h-24 sm:h-36 md:h-48">
              <Image
                src="/images/flowers-arrangement.png"
                alt="Memorial Flowers Right"
                width={256}
                height={192}
                className="w-full h-full object-contain scale-x-[-1]"
              />
            </div>

            {/* Candle Section */}
            <div className="relative z-10">
              {/* Base Candles */}
              <div className="relative w-40 sm:w-56 md:w-72 h-24 sm:h-32 md:h-40">
                <Image
                  src="/images/candles-base.png"
                  alt="Memorial Candles"
                  width={288}
                  height={160}
                  className="w-full h-full object-contain"
                />

                {/* Single Candle Overlay for Animation */}
                {candleLit && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-16 sm:w-20 md:w-24 h-20 sm:h-24 md:h-28">
                      <Image
                        src="/images/single-candle-lit.png"
                        alt="Lit Candle"
                        width={96}
                        height={112}
                        className="w-full h-full object-contain animate-pulse"
                      />

                      {/* Sacred Glow Effect */}
                      <div
                        className="absolute inset-0 bg-gradient-radial from-amber-300/40 via-orange-400/20 to-transparent rounded-full animate-pulse"
                        style={{
                          transform: `scale(${1 + glowIntensity * 2})`,
                          opacity: glowIntensity * 0.8,
                        }}
                      ></div>
                      <div
                        className="absolute inset-0 bg-gradient-radial from-amber-400/30 via-yellow-300/15 to-transparent rounded-full animate-pulse"
                        style={{
                          transform: `scale(${1 + glowIntensity * 3})`,
                          opacity: glowIntensity * 0.6,
                        }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Shrine Illumination */}
                {candleLit && (
                  <div
                    className="absolute inset-0 bg-gradient-radial from-amber-200/10 via-orange-300/5 to-transparent"
                    style={{
                      transform: `scale(${2 + glowIntensity * 2})`,
                      opacity: glowIntensity * 0.4,
                    }}
                  ></div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Name and Dates */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif text-slate-200 mb-4 tracking-wider">AMAIA</h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-300 font-light tracking-widest">
            MARCH 12, 1965 – JULY 27, 2023
          </p>
        </div>

        {/* Candle Lighting Section */}
        <div className="space-y-6">
          <Button
            onClick={handleLightCandle}
            disabled={candleLit || updating || candleLoading}
            className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-2xl border border-amber-400/50 transition-all duration-300 hover:scale-105 text-base sm:text-lg disabled:opacity-50"
          >
            {updating ? (
              <>
                <Loader2 className="w-5 sm:w-6 h-5 sm:h-6 mr-2 sm:mr-3 animate-spin" />
                Lighting...
              </>
            ) : (
              <>
                <Flame className="w-5 sm:w-6 h-5 sm:h-6 mr-2 sm:mr-3" />
                {candleLit ? "Candle Lit" : "Light a Candle"}
              </>
            )}
          </Button>

          <div className="space-y-2">
            {candleLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                <p className="text-slate-400 text-sm">Loading candle count...</p>
              </div>
            ) : (
              <p className="text-slate-200 text-lg sm:text-xl font-medium">{candleCount} candles lit in memory</p>
            )}
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="bg-green-600/20 border border-green-500/50 rounded-lg p-3 max-w-sm mx-auto">
              <p className="text-green-400 text-sm flex items-center justify-center">
                <Check className="w-4 h-4 mr-2" />
                Your candle has been lit in memory of Amaia
              </p>
            </div>
          )}
        </div>

        <div className="text-slate-100 text-lg sm:text-xl font-serif italic mt-8">"Remembering a life well lived"</div>
      </div>
    </section>
  )
}
