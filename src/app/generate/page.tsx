'use client'

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface Flashcard {
  front: string;
  back: string;
}

const Page: React.FC = () => {
  const { isLoaded, isSignedIn, user } = useUser()
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [flipped, setFlipped] = useState<boolean[]>([])
  const [text, setText] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch('/api/generate', {
        method: "POST",
        body: text
      })
      const data = await response.json()
      setFlashcards(data.flashcards || [])
      setFlipped(new Array(data.flashcards.length).fill(false))
    } catch (error) {
      console.error("Error fetching flashcards:", error)
    }
    setLoading(false)
  }

  const handleFlip = (index: number) => {
    setFlipped(prev => {
      const newFlipped = [...prev]
      newFlipped[index] = !newFlipped[index]
      return newFlipped
    })
  }

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen w-full p-8 ">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user?.firstName}!</h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          className="p-2 mr-2 text-black rounded-md outline-none border border-gray-300"
          placeholder="Enter a topic for flashcards"
        />
        <button
          type="submit"
          className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Flashcards'}
        </button>
      </form>

      {flashcards.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {flashcards.map((card, index) => (
            <div
              key={index}
              className="bg-black w-full h-48 cursor-pointer perspective"
              onClick={() => handleFlip(index)}
            >
              <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${flipped[index] ? 'rotate-y-180' : ''}`}>
                <div className="absolute w-full h-full backface-hidden  p-4 rounded-lg shadow-md flex flex-col justify-center">
                  <div className="font-bold mb-2">Question:</div>
                  <div>{card.front}</div>
                </div>
                <div className="absolute w-full h-full backface-hidden bg-black p-4 rounded-lg shadow-md flex flex-col justify-center rotate-y-180">
                  <div className="font-bold mb-2">Answer:</div>
                  <div>{card.back}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Page