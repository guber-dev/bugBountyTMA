"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Player {
  username: string
  score: number
}

export function Leaderboard() {
  const [players, setPlayers] = useState<Player[]>([])

  useEffect(() => {
    // In a real app, you would fetch this data from your backend
    setPlayers([
      { username: "player1", score: 150 },
      { username: "player2", score: 120 },
      { username: "player3", score: 100 },
      // Add more players...
    ])
  }, [])

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Rank</TableHead>
              <TableHead>Player</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {players.map((player, index) => (
              <TableRow key={player.username}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{player.username}</TableCell>
                <TableCell className="text-right">{player.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

