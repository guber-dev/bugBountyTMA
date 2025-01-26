"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Bug, RefreshCw } from "lucide-react"

interface BugBountyGameProps {
  username: string
  lastRecord: number
  updateLastRecord: (newRecord: number) => void
}

export function BugBountyGame({ username, lastRecord, updateLastRecord }: BugBountyGameProps) {
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(69)
  const [gameActive, setGameActive] = useState(false)
  const [bugPosition, setBugPosition] = useState({ x: 50, y: 50 })

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (gameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setGameActive(false)
      updateLastRecord(score)
    }
    return () => clearInterval(timer)
  }, [gameActive, timeLeft, score, updateLastRecord])

  const startGame = () => {
    setScore(0)
    setTimeLeft(69)
    setGameActive(true)
    moveBug()
  }

  const moveBug = () => {
    setBugPosition({
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20,
    })
  }

  const handleBugClick = () => {
    if (gameActive) {
      setScore((prevScore) => prevScore + 1)
      moveBug()
    }
  }

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Bug Bounty</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <div className="font-bold">Score: {score}</div>
          <div className="font-bold">{timeLeft}s</div>
        </div>
        <div className="mb-2">Last record: {lastRecord}</div>
        <div className="relative bg-green-100 w-full h-[480px] rounded-lg overflow-hidden">
          {gameActive && (
            <Button
              variant="ghost"
              className="absolute p-0 w-8 h-8 rounded-full transition-all duration-200"
              style={{
                left: `${bugPosition.x}%`,
                top: `${bugPosition.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              onClick={handleBugClick}
            >
              <Bug className="w-6 h-6 text-gray-800" />
            </Button>
          )}
          {!gameActive && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-lg font-bold text-gray-800">
                {score > 0 ? `Game Over! Score: ${score}` : "Tap Start to play!"}
              </p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={startGame} disabled={gameActive}>
          <RefreshCw className="w-4 h-4 mr-2" />
          {score > 0 ? "Play Again" : "Start Game"}
        </Button>
      </CardFooter>
    </Card>
  )
}

