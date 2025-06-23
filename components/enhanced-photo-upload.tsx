"use client"

import type React from "react"

import { useState } from "react"
import { Upload, X, Camera, Loader2, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useFileUpload } from "@/hooks/use-file-upload"

interface EnhancedPhotoUploadProps {
  onClose: () => void
  onUploadComplete?: (files: any[]) => void
}

interface SelectedFile {
  file: File
  preview: string
  title: string
  description: string
  category: string
  isPrivate: boolean
}

export default function EnhancedPhotoUpload({ onClose, onUploadComplete }: EnhancedPhotoUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([])
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const [uploadMessage, setUploadMessage] = useState("")
  const { uploading, uploadMultipleFiles } = useFileUpload()

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      const imageFiles = files.filter((file) => file.type.startsWith("image/"))

      imageFiles.forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const newFile: SelectedFile = {
            file,
            preview: e.target?.result as string,
            title: file.name.replace(/\.[^/.]+$/, ""),
            description: "",
            category: "family",
            isPrivate: false,
          }
          setSelectedFiles((prev) => [...prev, newFile])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const updateFile = (index: number, updates: Partial<SelectedFile>) => {
    setSelectedFiles((prev) => prev.map((file, i) => (i === index ? { ...file, ...updates } : file)))
  }

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return

    setUploadStatus("uploading")
    setUploadMessage("Uploading photos to Firebase Storage...")

    try {
      const files = selectedFiles.map((sf) => sf.file)
      const uploadedFiles = await uploadMultipleFiles(files, "image")

      if (uploadedFiles.length > 0) {
        setUploadStatus("success")
        setUploadMessage(`Successfully uploaded ${uploadedFiles.length} photo${uploadedFiles.length !== 1 ? "s" : ""}!`)

        if (onUploadComplete) {
          onUploadComplete(uploadedFiles)
        }

        setTimeout(() => {
          onClose()
        }, 2000)
      } else {
        throw new Error("No files were uploaded successfully")
      }
    } catch (error) {
      setUploadStatus("error")
      setUploadMessage("Upload failed. Please try again.")
      console.error("Upload error:", error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl bg-slate-800/95 border-slate-600/50 max-h-[90vh] overflow-hidden">
        <CardContent className="p-0">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-600/30">
            <h2 className="text-xl font-semibold flex items-center text-slate-200">
              <Camera className="w-5 h-5 mr-2" />
              Upload Memorial Photos
            </h2>
            <Button variant="ghost" onClick={onClose} className="text-slate-400 hover:text-slate-300 p-2">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6 max-h-[calc(90vh-120px)] overflow-y-auto">
            {/* File Input */}
            <div className="text-center">
              <div className="border-2 border-dashed border-slate-600/50 rounded-lg p-8 mb-4 hover:border-slate-500/70 transition-colors">
                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-200 mb-2">Select Photos to Upload</h3>
                <p className="text-slate-400 mb-4">Choose JPG, PNG, or WebP files from your device</p>

                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileSelect}
                  disabled={uploading}
                  className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer disabled:opacity-50"
                />
              </div>
            </div>

            {/* Selected Files */}
            {selectedFiles.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-slate-200">Selected Photos ({selectedFiles.length})</h3>

                <div className="grid gap-4">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="border border-slate-600/30 rounded-lg p-4 bg-slate-900/20">
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
                              <label className="block text-sm font-medium mb-1 text-slate-300">Photo Title</label>
                              <input
                                type="text"
                                value={file.title}
                                onChange={(e) => updateFile(index, { title: e.target.value })}
                                placeholder="Enter photo title"
                                className="w-full px-3 py-2 border border-slate-600/50 rounded-md bg-slate-800/50 text-slate-200 placeholder-slate-400"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1 text-slate-300">Category</label>
                              <select
                                value={file.category}
                                onChange={(e) => updateFile(index, { category: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-600/50 rounded-md bg-slate-800/50 text-slate-200"
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
                            <label className="block text-sm font-medium mb-1 text-slate-300">
                              Description (Optional)
                            </label>
                            <textarea
                              value={file.description}
                              onChange={(e) => updateFile(index, { description: e.target.value })}
                              placeholder="Add a description or memory about this photo"
                              rows={2}
                              className="w-full px-3 py-2 border border-slate-600/50 rounded-md bg-slate-800/50 text-slate-200 placeholder-slate-400"
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={file.isPrivate}
                                onChange={(e) => updateFile(index, { isPrivate: e.target.checked })}
                                className="rounded bg-slate-800 border-slate-600"
                              />
                              <span className="text-sm text-slate-300">Private (Family Only)</span>
                            </label>
                            <Button
                              variant="ghost"
                              onClick={() => removeFile(index)}
                              className="text-red-400 hover:text-red-300 text-sm"
                              disabled={uploading}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload Status */}
            {uploadStatus !== "idle" && (
              <div
                className={`p-4 rounded-lg border ${
                  uploadStatus === "success"
                    ? "bg-green-600/20 border-green-500/50"
                    : uploadStatus === "error"
                      ? "bg-red-600/20 border-red-500/50"
                      : "bg-indigo-600/20 border-indigo-500/50"
                }`}
              >
                <div className="flex items-center space-x-2">
                  {uploadStatus === "uploading" && <Loader2 className="w-4 h-4 animate-spin" />}
                  {uploadStatus === "success" && <Check className="w-4 h-4 text-green-400" />}
                  {uploadStatus === "error" && <AlertCircle className="w-4 h-4 text-red-400" />}
                  <p
                    className={`text-sm ${
                      uploadStatus === "success"
                        ? "text-green-400"
                        : uploadStatus === "error"
                          ? "text-red-400"
                          : "text-indigo-400"
                    }`}
                  >
                    {uploadMessage}
                  </p>
                </div>
              </div>
            )}

            {/* Upload Buttons */}
            {selectedFiles.length > 0 && uploadStatus !== "success" && (
              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-600/30">
                <Button
                  variant="outline"
                  onClick={onClose}
                  disabled={uploading}
                  className="border-slate-600/50 text-slate-200 hover:bg-slate-700/50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpload}
                  disabled={uploading || selectedFiles.length === 0}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Uploading to Firebase...
                    </>
                  ) : (
                    <>
                      Upload {selectedFiles.length} Photo{selectedFiles.length !== 1 ? "s" : ""}
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
