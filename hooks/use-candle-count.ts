"use client"

import { useState, useEffect } from "react"
import { doc, onSnapshot, updateDoc, increment, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

export function useCandleCount() {
  const [candleCount, setCandleCount] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    const memorialRef = doc(db, "memorials", "AMAIA")

    // Set up real-time listener
    const unsubscribe = onSnapshot(
      memorialRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data()
          setCandleCount(data.candleCount || 0)
        } else {
          // Initialize document if it doesn't exist
          updateDoc(memorialRef, { candleCount: 0 }).catch(() => {
            console.log("Document will be created on first candle light")
          })
        }
        setLoading(false)
      },
      (error) => {
        console.error("Error listening to candle count:", error)
        setLoading(false)
      },
    )

    return () => unsubscribe()
  }, [])

  const lightCandle = async () => {
    if (updating) return false

    setUpdating(true)
    try {
      const memorialRef = doc(db, "memorials", "AMAIA")

      // Check if document exists first
      const docSnapshot = await getDoc(memorialRef)

      if (!docSnapshot.exists()) {
        // Create document with initial candle count
        await updateDoc(memorialRef, {
          candleCount: 1,
          lastCandleLit: new Date().toISOString(),
          name: "AMAIA",
          createdAt: new Date().toISOString(),
        })
      } else {
        // Increment existing count
        await updateDoc(memorialRef, {
          candleCount: increment(1),
          lastCandleLit: new Date().toISOString(),
        })
      }

      return true
    } catch (error) {
      console.error("Error lighting candle:", error)
      return false
    } finally {
      setUpdating(false)
    }
  }

  return {
    candleCount,
    loading,
    updating,
    lightCandle,
  }
}
