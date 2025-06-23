"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  MessageCircle,
  Phone,
  Gift,
  Users,
  Play,
  Camera,
  Video,
  BookOpen,
  ExternalLink,
  Mail,
  Edit,
  TreePine,
  X,
} from "lucide-react"
import Image from "next/image"
import SplashScreen from "@/components/splash-screen"
import ShrineHero from "@/components/shrine-hero"
import FamilyTreeModalComponent from "@/components/family-tree-modal"
import CollapsibleTimeline from "@/components/collapsible-timeline"
import EnhancedPhotoUpload from "@/components/enhanced-photo-upload"

export default function DigitalMemorialMVP() {
  const [showSplash, setShowSplash] = useState(true)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [showProfileUpload, setShowProfileUpload] = useState(false)
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=300&width=300")
  const [newMemory, setNewMemory] = useState("")
  const [newMemoryName, setNewMemoryName] = useState("")
  const [uploadStatus, setUploadStatus] = useState("")
  const [memories, setMemories] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      message: "Miss you always, grandmother. Your spirit is with us.",
      time: "2 hours ago",
    },
    {
      id: 2,
      name: "Michael Peters",
      message: "Amaia's wisdom and love will never be forgotten. She touched so many lives.",
      time: "5 hours ago",
    },
    {
      id: 3,
      name: "Community Friend",
      message: "A beautiful soul who made the world brighter. Rest in eternal peace.",
      time: "1 day ago",
    },
  ])

  const [showFamilyTree, setShowFamilyTree] = useState(false)

  const addMemory = () => {
    if (newMemory.trim() && newMemoryName.trim()) {
      const memory = {
        id: memories.length + 1,
        name: newMemoryName,
        message: newMemory,
        time: "Just now",
      }
      setMemories([memory, ...memories])
      setNewMemory("")
      setNewMemoryName("")
    }
  }

  const handleProfileUpload = (file: File) => {
    // Simulate file upload (replace with Firebase Storage later)
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        setProfileImage(e.target.result as string)
        setUploadStatus("Profile picture updated successfully!")
        setTimeout(() => setUploadStatus(""), 3000)
      }
    }
    reader.readAsDataURL(file)
    setShowProfileUpload(false)
  }

  const handlePhotoUploadComplete = (files: any[]) => {
    console.log("Photos uploaded successfully:", files)
    // You can update the photo gallery state here
  }

  // Show splash screen on initial load
  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900">
      {/* Header - Updated with larger Amathole logo */}
      <header className="relative z-50 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50">
        <div className="container mx-auto px-4 py-4 sm:py-6 flex items-center justify-center">
          <Image
            src="/images/amathole-logo-new.png"
            alt="Amathole Funerals - Serving the Nation"
            width={400}
            height={160}
            className="h-16 sm:h-20 md:h-24 w-auto"
          />
        </div>
      </header>

      {/* Shrine Hero Section with Real-time Firebase Integration */}
      <ShrineHero
        profileImage={profileImage}
        onProfileUpload={() => setShowProfileUpload(true)}
        uploadStatus={uploadStatus}
      />

      {/* Life Timeline Section */}
      <CollapsibleTimeline />

      {/* Family Tree Button */}
      <div className="text-center py-6 sm:py-8">
        <Button
          onClick={() => setShowFamilyTree(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-2xl border border-slate-400/50 transition-all duration-300 hover:scale-105 text-base sm:text-lg"
        >
          <TreePine className="w-5 sm:w-6 h-5 sm:h-6 mr-2 sm:mr-3" />
          View Family Tree
        </Button>
      </div>

      {/* Memorial Story Section */}
      <section className="py-12 sm:py-16 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-slate-800/40 border-slate-600/30 backdrop-blur-sm">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
                <h2 className="text-2xl sm:text-3xl font-serif text-slate-200 flex items-center mb-4 sm:mb-0">
                  <BookOpen className="w-6 sm:w-8 h-6 sm:h-8 mr-3" />
                  Her Story
                </h2>
                <Button variant="ghost" className="text-slate-400 hover:text-slate-300">
                  <Edit className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                  Edit Story
                </Button>
              </div>

              <div className="prose prose-slate max-w-none">
                <p className="text-slate-100 text-base sm:text-lg leading-relaxed mb-6">
                  Amaia was a beacon of light in our community, a woman whose grace and wisdom touched every life she
                  encountered. Born in the vibrant heart of Cape Town, she dedicated her life to nurturing others,
                  whether through her work as an educator or her countless acts of kindness as a neighbor and friend.
                </p>
                <p className="text-slate-100 text-base sm:text-lg leading-relaxed mb-6">
                  Her laughter was infectious, her hugs were healing, and her words carried the weight of genuine love.
                  Amaia believed that every person had a story worth telling and a dream worth pursuing. She spent her
                  days lifting others up, celebrating their victories, and comforting them in their struggles.
                </p>
                <p className="text-slate-100 text-base sm:text-lg leading-relaxed">
                  Though she has passed from this world, her spirit lives on in the countless lives she touched. Her
                  legacy is not measured in years, but in the love she shared, the wisdom she imparted, and the hope she
                  instilled in all who knew her.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Photo & Video Gallery with Firebase Upload */}
      <section className="py-12 sm:py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif text-slate-200 mb-4">Memories in Motion</h2>
            <p className="text-slate-300 text-base sm:text-lg">A visual celebration of Amaia's beautiful life</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
            {/* Photo Gallery with Firebase Integration */}
            <Card className="bg-slate-800/40 border-slate-600/30 backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
                  <h3 className="text-lg sm:text-xl font-serif text-slate-200 flex items-center mb-2 sm:mb-0">
                    <Camera className="w-5 sm:w-6 h-5 sm:h-6 mr-2" />
                    Photo Gallery
                  </h3>
                  <Button
                    onClick={() => setShowUploadModal(true)}
                    size="sm"
                    className="bg-indigo-600 hover:bg-indigo-500 w-full sm:w-auto"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Add Photos
                  </Button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-square rounded-lg overflow-hidden group cursor-pointer">
                      <Image
                        src={`/placeholder.svg?height=150&width=150&text=Photo${i}`}
                        alt={`Memory ${i}`}
                        width={150}
                        height={150}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>

                <div className="text-center mt-4">
                  <Badge variant="secondary" className="bg-slate-500/20 text-slate-200">
                    Synced with Firebase Storage
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Video Gallery */}
            <Card className="bg-slate-800/40 border-slate-600/30 backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
                  <h3 className="text-lg sm:text-xl font-serif text-slate-200 flex items-center mb-2 sm:mb-0">
                    <Video className="w-5 sm:w-6 h-5 sm:h-6 mr-2" />
                    Video Tributes
                  </h3>
                  <Button
                    onClick={() => setShowVideoModal(true)}
                    size="sm"
                    className="bg-indigo-600 hover:bg-indigo-500 w-full sm:w-auto"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Add Video
                  </Button>
                </div>

                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex items-center space-x-3 p-3 bg-slate-900/20 rounded-lg hover:bg-slate-900/30 transition-colors cursor-pointer"
                    >
                      <div className="w-12 sm:w-16 h-9 sm:h-12 bg-slate-500/20 rounded flex items-center justify-center flex-shrink-0">
                        <Play className="w-4 sm:w-6 h-4 sm:h-6 text-slate-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-slate-100 font-medium text-sm sm:text-base truncate">Family Tribute {i}</p>
                        <p className="text-slate-300 text-xs sm:text-sm">3:24 • Uploaded 2 days ago</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-4">
                  <Badge variant="secondary" className="bg-slate-500/20 text-slate-200">
                    3 videos (Max: 300MB each)
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Community Wall - Enhanced Mobile */}
      <section className="py-12 sm:py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-slate-200 mb-4">Community Tribute</h2>
            <p className="text-slate-300 text-sm sm:text-base md:text-lg">Share your memories and messages of love</p>
          </div>

          {/* Add Memory Form - Mobile Optimized */}
          <Card className="bg-slate-800/40 border-slate-600/30 backdrop-blur-sm mb-6 sm:mb-8">
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-4">
                <Input
                  placeholder="Your name"
                  value={newMemoryName}
                  onChange={(e) => setNewMemoryName(e.target.value)}
                  className="bg-slate-900/20 border-slate-600/30 text-slate-100 placeholder-slate-400 h-12 text-base"
                />
                <Textarea
                  placeholder="Share a message..."
                  value={newMemory}
                  onChange={(e) => setNewMemory(e.target.value)}
                  className="bg-slate-900/20 border-slate-600/30 text-slate-100 placeholder-slate-400 min-h-[120px] text-base resize-none"
                />
                <Button
                  onClick={addMemory}
                  className="bg-indigo-600 hover:bg-indigo-500 w-full h-12 text-base font-medium"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Share Memory
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Memory Feed - Mobile Optimized */}
          <div className="space-y-4">
            {memories.map((memory) => (
              <Card key={memory.id} className="bg-slate-800/40 border-slate-600/30 backdrop-blur-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-slate-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 sm:w-6 h-5 sm:h-6 text-slate-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                        <h4 className="font-medium text-slate-200 text-sm sm:text-base">{memory.name}</h4>
                        <span className="text-slate-400 text-xs sm:text-sm mt-1 sm:mt-0">{memory.time}</span>
                      </div>
                      <p className="text-slate-100 leading-relaxed text-sm sm:text-base break-words">
                        {memory.message}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Donation Section */}
      <section className="py-12 sm:py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Contact Family */}
            <Card className="bg-slate-800/40 border-slate-600/30 backdrop-blur-sm">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-serif text-slate-200 mb-6 text-center">Contact the Family</h3>
                <div className="space-y-4">
                  <Button
                    className="w-full bg-green-600 hover:bg-green-500 text-white"
                    onClick={() =>
                      window.open(
                        "https://wa.me/27123456789?text=My condolences for your loss. Amaia was a beautiful soul.",
                        "_blank",
                      )
                    }
                  >
                    <Phone className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                    WhatsApp Family
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-slate-600/50 text-slate-200 hover:bg-slate-500/10"
                    onClick={() =>
                      window.open(
                        "mailto:family@amaia-memorial.com?subject=Condolences&body=Dear Family, My thoughts are with you during this difficult time.",
                        "_blank",
                      )
                    }
                  >
                    <Mail className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                    Send Email
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Donations */}
            <Card className="bg-slate-800/40 border-slate-600/30 backdrop-blur-sm">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-serif text-slate-200 mb-6 text-center">Memorial Donations</h3>
                <p className="text-slate-300 text-center mb-6">
                  In lieu of flowers, donations can be made to Amaia's favorite charity
                </p>
                <div className="space-y-4">
                  <Button
                    className="w-full bg-indigo-600 hover:bg-indigo-500"
                    onClick={() => {
                      alert("Bank Details:\nBank: FNB\nAccount: 123456789\nBranch: 250655\nReference: Amaia Memorial")
                    }}
                  >
                    <Gift className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                    View Bank Details
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-slate-600/50 text-slate-200 hover:bg-slate-500/10"
                    onClick={() => window.open("https://snapscan.co.za", "_blank")}
                  >
                    <ExternalLink className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                    SnapScan QR Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer - SD Analytics Only */}
      <footer className="bg-slate-900/50 border-t border-slate-700/20 py-8 sm:py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 sm:space-y-6">
            <div className="text-2xl sm:text-3xl font-serif text-slate-200 tracking-wider">AMA-KHUMBULO</div>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Image
                src="/images/sd-analytics-logo-new.png"
                alt="Powered by SD Analytics"
                width={200}
                height={80}
                className="h-8 sm:h-12 w-auto opacity-90"
              />
              <span className="text-slate-300 text-lg sm:text-xl font-medium">Powered by SD Analytics</span>
            </div>
            <div className="text-slate-400 text-sm">
              © 2024 Digital Memorial Services • Real-time Firebase Integration
            </div>
          </div>
        </div>
      </footer>

      {/* Enhanced Upload Modals with Firebase Integration */}
      {showUploadModal && (
        <EnhancedPhotoUpload onClose={() => setShowUploadModal(false)} onUploadComplete={handlePhotoUploadComplete} />
      )}
      {showVideoModal && <VideoUploadModal onClose={() => setShowVideoModal(false)} />}
      {showProfileUpload && (
        <ProfileUploadModal onClose={() => setShowProfileUpload(false)} onUpload={handleProfileUpload} />
      )}

      {/* Dynamic Family Tree Modal with Firebase Data */}
      {showFamilyTree && <FamilyTreeModalComponent onClose={() => setShowFamilyTree(false)} />}
    </div>
  )
}

// Video Upload Modal (keeping existing implementation)
const VideoUploadModal = ({ onClose }: { onClose: () => void }) => {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState("")

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]

      if (selectedFile.size > 300 * 1024 * 1024) {
        setUploadStatus("File too large. Maximum size is 300MB.")
        return
      }

      setFile(selectedFile)
      setUploadStatus("")
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setUploadStatus("Uploading video...")

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))
      setUploadStatus("Upload successful!")
      setTimeout(() => {
        setUploadStatus("")
        onClose()
      }, 1500)
    } catch (error) {
      setUploadStatus("Upload failed. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-slate-800/90 border-slate-600/50">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg sm:text-xl font-serif text-slate-200">Upload Video Tribute</h3>
            <Button variant="ghost" onClick={onClose} className="text-slate-400 p-2">
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="border-2 border-dashed border-slate-600/50 rounded-lg p-6 sm:p-8 text-center mb-6">
            <Video className="w-10 sm:w-12 h-10 sm:h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-200 mb-2 text-sm sm:text-base">Select video file (Max 300MB)</p>
            <p className="text-slate-300 text-sm mb-4">Supports MP4, MOV, AVI formats • 1080p recommended</p>
            <input
              type="file"
              accept="video/mp4,video/mov,video/avi"
              onChange={handleFileSelect}
              className="block w-full text-slate-200 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-500"
            />
          </div>

          {file && (
            <div className="mb-6 p-4 bg-slate-900/30 rounded-lg">
              <p className="text-slate-200 font-medium truncate">{file.name}</p>
              <p className="text-slate-300 text-sm">Size: {(file.size / 1024 / 1024).toFixed(1)} MB</p>
            </div>
          )}

          {uploadStatus && (
            <div className="mb-4 p-3 bg-indigo-600/20 border border-indigo-500/50 rounded-lg">
              <p className="text-slate-200 text-center flex items-center justify-center">
                {uploading && (
                  <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin mr-2" />
                )}
                {uploadStatus}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-slate-600/50 text-slate-200 w-full sm:w-auto"
              disabled={uploading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              className="bg-indigo-600 hover:bg-indigo-500 w-full sm:w-auto"
              disabled={!file || uploading}
            >
              {uploading ? "Uploading..." : "Upload Video"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Profile Picture Upload Modal (keeping existing implementation)
const ProfileUploadModal = ({ onClose, onUpload }: { onClose: () => void; onUpload: (file: File) => void }) => {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>("")

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)

      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setPreview(e.target.result as string)
        }
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleUpload = () => {
    if (file) {
      onUpload(file)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800/90 border-slate-600/50">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg sm:text-xl font-serif text-slate-200">Upload Profile Picture</h3>
            <Button variant="ghost" onClick={onClose} className="text-slate-400 p-2">
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="border-2 border-dashed border-slate-600/50 rounded-lg p-6 text-center mb-6">
            {preview ? (
              <div className="w-24 sm:w-32 h-24 sm:h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
              </div>
            ) : (
              <Camera className="w-10 sm:w-12 h-10 sm:h-12 text-slate-400 mx-auto mb-4" />
            )}
            <p className="text-slate-200 mb-4 text-sm sm:text-base">Select profile picture</p>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileSelect}
              className="block w-full text-slate-200 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-500"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
            <Button variant="outline" onClick={onClose} className="border-slate-600/50 text-slate-200 w-full sm:w-auto">
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              className="bg-indigo-600 hover:bg-indigo-500 w-full sm:w-auto"
              disabled={!file}
            >
              Upload Picture
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
