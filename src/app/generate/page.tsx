'use client'

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Page = () => {
const {isLoaded,isSignedIn,user}=useUser()
const [flashcard,setflashcard]=useState([])
const [fliped,setfliped]=useState([])
const [text,settext]=useState("")
const [name,setname]=useState('')
const [open,setopen]=useState(false)
const route=useRouter()

const handlesubmit=async()=>{
    fetch('api/generate',{
        method:"POST",
        body:text
    }).then((res)=>res.json())
    .then((data)=>setflashcard(data))
}

const handlecardclick=(id:string)=>{
setfliped((prev)=>({
    ...prev, //everything remain the same only the id is changed for fliped
    [id]:!prev[id]
}))
}
const handleopen=()=>{
    setopen(true)
}
const handleclose=()=>{
    setopen(false)
}
  return (
    <div>Page</div>
  )
}

export default Page