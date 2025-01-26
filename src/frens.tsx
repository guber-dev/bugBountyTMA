"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Share2 } from "lucide-react"

interface Fren {
  username: string
  record: number
}

interface FrensProps {
  username: string
}

export function Frens({ username }: FrensProps) {
  const [frens, setFrens] = useState<Fren[]>([])

  useEffect(() => {
    // In a real app, you would fetch this data from your backend
    setFrens([
      { username: "fren1", record: 100 },
      { username: "fren2", record: 80 },
      { username: "fren3", record: 60 },
      // Add more frens...
    ])
  }, [])

  const inviteFren = () => {
    const referralLink = `https://t.me/Bug_Bounty_Crypto_Bot?start=REF_${username}`

    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      window.Telegram.WebApp.openTelegramLink(referralLink)
    } else {
      // Fallback for when not in Telegram environment
      alert(`Your referral link: ${referralLink}`)
    }
  }

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Frens</CardTitle>
      </CardHeader>
      <CardContent>
        <Button className="w-full mb-4" onClick={inviteFren}>
          <Share2 className="w-4 h-4 mr-2" />
          Invite Fren
        </Button>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fren</TableHead>
              <TableHead className="text-right">Record</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {frens.map((fren) => (
              <TableRow key={fren.username}>
                <TableCell>{fren.username}</TableCell>
                <TableCell className="text-right">{fren.record}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

