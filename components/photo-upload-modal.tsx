"use client"

import { useState } from "react"
import { Upload, X, Camera } from "lucide-react"

interface PhotoUploadModalProps {
  onClose: () => void
  onUpload: (photos: any[]) => void
}

interface UploadedFile {
  file: File
  preview: string
  title: string
  description: string
  category: string
  isPrivate: boolean
}

export default function PhotoUploadModal({ onClose, onUpload }: PhotoUploadModalProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [uploading, setUploading] = useState(false)

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"))

    imageFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const newFile: UploadedFile = {
          file,
          preview: e.target?.result as string,
          title: file.name.replace(/\.[^/.]+$/, ""),
          description: "",
          category: "family",
          isPrivate: false,
        }
        setUploadedFiles((prev) => [...prev, newFile])
      }
      reader.readAsDataURL(file)
    })
  }

  const updateFile = (index: number, updates: Partial<UploadedFile>) => {
    setUploadedFiles((prev) => prev.map((file, i) => (i === index ? { ...file, ...updates } : file)))
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    setUploading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    onUpload(uploadedFiles)
    setUploading(false)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold flex items-center">
            <Camera className="w-5 h-5 mr-2" />
            Upload Memorial Photos
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          {/* Simple File Input */}
          <div className="text-center">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">Select Photos to Upload</h3>
              <p className="text-gray-600 mb-4">Choose JPG, PNG, or GIF files from your computer</p>

              {/* Direct file input - no fancy styling */}
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files) {
                    handleFiles(Array.from(e.target.files))
                  }
                }}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 cursor-pointer"
              />
            </div>
          </div>

          {/* Show selected files */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Selected Photos ({uploadedFiles.length})</h3>

              {uploadedFiles.map((file, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex gap-4">
                    {/* Preview */}
                    <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={file.preview || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">Photo Title</label>
                          <input
                            type="text"
                            value={file.title}
                            onChange={(e) => updateFile(index, { title: e.target.value })}
                            placeholder="Enter photo title"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Category</label>
                          <select
                            value={file.category}
                            onChange={(e) => updateFile(index, { category: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          >
                            <option value="childhood">Childhood</option>
                            <option value="family">Family</option>
                            <option value="career">Career</option>
                            <option value="recent">Recent</option>
                            <option value="special">Special Moments</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Description (Optional)</label>
                        <textarea
                          value={file.description}
                          onChange={(e) => updateFile(index, { description: e.target.value })}
                          placeholder="Add a description or memory about this photo"
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={file.isPrivate}
                            onChange={(e) => updateFile(index, { isPrivate: e.target.checked })}
                            className="rounded"
                          />
                          <span className="text-sm">Private (Family Only)</span>
                        </label>
                        <button onClick={() => removeFile(index)} className="text-red-600 hover:text-red-700 text-sm">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Upload buttons */}
          {uploadedFiles.length > 0 && (
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                onClick={onClose}
                disabled={uploading}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 disabled:opacity-50"
              >
                {uploading ? (
                  <>
                    <div className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Uploading...
                  </>
                ) : (
                  <>
                    Upload {uploadedFiles.length} Photo{uploadedFiles.length !== 1 ? "s" : ""}
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
