"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Trash2, Edit3, Eye, EyeOff, Star, MoreVertical, Download } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Photo {
  id: string
  url: string
  title: string
  description?: string
  category: "childhood" | "family" | "career" | "recent" | "special"
  isPrivate: boolean
  isFeatured: boolean
  uploadedBy: string
  uploadedAt: string
}

interface PhotoGalleryProps {
  isAdminMode: boolean
}

const samplePhotos: Photo[] = [
  {
    id: "1",
    url: "/placeholder.svg?height=300&width=300",
    title: "Wedding Day",
    description: "Sarah and David on their wedding day, 1976",
    category: "special",
    isPrivate: false,
    isFeatured: true,
    uploadedBy: "David Johnson",
    uploadedAt: "2024-12-10",
  },
  {
    id: "2",
    url: "/placeholder.svg?height=300&width=300",
    title: "Teaching Years",
    description: "Sarah with her Grade 3 class, 1985",
    category: "career",
    isPrivate: false,
    isFeatured: false,
    uploadedBy: "Michael Johnson",
    uploadedAt: "2024-12-10",
  },
  {
    id: "3",
    url: "/placeholder.svg?height=300&width=300",
    title: "Family Christmas",
    description: "Christmas morning with the grandchildren, 2023",
    category: "family",
    isPrivate: false,
    isFeatured: true,
    uploadedBy: "Jennifer Smith",
    uploadedAt: "2024-12-11",
  },
  {
    id: "4",
    url: "/placeholder.svg?height=300&width=300",
    title: "Garden Paradise",
    description: "Sarah in her beloved garden",
    category: "recent",
    isPrivate: false,
    isFeatured: false,
    uploadedBy: "Thomas Johnson",
    uploadedAt: "2024-12-11",
  },
]

export default function PhotoGallery({ isAdminMode }: PhotoGalleryProps) {
  const [photos, setPhotos] = useState<Photo[]>(samplePhotos)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  const categories = [
    { value: "all", label: "All Photos", count: photos.length },
    { value: "special", label: "Special Moments", count: photos.filter((p) => p.category === "special").length },
    { value: "family", label: "Family", count: photos.filter((p) => p.category === "family").length },
    { value: "career", label: "Career", count: photos.filter((p) => p.category === "career").length },
    { value: "recent", label: "Recent", count: photos.filter((p) => p.category === "recent").length },
  ]

  const filteredPhotos =
    selectedCategory === "all" ? photos : photos.filter((photo) => photo.category === selectedCategory)

  const togglePhotoPrivacy = (photoId: string) => {
    setPhotos(photos.map((photo) => (photo.id === photoId ? { ...photo, isPrivate: !photo.isPrivate } : photo)))
  }

  const togglePhotoFeatured = (photoId: string) => {
    setPhotos(photos.map((photo) => (photo.id === photoId ? { ...photo, isFeatured: !photo.isFeatured } : photo)))
  }

  const deletePhoto = (photoId: string) => {
    setPhotos(photos.filter((photo) => photo.id !== photoId))
  }

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.value}
            variant={selectedCategory === category.value ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.value)}
            className={selectedCategory === category.value ? "bg-amber-600 hover:bg-amber-700" : ""}
          >
            {category.label}
            <Badge variant="secondary" className="ml-2">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPhotos.map((photo) => (
          <Card
            key={photo.id}
            className="group relative overflow-hidden border-stone-200 hover:shadow-lg transition-shadow"
          >
            <CardContent className="p-0">
              <div className="aspect-square relative">
                <Image
                  src={photo.url || "/placeholder.svg"}
                  alt={photo.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105 cursor-pointer"
                  onClick={() => setSelectedPhoto(photo)}
                />

                {/* Featured Badge */}
                {photo.isFeatured && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-amber-500 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                )}

                {/* Private Badge */}
                {photo.isPrivate && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-red-100 text-red-800">
                      <EyeOff className="w-3 h-3 mr-1" />
                      Private
                    </Badge>
                  </div>
                )}

                {/* Admin Controls */}
                {isAdminMode && (
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={(e) => {
                          e.stopPropagation()
                          togglePhotoFeatured(photo.id)
                        }}
                        className={photo.isFeatured ? "bg-amber-500 text-white" : ""}
                      >
                        <Star className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={(e) => {
                          e.stopPropagation()
                          togglePhotoPrivacy(photo.id)
                        }}
                      >
                        {photo.isPrivate ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="secondary" onClick={(e) => e.stopPropagation()}>
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Edit3 className="w-4 h-4 mr-2" />
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => deletePhoto(photo.id)}>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                )}

                {/* Hover Overlay for Public View */}
                {!isAdminMode && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-2 left-2 right-2">
                      <h4 className="text-white font-medium text-sm truncate">{photo.title}</h4>
                      {photo.description && <p className="text-white/80 text-xs truncate">{photo.description}</p>}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add Photo Placeholder (Admin Mode) */}
        {isAdminMode && (
          <Card className="border-2 border-dashed border-stone-300 hover:border-amber-500 transition-colors cursor-pointer">
            <CardContent className="p-0">
              <div className="aspect-square flex items-center justify-center">
                <div className="text-center">
                  <Camera className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                  <p className="text-sm text-stone-500">Add Photo</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <Image
                src={selectedPhoto.url || "/placeholder.svg"}
                alt={selectedPhoto.title}
                width={800}
                height={600}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              <Button
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
                size="sm"
                onClick={() => setSelectedPhoto(null)}
              >
                ×
              </Button>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-medium text-stone-800 mb-2">{selectedPhoto.title}</h3>
              {selectedPhoto.description && <p className="text-stone-600 mb-4">{selectedPhoto.description}</p>}
              <div className="flex items-center justify-between text-sm text-stone-500">
                <span>Uploaded by {selectedPhoto.uploadedBy}</span>
                <span>{new Date(selectedPhoto.uploadedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
