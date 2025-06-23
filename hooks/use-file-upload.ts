"use client"

import { useState } from "react"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { doc, updateDoc, arrayUnion } from "firebase/firestore"
import { storage, db } from "@/lib/firebase"

export interface UploadedFile {
  id: string
  name: string
  url: string
  type: "image" | "video"
  uploadedAt: string
  size: number
}

export function useFileUpload() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const uploadFile = async (file: File, type: "image" | "video"): Promise<UploadedFile | null> => {
    if (!file) return null

    setUploading(true)
    setProgress(0)

    try {
      // Create unique filename
      const timestamp = Date.now()
      const fileName = `${timestamp}_${file.name}`
      const filePath = `memorials/AMAIA/uploads/${type}s/${fileName}`

      // Upload to Firebase Storage
      const storageRef = ref(storage, filePath)
      const snapshot = await uploadBytes(storageRef, file)

      // Get download URL
      const downloadURL = await getDownloadURL(snapshot.ref)

      // Create file metadata
      const uploadedFile: UploadedFile = {
        id: timestamp.toString(),
        name: file.name,
        url: downloadURL,
        type,
        uploadedAt: new Date().toISOString(),
        size: file.size,
      }

      // Save metadata to Firestore
      const memorialRef = doc(db, "memorials", "AMAIA")
      await updateDoc(memorialRef, {
        [`uploads.${type}s`]: arrayUnion(uploadedFile),
      })

      setProgress(100)
      return uploadedFile
    } catch (error) {
      console.error("Error uploading file:", error)
      return null
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  const uploadMultipleFiles = async (files: File[], type: "image" | "video"): Promise<UploadedFile[]> => {
    const uploadPromises = files.map((file) => uploadFile(file, type))
    const results = await Promise.all(uploadPromises)
    return results.filter((result) => result !== null) as UploadedFile[]
  }

  return {
    uploading,
    progress,
    uploadFile,
    uploadMultipleFiles,
  }
}
