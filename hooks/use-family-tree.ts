"use client"

import { useState, useEffect } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "@/lib/firebase"

export interface FamilyMember {
  id: string
  name: string
  relationship: string
  birthYear?: string
  deathYear?: string
  description?: string
  imageUrl?: string
}

export interface FamilyTreeData {
  grandparents: FamilyMember[]
  parents: FamilyMember[]
  siblings: FamilyMember[]
  spouse: FamilyMember[]
  children: FamilyMember[]
  customRelations: FamilyMember[]
}

export function useFamilyTree() {
  const [familyTree, setFamilyTree] = useState<FamilyTreeData>({
    grandparents: [],
    parents: [],
    siblings: [],
    spouse: [],
    children: [],
    customRelations: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const memorialRef = doc(db, "memorials", "AMAIA")

    const unsubscribe = onSnapshot(
      memorialRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data()
          const familyTreeData = data.familyTree || {}

          setFamilyTree({
            grandparents: familyTreeData.grandparents || [
              { id: "1", name: "James Williams", relationship: "Grandfather", birthYear: "1910", deathYear: "1995" },
              { id: "2", name: "Rose Williams", relationship: "Grandmother", birthYear: "1915", deathYear: "1998" },
            ],
            parents: familyTreeData.parents || [
              { id: "3", name: "John Williams", relationship: "Father", birthYear: "1935", deathYear: "2010" },
              { id: "4", name: "Mary Williams", relationship: "Mother", birthYear: "1938", deathYear: "2015" },
            ],
            siblings: familyTreeData.siblings || [
              { id: "5", name: "Peter Williams", relationship: "Brother", birthYear: "1962" },
              { id: "6", name: "Grace Williams", relationship: "Sister", birthYear: "1968" },
            ],
            spouse: familyTreeData.spouse || [
              { id: "7", name: "David Johnson", relationship: "Beloved Husband", description: "Married 1992" },
            ],
            children: familyTreeData.children || [
              { id: "8", name: "Sarah Johnson", relationship: "Daughter", birthYear: "1995" },
              { id: "9", name: "Michael Johnson", relationship: "Son", birthYear: "1998" },
              { id: "10", name: "Lisa Johnson", relationship: "Daughter", birthYear: "2001" },
            ],
            customRelations: familyTreeData.customRelations || [],
          })
        }
        setLoading(false)
      },
      (error) => {
        console.error("Error loading family tree:", error)
        setLoading(false)
      },
    )

    return () => unsubscribe()
  }, [])

  return { familyTree, loading }
}
