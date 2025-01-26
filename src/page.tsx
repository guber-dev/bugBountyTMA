"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Bug, Trophy, Users } from "lucide-react"
import { BugBountyGame } from "./bug-bounty-game"
import { Leaderboard } from "./leaderboard"
import { Frens } from "./frens"

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string
        initDataUnsafe: {
          user?: {
            username: string
          }
        }
      }
    }
  }
}

export default function App() {
  const [activeScreen, setActiveScreen] = useState<"play" | "leaderboard" | "frens">("play")
  const [username, setUsername] = useState<string>("")
  const [lastRecord, setLastRecord] = useState<number>(0)

  useEffect(() => {
    // Get the username from Telegram WebApp
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const telegramUsername = window.Telegram.WebApp.initDataUnsafe.user?.username
      if (telegramUsername) {
        setUsername(telegramUsername)
      }
    }
  }, [])

  const updateLastRecord = (newRecord: number) => {
    setLastRecord(newRecord)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-grow p-4">
        {activeScreen === "play" && (
          <BugBountyGame username={username} lastRecord={lastRecord} updateLastRecord={updateLastRecord} />
        )}
        {activeScreen === "leaderboard" && <Leaderboard />}
        {activeScreen === "frens" && <Frens username={username} />}
      </main>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around">
          <Button variant="ghost" onClick={() => setActiveScreen("leaderboard")}>
            <Trophy className="w-6 h-6" />
          </Button>
          <Button variant="ghost" onClick={() => setActiveScreen("play")}>
            <Bug className="w-6 h-6" />
          </Button>
          <Button variant="ghost" onClick={() => setActiveScreen("frens")}>
            <Users className="w-6 h-6" />
          </Button>
        </div>
      </nav>
    </div>
  )
}

