"use client"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function USARedirect(){
  const router = useRouter()
  useEffect(()=>{
    // redirect to the dynamic route slug for United States
    router.replace('/visas/united-states')
  },[router])
  return null
}
