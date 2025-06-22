"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"

export default function CollapsibleTimeline() {
  const [isExpanded, setIsExpanded] = useState(false)

  const timelineEvents = [
    {
      year: "1965",
      title: "Born in Cape Town",
      description: "Amaia entered this world on a beautiful March morning, bringing joy to her family.",
      image: "/placeholder.svg?height=100&width=100&text=Birth",
    },
    {
      year: "1987",
      title: "University Graduation",
      description: "Graduated with honors in Education, ready to shape young minds.",
      image: "/placeholder.svg?height=100&width=100&text=Graduation",
    },
    {
      year: "1992",
      title: "Marriage to David",
      description: "A beautiful ceremony surrounded by family and friends.",
      image: "/placeholder.svg?height=100&width=100&text=Wedding",
    },
    {
      year: "1995-2001",
      title: "Children Born",
      description: "Blessed with three beautiful children who became her world.",
      image: "/placeholder.svg?height=100&width=100&text=Family",
    },
    {
      year: "2010",
      title: "Retirement",
      description: "After 25 years of teaching, Amaia retired to focus on her grandchildren and garden.",
      image: "/placeholder.svg?height=100&width=100&text=Retirement",
    },
    {
      year: "2020",
      title: "Golden Anniversary",
      description: "Celebrated 50 years of marriage with a beautiful family gathering.",
      image: "/placeholder.svg?height=100&width=100&text=Anniversary",
    },
    {
      year: "2023",
      title: "Eternal Rest",
      description: "Peacefully passed surrounded by love, leaving behind a legacy of kindness.",
      image: "/placeholder.svg?height=100&width=100&text=Memorial",
    },
  ]

  const visibleEvents = isExpanded ? timelineEvents : timelineEvents.slice(0, 3)

  return (
    <section className="py-12 sm:py-16 px-4 bg-slate-900/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif text-slate-200 mb-4 flex items-center justify-center">
            <Calendar className="w-6 sm:w-8 h-6 sm:h-8 mr-3" />
            Life Timeline
          </h2>
          <p className="text-slate-300">The beautiful journey of Amaia's life</p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-slate-400 via-slate-500 to-slate-600 hidden md:block"></div>

          <div className="space-y-8 sm:space-y-12">
            {visibleEvents.map((milestone, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center transition-all duration-500 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } ${isExpanded || index < 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              >
                <div
                  className={`w-full md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"
                  } mb-4 md:mb-0`}
                >
                  <Card className="bg-slate-800/40 border-slate-600/30 backdrop-blur-sm hover:bg-slate-800/50 transition-colors">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-full overflow-hidden flex-shrink-0 order-1 sm:order-none">
                          <Image
                            src={milestone.image || "/placeholder.svg"}
                            alt={milestone.title}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                          <div className="text-xl sm:text-2xl font-bold text-amber-400 mb-2">{milestone.year}</div>
                          <h3 className="text-lg sm:text-xl font-serif text-slate-300 mb-2">{milestone.title}</h3>
                          <p className="text-slate-100 text-sm sm:text-base">{milestone.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline Dot - Hidden on mobile */}
                <div className="w-6 h-6 bg-amber-500 rounded-full border-4 border-slate-900 z-10 flex-shrink-0 hidden md:block shadow-lg"></div>

                <div className="w-full md:w-1/2"></div>
              </div>
            ))}
          </div>

          {/* Expand/Collapse Button */}
          <div className="text-center mt-8 sm:mt-12">
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-slate-700/50 hover:bg-slate-600/50 text-slate-200 border border-slate-500/30 px-6 py-3 rounded-full transition-all duration-300"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-5 h-5 mr-2" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-5 h-5 mr-2" />
                  View Full Timeline ({timelineEvents.length - 3} more events)
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
