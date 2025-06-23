"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Users, Heart, Star, TreePine, Loader2, ChevronDown, ChevronRight } from "lucide-react"
import { useFamilyTree, type FamilyMember } from "@/hooks/use-family-tree"

interface FamilyTreeModalProps {
  onClose: () => void
}

export default function FamilyTreeModal({ onClose }: FamilyTreeModalProps) {
  const { familyTree, loading } = useFamilyTree()
  const [animationPhase, setAnimationPhase] = useState(0)
  const [expandedSections, setExpandedSections] = useState({
    grandparents: true,
    parents: true,
    spouse: true,
    children: true,
    siblings: true,
    customRelations: false,
  })

  // Trigger animation phases
  useEffect(() => {
    if (!loading) {
      const timer1 = setTimeout(() => setAnimationPhase(1), 300)
      const timer2 = setTimeout(() => setAnimationPhase(2), 800)
      const timer3 = setTimeout(() => setAnimationPhase(3), 1300)
      const timer4 = setTimeout(() => setAnimationPhase(4), 1800)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
        clearTimeout(timer4)
      }
    }
  }, [loading])

  // Handle escape key and backdrop click
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [onClose])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const renderFamilyMember = (member: FamilyMember, index: number, delay = "") => (
    <div
      key={member.id}
      className={`transition-all duration-700 ${delay} ${animationPhase >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <Card className="bg-slate-700/30 border-slate-500/40 w-full sm:w-48 max-w-sm mx-auto hover:bg-slate-700/40 transition-colors">
        <CardContent className="p-4 sm:p-6 text-center">
          <div className="w-12 sm:w-16 h-12 sm:h-16 bg-slate-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
            {member.relationship.toLowerCase().includes("spouse") ||
            member.relationship.toLowerCase().includes("husband") ||
            member.relationship.toLowerCase().includes("wife") ? (
              <Heart className="w-6 sm:w-8 h-6 sm:h-8 text-slate-400" />
            ) : (
              <Users className="w-6 sm:w-8 h-6 sm:h-8 text-slate-400" />
            )}
          </div>
          <h4 className="text-slate-200 font-medium text-sm sm:text-base">{member.name}</h4>
          <p className="text-slate-300 text-xs sm:text-sm">{member.relationship}</p>
          {(member.birthYear || member.deathYear) && (
            <p className="text-slate-400 text-xs">
              {member.birthYear && `Born ${member.birthYear}`}
              {member.birthYear && member.deathYear && " - "}
              {member.deathYear && member.deathYear}
            </p>
          )}
          {member.description && <p className="text-slate-400 text-xs mt-1">{member.description}</p>}
        </CardContent>
      </Card>
    </div>
  )

  const renderSection = (
    title: string,
    members: FamilyMember[],
    sectionKey: keyof typeof expandedSections,
    animationCondition: boolean,
  ) => {
    if (members.length === 0) return null

    return (
      <div className="text-center">
        <div className="flex items-center justify-center mb-6 sm:mb-8">
          <Button
            variant="ghost"
            onClick={() => toggleSection(sectionKey)}
            className="text-xl sm:text-2xl font-serif text-slate-300 hover:text-slate-200 flex items-center space-x-2"
          >
            {expandedSections[sectionKey] ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            <span>{title}</span>
            <span className="text-sm">({members.length})</span>
          </Button>
        </div>

        {expandedSections[sectionKey] && (
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-8 flex-wrap gap-4">
            {members.map((member, index) =>
              renderFamilyMember(member, index, index === 0 ? "delay-0" : index === 1 ? "delay-200" : "delay-400"),
            )}
          </div>
        )}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
        <div className="bg-slate-800/95 rounded-2xl p-8 flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
          <p className="text-slate-300">Loading family tree...</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-6xl bg-gradient-to-br from-slate-800/95 to-indigo-950/95 backdrop-blur-sm rounded-2xl border border-slate-600/30 shadow-2xl max-h-[95vh] overflow-y-auto">
        {/* Header with Close Button */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-600/20 sticky top-0 bg-slate-800/95 backdrop-blur-sm rounded-t-2xl">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-slate-200 flex items-center">
            <TreePine className="w-5 sm:w-6 md:w-8 h-5 sm:h-6 md:h-8 mr-2 sm:mr-3" />
            Amaia's Family Tree
          </h2>
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-300 hover:bg-slate-700/50 p-2 rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close Family Tree"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Family Tree Content */}
        <div className="p-4 sm:p-8 space-y-8 sm:space-y-12">
          {/* Grandparents */}
          {renderSection("Grandparents", familyTree.grandparents, "grandparents", animationPhase >= 1)}

          {/* Connection Lines */}
          {familyTree.grandparents.length > 0 && familyTree.parents.length > 0 && (
            <div className="flex justify-center">
              <div
                className={`w-px h-12 sm:h-16 bg-gradient-to-b from-slate-400 to-transparent transition-all duration-500 ${animationPhase >= 2 ? "opacity-100" : "opacity-0"}`}
              ></div>
            </div>
          )}

          {/* Parents */}
          {renderSection("Parents", familyTree.parents, "parents", animationPhase >= 2)}

          {/* Connection Lines */}
          {familyTree.parents.length > 0 && (
            <div className="flex justify-center">
              <div
                className={`w-px h-12 sm:h-16 bg-gradient-to-b from-slate-400 to-transparent transition-all duration-500 ${animationPhase >= 3 ? "opacity-100" : "opacity-0"}`}
              ></div>
            </div>
          )}

          {/* Amaia & Spouse (Center) */}
          <div className="text-center">
            <div className="flex flex-col lg:flex-row justify-center items-center space-y-6 lg:space-y-0 lg:space-x-8">
              <div
                className={`transition-all duration-700 ${animationPhase >= 3 ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
              >
                <Card className="bg-gradient-to-br from-indigo-600/30 to-slate-800/50 border-slate-400/60 w-full sm:w-64 max-w-sm mx-auto">
                  <CardContent className="p-6 sm:p-8 text-center">
                    <div className="w-20 sm:w-24 h-20 sm:h-24 bg-slate-400/40 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center">
                      <Star className="w-10 sm:w-12 h-10 sm:h-12 text-slate-400 fill-slate-400" />
                    </div>
                    <h4 className="text-slate-100 font-bold text-xl sm:text-2xl mb-2">AMAIA</h4>
                    <p className="text-slate-200 text-base sm:text-lg">March 12, 1965 - July 27, 2023</p>
                    <p className="text-slate-300 text-sm mt-2 italic">"Forever in our hearts"</p>
                  </CardContent>
                </Card>
              </div>

              {familyTree.spouse.length > 0 && (
                <>
                  <div
                    className={`transition-all duration-700 delay-300 ${animationPhase >= 3 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
                  >
                    <div className="text-slate-400 text-3xl sm:text-4xl">💕</div>
                  </div>

                  <div
                    className={`transition-all duration-700 delay-500 ${animationPhase >= 3 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
                  >
                    {familyTree.spouse.map((spouse) => (
                      <Card
                        key={spouse.id}
                        className="bg-slate-700/30 border-slate-500/40 w-full sm:w-56 max-w-sm mx-auto"
                      >
                        <CardContent className="p-4 sm:p-6 text-center">
                          <div className="w-16 sm:w-20 h-16 sm:h-20 bg-slate-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <Heart className="w-8 sm:w-10 h-8 sm:h-10 text-slate-400" />
                          </div>
                          <h4 className="text-slate-200 font-medium text-lg sm:text-xl">{spouse.name}</h4>
                          <p className="text-slate-300">{spouse.relationship}</p>
                          {spouse.description && <p className="text-slate-400 text-sm">({spouse.description})</p>}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Connection Lines */}
          {familyTree.children.length > 0 && (
            <div className="flex justify-center">
              <div
                className={`w-px h-12 sm:h-16 bg-gradient-to-b from-slate-400 to-transparent transition-all duration-500 ${animationPhase >= 4 ? "opacity-100" : "opacity-0"}`}
              ></div>
            </div>
          )}

          {/* Children */}
          {renderSection("Children", familyTree.children, "children", animationPhase >= 4)}

          {/* Siblings */}
          {familyTree.siblings.length > 0 && (
            <div className="border-t border-slate-600/20 pt-6 sm:pt-8">
              {renderSection("Siblings", familyTree.siblings, "siblings", animationPhase >= 4)}
            </div>
          )}

          {/* Custom Relations */}
          {familyTree.customRelations.length > 0 && (
            <div className="border-t border-slate-600/20 pt-6 sm:pt-8">
              {renderSection("Extended Family", familyTree.customRelations, "customRelations", animationPhase >= 4)}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-600/20 text-center bg-slate-800/50 rounded-b-2xl">
          <p className="text-slate-300 italic">"Family is not an important thing, it's everything" - Amaia</p>
          <p className="text-slate-400 text-xs mt-2">Family tree data synced in real-time from Firebase</p>
        </div>
      </div>
    </div>
  )
}
