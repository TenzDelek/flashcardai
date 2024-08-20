import FeatureCard from "@/components/FeatureCard";
import PriceCard from "@/components/PriceCard";
import getstripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
export default function Home() {
  const data = [
    {
      title: "Easy Text Input",
      description: "Enter any text and get it converted into a flashcard",
    },
    {
      title: "Smart FlashCard",
      description: "Generate flashcards based on your text input",
    },
    {
      title: "Accessible anywhere",
      description: "Get your flashcards on any device",
    },
    {
      title: "AI based flashcard generator",
      description: "AI based flashcard generator",
    },
    {
      title: " Beautiful UI",
      description: " Beautiful UI for your flashcards",
    },
    {
      title: "For your student,your friend",
      description: " Best for your student,your friend",
    }
  ];

  const pricing=[
    {
      tier:"Free",
      price:0,
      benefit:"limited acess"
    },
    {
      tier:"God",
      price:10,
      benefit:"not bad but not good"
    },
    {
      tier:"BhaiChara",
      price:100,
      benefit:"Best for your student,your friend"
    },

  ]
  return (
    <main className=" flex-col flex items-center justify-center w-full">
     <div className=" flex  flex-col w-full mt-48 py-6  px-16 ">
  <p className="text-3xl font-bold">Welcome to flashcard SaaS</p>
  <p>your best flashcard generator</p>

  <Link href="/generate">
    <button className="p-2 bg-blue-500 text-white transition hover:bg-blue-700 rounded mt-2">
      Get Started
    </button>
  </Link>
</div>

      <div>
        <p className=" font-bold text-xl mb-4 mt-4">Features</p>
        <div className=" grid gap-2 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          {data.map((item, index) => (
            <div key={index}>
              <FeatureCard title={item.title} description={item.description} />
            </div>
          ))}
        </div>
      </div>
      <div className="">
        <p className=" font-bold text-xl mt-6">Pricing</p>
        <div className=" grid gap-2 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          {pricing.map((item, index) => (
            <div key={index}>
              <PriceCard tier={item.tier} price={item.price} benefit={item.benefit} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
